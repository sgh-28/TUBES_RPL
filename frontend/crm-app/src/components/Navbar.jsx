import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const user = jwtDecode(token);

  let pageTitle;

  switch (location.pathname) {
    case '/pelayan/reservasi':
      pageTitle = 'Reservasi';
      break;
    case '/pelayan/menu':
      pageTitle = 'Menu';
      break;
    case '/admin/':
      pageTitle = 'Beranda';
      break;
    case '/admin/karyawan':
      pageTitle = 'Manajemen Karyawan';
      break;
    case '/admin/karyawan/add':
      pageTitle = 'Manajemen Karyawan';
      break;
    case '/admin/karyawan/edit':
      pageTitle = 'Manajemen Karyawan';
      break;
    case '/admin/meja':
      pageTitle = 'Manajemen Meja';
      break;
    case '/admin/menu':
      pageTitle = 'Manajemen Menu';
      break;
    default:
      pageTitle = ' ';
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow z-50'>
        <h2 className='text-xl font-medium text-black py-2'>Halo {user.nama} !</h2>
        <h2>{pageTitle}</h2>
    </div>
  )
}

export default Navbar