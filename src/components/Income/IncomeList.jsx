import React from 'react'
import {LuDownload} from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
const IncomeList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className="card min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className="text-base sm:text-lg">Income Sources</h5>

                <button className="card-btn shrink-0 min-h-9" onClick={onDownload}>
                    <LuDownload className="text-base" />
                    Download
                </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 min-w-0">
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                        hideDeleteBtn={false}
                    />
                ))}

                {!transactions?.length && (
                    <p className="text-sm text-gray-400 py-6 col-span-full text-center">
                        No income added yet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default IncomeList