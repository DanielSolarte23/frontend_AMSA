'use client'
import React from 'react'
import { useAuth } from '@/app/context/autenticacionContext'

function PerfilAdmin() {
  const { user } = useAuth()

  return (
    <div className='w-full flex h-full mt-20'>
      <div className='w-1/3 flex flex-col items-center justify-center px-2 ml-10'>
        <img className="object-cover w-48 h-48 mx-2 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="avatar" />
        <input className='mt-10' type="file" />
      </div>
      <div className='w-2/3 flex justify-center items-center'>
        <section className="w-5/6 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Mis Datos</h2>

          <form>
            <div className="flex flex-col gap-6 mt-4 ">
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">nombre</label>
                <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder={user.nombre} />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Correo</label>
                <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder={user.correo} />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="documento">Documento</label>
                <input id="documento" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder={user.documento} />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Rol</label>
                <input id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder={user.rol} />
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PerfilAdmin