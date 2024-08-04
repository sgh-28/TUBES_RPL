// import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-10'>
            <h1 className='text-4xl font-medium'>Selamat Datang</h1>
            <div className='flex gap-16'>
                <Link
                    to={'/login'}
                    className='flex flex-col bg-teal-600 items-center justify-center py-10 px-12 gap-3 rounded-xl cursor-pointer hover:bg-teal-500 transition-all duration-300'
                >
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M125 112.5V62.5C125 50.7125 125 44.8187 121.337 41.1625C117.675 37.5 111.788 37.5 100 37.5H25V112.5C25 124.281 25 130.175 28.6625 133.837C32.325 137.5 38.2125 137.5 50 137.5H100C111.788 137.5 117.675 137.5 121.337 133.837C125 130.175 125 124.281 125 112.5Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M75 68.7499C79.9728 68.7499 84.7419 70.7253 88.2583 74.2417C91.7746 77.758 93.75 82.5271 93.75 87.4999M75 68.7499C70.0272 68.7499 65.2581 70.7253 61.7417 74.2417C58.2254 77.758 56.25 82.5271 56.25 87.4999M75 68.7499V62.4999M93.75 87.4999H56.25M93.75 87.4999H100M56.25 87.4999H50M50 112.5H100M25 37.4999L71.1563 18.1624C81.4625 13.8437 86.6125 11.6812 90.7188 12.7874C93.3811 13.5028 95.7322 15.0783 97.4063 17.2687C100 20.6562 100 26.2687 100 37.4999" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className='text-slate-50 text-lg'>Pelayan</h1>
                </Link>
                <Link to={'/koki'} className='flex flex-col bg-teal-600 items-center justify-center py-10 px-12 gap-3 rounded-xl cursor-pointer hover:bg-teal-500 transition-all duration-300'>
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.5061 106.306L112.5 106.25M74.9998 18.75C86.9873 18.75 96.9998 27.1875 99.4373 38.4438C102.607 37.5861 105.914 37.361 109.17 37.7815C112.427 38.2019 115.568 39.2597 118.416 40.8943C121.263 42.5289 123.761 44.7083 125.766 47.3082C127.772 49.9081 129.245 52.8775 130.103 56.0469C130.961 59.2162 131.186 62.5235 130.765 65.7799C130.345 69.0362 129.287 72.1778 127.652 75.0254C126.018 77.873 123.838 80.3707 121.239 82.376C118.639 84.3813 115.669 85.8548 112.5 86.7125V131.25H37.4998V86.7125C34.3305 85.854 31.3612 84.3796 28.7617 82.3736C26.1621 80.3676 23.9831 77.8691 22.3491 75.021C20.715 72.1728 19.658 69.0307 19.2383 65.7741C18.8186 62.5174 19.0445 59.21 19.903 56.0406C20.7615 52.8713 22.2358 49.902 24.2419 47.3024C26.2479 44.7029 28.7463 42.5239 31.5945 40.8898C34.4426 39.2558 37.5847 38.1988 40.8414 37.7791C44.098 37.3594 47.4055 37.5852 50.5748 38.4438C51.7863 32.866 54.8699 27.8708 59.3133 24.2882C63.7566 20.7055 69.2921 18.7512 74.9998 18.75Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className='text-slate-50 text-lg'>Koki</h1>
                </Link>
                <Link to={'/login'} className='flex flex-col bg-teal-600 items-center justify-center py-10 px-12 gap-3 rounded-xl cursor-pointer hover:bg-teal-500 transition-all duration-300'>
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M125 87.5L122.456 64.6062C120.694 48.7437 119.812 40.8062 114.475 36.0312C109.125 31.25 101.15 31.25 85.1875 31.25H64.8125C48.85 31.25 40.8688 31.25 35.525 36.0312C30.1875 40.8062 29.3063 48.7437 27.5438 64.6062L25 87.5M71.875 12.5H87.5M87.5 12.5H103.125M87.5 12.5V31.25M104.169 87.5H45.8313C32.1688 87.5 25.3375 87.5 20.4938 90.8938C18.7063 92.1438 17.1437 93.7063 15.8937 95.4938C12.5 100.338 12.5 107.169 12.5 120.831C12.5 127.663 12.5 131.081 14.1937 133.5C14.8229 134.404 15.5917 135.173 16.5 135.806C18.9188 137.5 22.3375 137.5 29.1687 137.5H120.831C127.663 137.5 131.081 137.5 133.5 135.806C134.404 135.173 135.173 134.404 135.806 133.5C137.5 131.081 137.5 127.663 137.5 120.831C137.5 107.169 137.5 100.338 134.106 95.4938C132.856 93.7063 131.294 92.1438 129.506 90.8938C124.663 87.5 117.831 87.5 104.169 87.5Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M56.25 109.375L62.475 113.525C64.5293 114.895 66.9433 115.626 69.4125 115.625H80.5875C83.0567 115.626 85.4707 114.895 87.525 113.525L93.75 109.375M50 50H62.5" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className='text-slate-50 text-lg'>Kasir</h1>
                </Link>
            </div>
            <Link to={'/login'} className='flex bg-orange-400 px-16 py-4 rounded-xl hover:bg-orange-500 transition-all duration-300 cursor-pointer'>
                <h1 className='text-lg text-slate-50'>Admin</h1>
            </Link>
        </div>
    )
}
