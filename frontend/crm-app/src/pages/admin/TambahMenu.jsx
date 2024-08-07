import React from "react";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/sidebarAdmin"
// import Adding from "../../components/Adding";
import AddingMenu from "../../components/AddingMenu";

function TambahMenu() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <SidebarAdmin/>
                <div className='flex flex-col w-[80%]'>
                <AddingMenu/>
                </div>
            </div>
        </div>
    )
}

export default TambahMenu;
