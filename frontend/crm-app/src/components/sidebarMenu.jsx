import React from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function SidebarAdmin() {
    const location = useLocation();
    const navigate = useNavigate();

    const getLinkClass = (path) => {
        return location.pathname === path ? 'button-primary-active' : 'button-primary';
      };
    
    const getParentLinkClass = (parentPath) => {
    return location.pathname.startsWith(parentPath) ? 'button-primary-active' : 'button-primary';
    };

    const renderLinks = () => {
        return (
            <>
                <Link className={getLinkClass('/admin/menu/utama')} to="/admin/menu/utama">Makanan Utama</Link>
                <Link className={getLinkClass('/admin/menu/cemilan')} to="/admin/menu/cemilan">Cemilan</Link>
                <Link className={getLinkClass('/admin/menu/dessert')} to="/admin/menu/dessert">Dessert</Link>
            </>
        );
    };

  return (
    <div className="flex  w-1/5 justify-between bg-white z-20">
        <div className='flex flex-col px-6 py-10 gap-4 mt-2'> 
            {renderLinks()}
        </div>
    </div>

  )
}

export default SidebarAdmin