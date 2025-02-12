'use client'
import { useEffect, useState } from 'react'
import { useVisitas } from '@/app/context/visitasContex';

function VisitantesAdmin() {
  const {
    visitas,
    getVisitas,
    createVisitas,
    deleteVisitas,
    updateVisita,
  } = useVisitas();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    apartamentoId: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getVisitas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateVisita(editId, form);
      setEditId(null);
    } else {
      await createVisitas(form);
    }

    await getVisitas();

    setForm({ nombre: "", apellido: "", documento: "", telefono: "", apartamentoId: "" });
  };

  const handleDelete = async (id) => {
    await deleteVisitas(id);
    await getVisitas();
  };


  const handleEdit = (visita) => {
    setForm({
      nombre: visita.nombre,
      apellido: visita.apellido,
      documento: visita.documento,
      telefono: visita.telefono,
      apartamentoId: visita.apartamentoId,
    });
    setEditId(visita.id);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Editar Visita" : "Registrar Visita"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <input
            type="text"
            name="documento"
            value={form.documento}
            onChange={handleChange}
            placeholder="Documento"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Telefono"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />

          <input
            type="number"
            name="apartamentoId"
            value={form.apartamentoId}
            onChange={handleChange}
            placeholder="ID del Apartamento"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white px-2 py-4 rounded">
            {editId ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>

      <hr />

      <div className="py-10 flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold mb-4">Lista de Visitantes</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Nombre</th>
              <th className="border border-gray-700 p-2">Apellido</th>
              <th className="border border-gray-700 p-2">Documento</th>
              <th className="border border-gray-700 p-2">Telefono</th>
              <th className="border border-gray-700 p-2">Apartamento</th>
              <th className="border border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id} className="border border-gray-700 text-center">
                <td className="border border-gray-700 p-2">{visita.id}</td>
                <td className="border border-gray-700 p-2">{visita.nombre}</td>
                <td className="border border-gray-700 p-2">{visita.apellido}</td>
                <td className="border border-gray-700 p-2">{visita.documento}</td>
                <td className="border border-gray-700 p-2">{visita.telefono}</td>
                <td className="border border-gray-700 p-2">{visita.apartamentoId}</td>
                <td className="border border-gray-700 p-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(visita)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(visita.id)}
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

export default VisitantesAdmin