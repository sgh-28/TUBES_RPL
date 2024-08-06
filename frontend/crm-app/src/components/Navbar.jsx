import { Link, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import useAuth from '../hooks/useAuth';


const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const user = jwtDecode(token);

  const { logout } = useAuth();

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
    case '/kasir/':
      pageTitle = 'Pembayaran';
      break;
    default:
      pageTitle = ' ';
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow z-50'>
        <h2 className='text-xl font-medium text-black py-2'>Halo, {user.nama} !</h2>
        <div className='flex gap-5 items-center'>
        <h2>{pageTitle}</h2>
        {location.pathname == '/pelayan/reservasi'?(
          <button className="button-primary text-center" onClick={logout}>Logout</button>
        ):location.pathname == '/pelayan/menu'?
        (
          <Link className="button-primary text-center" to="/pelayan/reservasi"
          onClick={()=>localStorage.removeItem('id_menu')}
          >Reservasi</Link>
        ):(
          <></>
        )}

        </div>
    </div>
  )
}

export default Navbar