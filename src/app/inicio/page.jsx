'use client'
import '@fortawesome/fontawesome-free/css/all.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/autenticacionContext'
import { useRouter } from "next/navigation";
import { useEffect } from 'react'
import Image from 'next/image'

function Inicio() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { inicio, errors: signErrors, isAuthenticated } = useAuth()

  const onSubmit = handleSubmit((data) => {
    inicio(data)
  });

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push("/auth/administrador")
  }, [isAuthenticated, router])

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="">
        {signErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 text-white text-center w-full h-10 fixed"
            key={i}
          >
            {error}
          </div>
        ))}
      </div>
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto  flex-col">
        <div className='w-full flex justify-center mb-5'><Image src="/VILLA_DEL_SOL.png" alt="Logo Conjunto Residencial" height={100} width={150} priority /></div>
        <form onSubmit={onSubmit} className="w-full max-w-md">

          <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Inicia Sesión</h1>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <i className="fa-solid fa-envelope w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
            </span>

            <input {...register("correo", { required: true })} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Correo" />

          </div>
          <div>
            {errors.email && (
              <p className="text-red-500">El correo es requerido </p>
            )}
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <i className="fa-solid fa-lock w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
            </span>

            <input {...register("contraseña", { required: true })} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña" />
          </div>
          <div>
            {errors.password && (
              <p className="text-red-500">la contraseña es requerida </p>
            )}
          </div>
          <div className="mt-6">
            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Iniciar Sesión
            </button>

            <div className="mt-6 text-center ">
              <p href="#" className="text-sm text-white hover:underline dark:text-white">
                No tiene una cuenta? <Link className="text-blue-500 hover:underline dark:text-blue-400" href="/registro">Regístrate</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Inicio