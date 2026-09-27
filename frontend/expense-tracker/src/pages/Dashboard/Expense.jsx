import { useState , useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview"; 

import DashboardLayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList"
const Expense = () => { 
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data:null
    })

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
    
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again" , error)
        } finally {
            setLoading(false);
        }
    } 

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        if (!category.trim()) {
            toast.error("Category is required.")
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0")
            return;
        }

        if (!date) {
            toast.error("Date is required");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon
            })
            
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {

            console.log(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
         }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME)

            setOpenAddExpenseModal({ show: false, data: null });
            toast.success("Income details deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error deleting expense:",
                error.response?.data?.message || error.message
            );
        }
    }

    const handleDownloadExpenseDetails = async () => { 
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: "blob"
            });
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) { 
            console.log("Error downloading expense details", error);
            toast.error("Failed to download expense details. please try again")
        }
    };

    useEffect(() => {
        fetchExpenseDetails()
        return () => { };
    }, []);
    return (
         <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => { setOpenAddExpenseModal(true)}}
                        />
                    </div>
                </div>

                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({ show: true, data: id });
                    }}
                    onDownload={handleDownloadExpenseDetails}
                />

                <Modal 
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                > <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>
            </div>
            </DashboardLayout>
    )
}

export default Expense;