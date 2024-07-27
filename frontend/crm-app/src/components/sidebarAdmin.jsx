import React from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function SidebarAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const getLinkClass = (path) => {
        return location.pathname === path ? 'button-primary-active' : 'button-primary';
    };

    const renderLinks = () => {
        if (location.pathname.startsWith('/admin')) {
            return (
                <>
                    <Link className={getLinkClass('/admin/')} to="/admin/">Beranda</Link>
                    <Link className={getLinkClass('/admin/karyawan')} to="/admin/karyawan">Pegawai</Link>
                    <Link className={getLinkClass('/admin/menu')} to="/admin/menu">Menu</Link>
                    <Link className={getLinkClass('/admin/meja')} to="/admin/meja">Meja</Link>
                </>
            );
        } else if (location.pathname.startsWith('/pelayan')) {
            return (
                <>
                    <Link className={getLinkClass('/pelayan/menu/appetizer')} to="/pelayan/menu/appetizer">Appetizer</Link>
                    <Link className={getLinkClass('/pelayan/menu/main-course')} to="/pelayan/menu/main-course">Main Course</Link>
                    <Link className={getLinkClass('/pelayan/menu/dessert')} to="/pelayan/menu/dessert">Dessert</Link>
                    <Link className={getLinkClass('/pelayan/menu/drink')} to="/pelayan/menu/drink">Drink</Link>
                    <Link className={getLinkClass('/pelayan/menu/side-dish')} to="/pelayan/menu/side-dish">Side Dish</Link>
                </>
            );
        }
    };

  return (
    <div className="flex flex-col w-1/6 justify-between drop-shadow-lg bg-white">
        <div className='flex flex-col px-6 py-12 gap-4'> 
            {renderLinks()}
        </div>
        <div className='flex flex-col px-6 py-12'>
            <button className="button-primary text-start" onClick={logout}>Logout</button>
        </div>
    </div>

  )
}

export default SidebarAdmin