'use client'
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react'
import { useAuth } from '@/app/context/autenticacionContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function BarraLateralPropietario() {

    const { user, logout } = useAuth();
    const pathname = usePathname();
    return (
        <aside className="flex flex-col w-1/6 h-full px-4 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 fixed">
            <div className="flex flex-col items-center mt-5 -mx-2">
                <img className="object-cover w-20 h-20 mx-2 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png0" alt="avatar" />
                <h4 className="mx-2 mt-1 font-medium text-gray-800 dark:text-gray-200">{user.nombre}</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.correo}</p>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-1">
                <nav>
                    <hr className='mt-2' />
                    <button onClick={logout} className="flex items-center px-4 py-2 mt-2  text-red-500 transition-colors duration-300 transform rounded-lg dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-red-500 hover:text-red-500" href="#">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>

                        <span className="mx-4 font-medium whitespace-nowrap">Cerrar Sesión</span>
                    </button>
                </nav>
            </div>
        </aside>
    )
}

export default BarraLateralPropietario