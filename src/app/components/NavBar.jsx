'use client'
import React from 'react'
import { useAuth } from '../context/autenticacionContext'
import Link from 'next/link'

function NavBar() {
    const { user, isAuthenticated, loading } = useAuth()

    const getInitials = () => {
        if (loading) return '...'
        if (!isAuthenticated || !user?.nombre) return 'I'
        return user.nombre[0].toUpperCase()
    }

    return (
        <nav className="bg-white h-1/8 shadow dark:bg-gray-800 fixed w-full">
            {isAuthenticated ? (<ul className='flex justify-end h-full w-full items-center px-10'>
                <li>
                    <div className='bg-gray-700 rounded-full h-10 w-10 flex justify-center items-center border border-gray-600'>
                        {getInitials()}
                    </div>
                </li>
            </ul>) : (
                <ul className='flex justify-end h-full w-full items-center px-10 gap-5'>
                    <li className='border px-3 py-2 rounded-md'>
                        <Link href='/inicio'>Iniciar Sesión</Link>

                    </li>
                    <li className='px-3 py-2 rounded-md bg-gray-900'>
                        <Link href='/registro'>Registrarse</Link>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar