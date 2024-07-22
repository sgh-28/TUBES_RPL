import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  let pageTitle;

  switch (location.pathname) {
    case '/reservasi':
      pageTitle = 'Reservasi';
      break;
    case '/menu':
      pageTitle = 'Menu';
      break;
    default:
      pageTitle = ' ';
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Halo, Pelayan!</h2>
        <h2>{pageTitle}</h2>
    </div>
  )
}

export default Navbar