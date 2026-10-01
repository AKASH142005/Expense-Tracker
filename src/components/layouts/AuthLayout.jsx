const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-screen px-6 md:px-12 pt-8 pb-12">
            
            <h2 className="text-lg font-medium text-black">
                Expense Tracker
            </h2>

            {children}

        </div>
    );
};

export default AuthLayout;

