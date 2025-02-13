'use client'
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react'
import { useAuth } from '@/app/context/autenticacionContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function BarraLateralSeguridad() {

    const { user, logout } = useAuth();
    const pathname = usePathname();
    return (
        <aside className="flex flex-col w-1/6 h-full px-4 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 fixed">
            <div className="flex flex-col items-center mt-5 -mx-2">
                <img className="object-cover w-20 h-20 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                <h4 className="mx-2 mt-1 font-medium text-gray-800 dark:text-gray-200">{user.nombre}</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.correo}</p>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-1">
                <nav>
                    <Link className={`flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${pathname === "/auth/seguridad" ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`} href="/auth/seguridad">
                        <i className="fa-solid fa-house-user"></i>

                        <span className="mx-4 font-medium">Inicio</span>
                    </Link>

                    <Link className={`flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${pathname === "/auth/seguridad/apartamentos" ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`} href="/auth/seguridad/apartamentos">
                        <i className="fa-solid fa-building"></i>

                        <span className="mx-4 font-medium">Apartamentos</span>
                    </Link>

                    <Link className={`flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${pathname === "/auth/seguridad/usuarios" ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`} href="/auth/seguridad/propietarios">
                        <i className="fa-solid fa-building-user"></i>

                        <span className="mx-4 font-medium">Propietarios</span>
                    </Link>

                    <Link className={`flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${pathname === "/auth/seguridad/visitas" ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`} href="/auth/seguridad/visitas">
                        <i className="fa-solid fa-person-walking"></i>

                        <span className="mx-4 font-medium">Visitas</span>
                    </Link>
                    <Link className={`flex items-center px-4 py-2 mt-2 mb-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${pathname === "/auth/seguridad/informes" ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`} href="/auth/seguridad/informes">
                        <i className="fa-solid fa-file-lines"></i>

                        <span className="mx-4 font-medium">Informes</span>
                    </Link>
                    <hr />
                    <button onClick={logout} className="flex items-center px-4 py-2 mt-2  text-red-500 transition-colors duration-300 transform rounded-lg dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-red-500 hover:text-red-500" href="#">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>

                        <span className="mx-4 font-medium whitespace-nowrap">Cerrar Sesión</span>
                    </button>
                </nav>
            </div>
        </aside>
    )
}

export default BarraLateralSeguridad