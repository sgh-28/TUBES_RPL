import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CardMenu({ activeCategory, orderList, setOrderList, query }) {
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [availability, setAvailability] = useState({});
  const [filteredMenu, setFilteredMenu] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/menu");
      const data = await response.json();
      setMenu(data);
      const initialAvailability = data.reduce((acc, item) => {
        acc[item.id_menu] = item.status === "Tersedia";
        return acc;
      }, {});
      setAvailability(initialAvailability);
    } catch (error) {
      console.error("Failed to fetch menu data", error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  

  // const filteredMenu = menu.filter(
  //   (item) => item.jenis_menu === activeCategory
  // );

  const handleAddToOrder = (item) => {
    if (!quantity[item.id_menu] || quantity[item.id_menu] <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    setOrderList((prevOrderList) => [
      ...prevOrderList,
      { ...item, quantity: quantity[item.id_menu] },
    ]);
    setQuantity((prev) => ({ ...prev, [item.id_menu]: "" }));
  };

  const handleAvailabilityToggle = async (item) => {
    const newStatus = availability[item.id_menu] ? "Kosong" : "Tersedia";
    setAvailability((prev) => ({ ...prev, [item.id_menu]: !prev[item.id_menu] }));

    // Update availability on the server
    try {
      await fetch(`http://localhost:3000/api/menu/${item.id_menu}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_menu: item.nama_menu,
          harga_menu: item.harga_menu,
          jenis_menu: item.jenis_menu,
          status: newStatus,
        }),
      });
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleDelete = async (id_menu) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus menu ini?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/menu/${id_menu}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMenu((prevMenu) => prevMenu.filter((item) => item.id_menu !== id_menu));
        alert(`Anda Berhasil Menghapus Menu Dengan ID: ${id_menu}`);
      } else {
        console.error('Failed to delete menu item', error);
      }
    } catch (error) {
      console.error('Failed to delete menu item', error);
    }
  };

  const isAdmin = location.pathname.startsWith("/admin");
  const isChef = location.pathname.startsWith("/koki");

  useEffect(() => {
    const filterMenu = () => {
      const lowerCaseQuery = query.toLowerCase();
      return menu.filter(
        (item) =>
          item.jenis_menu === activeCategory &&
          (item.id_menu.toLowerCase().includes(lowerCaseQuery) ||
            item.nama_menu.toLowerCase().includes(lowerCaseQuery) ||
            item.harga_menu <= query )
      );
    };

    const filterMenuCategory = () =>{
      return menu.filter(
        (item) =>
          item.jenis_menu === activeCategory
      );
    }
    if(isAdmin || isChef)
      setFilteredMenu(filterMenu());
    else
      setFilteredMenu(filterMenuCategory());
  }, [menu, activeCategory, query, isAdmin, isChef]);

  return (
    <div className="flex flex-col w-full h-auto">
      {filteredMenu.map((item, index) => (
        <div className="flex justify-between border bg-white p-3" key={index}>
          <div className="flex flex-col px-4">
            <h2 className="font-medium">{item.id_menu}</h2>
            <h2>{item.nama_menu}</h2>
            <h2>Rp. {item.harga_menu}</h2>
          </div>
          <div className="flex flex-col gap-2">
            {isAdmin ? (
              <>
                <Link
                  to={`/admin/menu/edit/${item.id_menu}`}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-1 text-center rounded-md transition-all duration-300"
                >
                  Edit
                </Link>
                <button className="bg-red-400 hover:bg-red-500 px-6 py-1 text-center rounded-md transition-all duration-300"
                onClick={() => handleDelete(item.id_menu)}>
                  Hapus
                </button>
              </>
            ) : isChef ? (
              <div className="flex flex-col h-full items-center justify-center">
                <button
                  className={`${
                    availability[item.id_menu] ? "bg-green-500" : "bg-red-500"
                  } hover:bg-opacity-75 ml-2 px-6 py-1 text-center rounded-md transition-all duration-300`}
                  onClick={() => handleAvailabilityToggle(item)}
                >
                  {availability[item.id_menu] ? "Tersedia" : "Tidak Tersedia"}
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={quantity[item.id_menu] || ""}
                  onChange={(e) =>
                    setQuantity({
                      ...quantity,
                      [item.id_menu]: e.target.value,
                    })
                  }
                  className="border rounded-md p-1 w-16"
                  placeholder="Qty"
                  disabled={!availability[item.id_menu]} // Disable input if the item is unavailable
                />
                <button
                  className={`ml-2 px-6 py-1 text-center rounded-md transition-all duration-300 ${
                    availability[item.id_menu]
                      ? "bg-teal-600 hover:bg-teal-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handleAddToOrder(item)}
                  disabled={!availability[item.id_menu]} // Disable button if the item is unavailable
                >
                  Tambah
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardMenu;
