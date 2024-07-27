import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
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
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow z-20'>
        <h2 className='text-xl font-medium text-black py-2'>Halo, Pelayan!</h2>
        <h2>{pageTitle}</h2>
    </div>
  )
}

export default Navbar