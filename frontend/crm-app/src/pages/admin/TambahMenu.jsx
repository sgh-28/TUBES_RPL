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
                    {/* <div className='flex justify-between drop-shadow-sm bg-white p-4 items-center'>
                        <h2 className='text-xl font-medium'>Pendaftaran Menu</h2>
                        <Link className='bg-teal-600 text-slate-50 px-8 py-2 rounded-md' to={'/admin/menu'}>Simpan Pegawai</Link>
                    </div> */}
                <AddingMenu/>
                </div>
            </div>
        </div>
    )
}

export default TambahMenu;
