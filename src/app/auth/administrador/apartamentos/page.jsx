'use client'
import { useEffect, useState } from "react";
import { useApartamentos } from "@/app/context/apartamentosContext";
import { useUsuarios } from "@/app/context/usuariosContext";

export default function ApartamentosComponent() {
  const {
    apartamentos,
    getApartamentos,
    createApartamentos,
    deleteApartamento,
    updateApartamento,
  } = useApartamentos();

  const { propietarios, getPropietarios } = useUsuarios();

  const [form, setForm] = useState({
    nroApto: "",
    torre: "",
    estado: "desocupado",
    propietarioId: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getApartamentos();
    getPropietarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateApartamento(editId, form);
      setEditId(null);
    } else {
      await createApartamentos(form);
    }

    await getApartamentos();

    setForm({ nroApto: "", torre: "", estado: "desocupado", propietarioId: "" });
  };

  const handleDelete = async (id) => {
    await deleteApartamento(id);

    // Volver a obtener los apartamentos después de eliminar
    await getApartamentos();
  };


  const handleEdit = (apartamento) => {
    setForm({
      nroApto: apartamento.nroApto,
      torre: apartamento.torre,
      estado: apartamento.estado,
      propietarioId: apartamento.propietarioId,
    });
    setEditId(apartamento.id);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Editar Apartamento" : "Registrar Apartamento"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            name="nroApto"
            value={form.nroApto}
            onChange={handleChange}
            placeholder="Número de Apartamento"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <input
            type="text"
            name="torre"
            value={form.torre}
            onChange={handleChange}
            placeholder="Torre"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full px-2 py-4 border text-zinc-400 rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
          >
            <option value="desocupado">Desocupado</option>
            <option value="ocupado">Ocupado</option>
          </select>
          <select
            name="propietarioId"
            value={form.propietarioId}
            onChange={handleChange}
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800">

            <option value="">Seleccione el propietario</option>
            {propietarios.map((propietario) => (
              <option key={propietario.id} value={propietario.id}>
                {propietario.nombre} {propietario.apellido}
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
        <h2 className="text-2xl font-bold mb-4">Lista de Apartamentos</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Nro Apto</th>
              <th className="border border-gray-700 p-2">Torre</th>
              <th className="border border-gray-700 p-2">Estado</th>
              <th className="border border-gray-700 p-2">Propietario</th>
              <th className="border border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {apartamentos.map((apt) => (
              <tr key={apt.id} className="border border-gray-700 text-center">
                <td className="border border-gray-700 p-2">{apt.id}</td>
                <td className="border border-gray-700 p-2">{apt.nroApto}</td>
                <td className="border border-gray-700 p-2">{apt.torre}</td>
                <td className="border border-gray-700 p-2">{apt.estado}</td>
                <td className="border border-gray-700 p-2">{apt.Usuario?.nombre || "sin propietario"}</td>
                <td className="border border-gray-700 p-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(apt)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(apt.id)}
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
