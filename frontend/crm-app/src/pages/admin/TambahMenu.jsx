import React from "react"
import Navbar from "../../components/Navbar"
import SidebarAdmin from "../../components/sidebarAdmin"
import Adding from "../../components/Adding"

function TambahMenu() {
    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar/>
            <div className="flex h-full">
                <SidebarAdmin/>
                <div className=" flex flex-col w-[80%]">
                    <div className="flex justify-between drop-shadow-sm bg-white p-4 items-center">
                        <h2 className="text-xl font-medium">Tambah Menu</h2>
                        <input type="text"
                        className="outline-none border text-center focus:bg-slate-100 py-2 rounded-md px-8" 
                        placeholder="Tambah"
                        />

                    </div>
                    <Adding/>
                </div>

            </div>

        </div>
    )
}

export default TambahMenu