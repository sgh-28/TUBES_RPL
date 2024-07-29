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
                <Link className={getLinkClass('/admin/menu/appetizer')} to="/admin/menu/appetizer">Appetizer</Link>
                <Link className={getLinkClass('/admin/menu/main-course')} to="/admin/menu/main-course">Main Course</Link>
                <Link className={getLinkClass('/admin/menu/dessert')} to="/admin/menu/dessert">Dessert</Link>
                <Link className={getLinkClass('/admin/menu/drink')} to="/admin/menu/drink">Drink</Link>
                <Link className={getLinkClass('/admin/menu/side-dish')} to="/admin/menu/side-dish">Side Dish</Link>
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