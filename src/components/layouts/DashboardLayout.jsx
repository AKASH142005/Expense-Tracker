import React, { useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({children,activeMenu}) => {
    const {user} = useContext(UserContext)
    return (
        <div className="min-h-screen" >
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout