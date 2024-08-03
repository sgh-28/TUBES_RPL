import React from "react";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/sidebarAdmin"
import Adding from "../../components/Adding";

function TambahMenu() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <SidebarAdmin/>
                <div className="flex-grow p-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-medium mb-4">Penambahan Menu</h2>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
                                <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                    <option>Appetizer</option>
                                    <option>Main Course</option>
                                    <option>Dessert</option>
                                    <option>Drink</option>
                                    <option>Side Dish</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">ID-Menu</label>
                                <input type="text" placeholder="######" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Nama Menu</label>
                                <input type="text" placeholder="Nama Menu" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Bahan - Bahan</label>
                                <textarea placeholder="Bahan - Bahan" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="4"></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Harga Menu</label>
                                <input type="text" placeholder="Rp. XX, XXX" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Simpan</button>
                            </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TambahMenu;
