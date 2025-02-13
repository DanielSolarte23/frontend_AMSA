'use client'

import { useEffect, useState } from "react";
import { usePagos } from "@/app/context/pagosContext";
import { useUsuarios } from "@/app/context/usuariosContext";


function PagosAdmin() {
  const {
    pagos,
    getPagos,
    createPagos,
    deletePagos,
    updatePago,
    loading,
    errors
  } = usePagos();

  const {
    propietarios,
    getPropietarios,
  } = useUsuarios();

  const [form, setForm] = useState({
    cantidad: "",
    propietarioId: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getPagos();
    getPropietarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updatePago(editId, form);
      setEditId(null);
    } else {
      await createPagos(form);
      console.log(errors);
    }

    await getPagos();

    setForm({
      cantidad: "",
      propietarioId: "",
    });
  };

  const handleDelete = async (id) => {
    await deletePagos(id);
    await getPagos();
  };


  const handleEdit = (pago) => {
    setForm({
      cantidad: pago.cantidad,
      propietarioId: pago.propietarioId,
    });
    setEditId(pago.id);
  };

  return (
    <div className="p-4 mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Editar pago" : "Registrar pago"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <select
            name="propietarioId"
            value={form.propietarioId}
            onChange={handleChange}
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required>
            <option value=''>Seleccione el propietario</option>
            {propietarios.map((propietario) => (
              <option key={propietario.id} value={propietario.id}>
                {propietario.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white px-2 py-4 rounded">
            {editId ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>

      <hr />

      <div className="py-10 flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold mb-4">Lista de pagos</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Cantidad</th>
              <th className="border border-gray-700 p-2">Propietario</th>
              <th className="border border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} className="border border-gray-700 text-center">
                <td className="border border-gray-700 p-2">{pago.id}</td>
                <td className="border border-gray-700 p-2">{pago.cantidad}</td>
                <td className="border border-gray-700 p-2">{pago.Usuario?.nombre || "Sin propietario"}</td>
                <td className="border border-gray-700 p-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(pago)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(pago.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PagosAdmin