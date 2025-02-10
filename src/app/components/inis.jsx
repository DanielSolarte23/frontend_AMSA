import "../../styles/publicas/inicioSesion.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FormInicio() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signErrors, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/perfil-admin");
  }, [isAuthenticated, navigate]);
  return (
    <div className="w-full p-5 sm:w-full sm:h-screen md:h-screen h-screen lg:w-2/4 flex flex-col sm:justify-center xl:px-14 md:w-full">
      <div className="md:h-5/6 h-full px-8  rounded-2xl form-filter ">
        <div className="h-1/6 flex flex-col justify-center items-center">
          {signErrors.map((error, i) => (
            <div
              className="bg-red-500 p-2 text-white text-center w-5/6 h-10"
              key={i}
            >
              {error}
            </div>
          ))}
          <h1 className="bienv text-2xl xl:text-2xl sm:text-3xl">Bienvenido</h1>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full h-full items-center xl:h-5/6"
        >
          <div className="h-2/5 w-full px-4 sm:h-2/5  xl:h-2/5">
            <div className=" h-1/2 p-1">
              <div className="h-5/6 sm:h-5/6 relative ">
                <input
                  className="pl-12 border-b-4 w-full h-full focus:border-b-4  focus:border-verde-principal focus:outline-none text-xl  hover:border-verde-principal bt2 md:text-base xl:text-xl sm:h-full"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Correo"
                />
                <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-2/3 text-2xl text-verde-principal " />
              </div>
              {errors.email && (
                <p className="text-red-500">El correo es requerido </p>
              )}
            </div>
            <div className="relative  h-1/2 -mb-5 p-1">
              <div className="h-5/6 sm:h-5/6 relative">
                <input
                  className=" pl-12 border-b-4 w-full h-full focus:border-b-4  focus:border-verde-principal focus:outline-none text-xl  hover:border-verde-principal bt2 md:text-base xl:text-xl sm:h-full"
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Contraseña"
                />
                <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-verde-principal" />
              </div>
              {errors.password && (
                <p className="text-red-500">la contraseña es requerida </p>
              )}
            </div>
          </div>
          <div className="h-1/5 w-full flex flex-col justify-center gap-3 px-4 xl:h-1/5">
            <p className="md:text-xl text-sm  lg:text-xl gap-3 flex whitespace-nowrap sm:text-xl sm:w-full sm:justify-between flex-wrap">
              ¿Olvido su contraseña?
              <strong className="text-verde-principal font-medium">
                {" "}
                Recuperar
              </strong>
            </p>
            <p className=" flex text-sm gap-3 sm:text-xl sm:w-full sm:justify-between lg:text-xl flex-wrap">
              ¿No tiene una cuenta?
              <strong className="text-verde-principal font-medium">
                {" "}
                Crear cuenta
              </strong>
            </p>
          </div>
          <div className="h-1/5 md:h-1/5 sm:h-1/5 w-full flex flex-col justify-evenly items-center  xl:h-2/5">
            <div className="w-full h-1/2 flex justify-center items-center">
              <button className="bg-verde-principal w-2/3 h-2/3 sm:h-2/3 flex items-center justify-center sm:w-2/3 p-2 text-white rounded-xl  hover:bg-gray-200 hover:text-verde-principal transition sm:text-xl xl:h-1/2">
                Iniciar sesión
              </button>
            </div>
            <div className="w-full h-1/2 flex justify-center items-center xl:items-start">
              <button className="flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-100 transition duration-200 shadow-md w-2/3">
                <i className="fab fa-google text-red-500"></i>
                <span className="font-medium">Sign in with Google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}