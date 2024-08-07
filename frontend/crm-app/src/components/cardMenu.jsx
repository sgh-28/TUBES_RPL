import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function CardMenu({ activeCategory, orderList, setOrderList, query }) {
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [availability, setAvailability] = useState({});
  const [filteredMenu, setFilteredMenu] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button-alert-con ml-1',
      cancelButton: 'button-alert-can mr-1'
    },
    buttonsStyling: false
  });

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

  const handleAddToOrder = (item) => {
    if (!quantity[item.id_menu] || quantity[item.id_menu] <= 0) {
      swalWithBootstrapButtons.fire(
        'Isi Kuantitas!',
        'Kuantitas yang dimasukkan kosong',
        'warning'
      );
      return;
    }
    setOrderList((prevOrderList) => [
      ...prevOrderList,
      { id_menu: item.id_menu, harga_menu: item.harga_menu, nama_menu: item.nama_menu, quantity: quantity[item.id_menu] },
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
    swalWithBootstrapButtons.fire({
      title: `Apakah anda yakin ingin menghapus ${id_menu}?`,
      text: "Anda tidak bisa mengembalikannya lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus ini!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/api/menu/${id_menu}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setMenu((prevMeja) => prevMeja.filter((item) => item.id_menu !== id_menu));
            swalWithBootstrapButtons.fire(
              'Data Terhapus!',
              'Data menu telah dihapus.',
              'success'
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Terjadi kegagalan!',
              footer: 'Gagal untuk menghapus menu'
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kegagalan!',
            footer: 'Gagal untuk menghapus menu'
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Batal',
          'Data menu anda aman :)',
          'error'
        );
      }
    });
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
                  disabled={!availability[item.id_menu]} 
                />
                <button
                  className={`ml-2 px-6 py-1 text-center rounded-md transition-all duration-300 ${
                    availability[item.id_menu]
                      ? "bg-teal-600 hover:bg-teal-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handleAddToOrder(item)}
                  disabled={!availability[item.id_menu]}
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
