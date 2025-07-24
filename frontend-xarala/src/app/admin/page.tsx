'use client';

import { getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLeads, updateLeadStatus } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [bootcamps, setBootcamps] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: 0,
    nextSession: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getBootcamps().then(setBootcamps);
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/login");
      return;
    }

    setToken(savedToken);

    getLeads(savedToken)
      .then(setLeads)
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    if (!token) return;

    try {
      await updateLeadStatus(id, status, token);
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status } : lead
        )
      );
    } catch (err) {
      console.error("Erreur mise à jour statut :", err);
    }
  };

  const handleSubmitBootcamp = async () => {
    if (!token) return;

    try {
      const { id, ...bootcampData } = form;
      const dataToSend = {
        ...bootcampData,
        price: Number(form.price),
        nextSession: new Date(form.nextSession).toISOString(),
      };

      if (editingId) {
        await updateBootcamp(editingId, dataToSend, token);
      } else {
        await createBootcamp(dataToSend, token);
      }

      const updated = await getBootcamps();
      setBootcamps(updated);
      setForm({ title: "", duration: "", price: 0, nextSession: "" });
      setEditingId(null);
    } catch (err) {
      alert("Erreur lors de l'enregistrement du bootcamp");
    }
  };
  const buttonStyle = {
    backgroundColor: "#ff7f2a", // Couleur Xarala
    borderRadius: "4px",
    color: "#fff",
    padding: "10px 20px",
    cursor: "pointer",
  };
  
  const buttonHoverStyle = {
    backgroundColor: "#db4061", // Couleur secondaire pour hover
  };
  

  const handleEditBootcamp = (b: any) => {
    setForm(b);
    setEditingId(b.id);
  };

  const handleDeleteBootcamp = async (id: string) => {
    if (!token || !confirm("Supprimer ce bootcamp ?")) return;
    await deleteBootcamp(id, token);
    const updated = await getBootcamps();
    setBootcamps(updated);
  };

  if (!bootcamps.length) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <main>
      <h1 className="text-2xl font-bold text-center text-xaralaRose mb-4">Dashboard Admin</h1>

      {/* Table des leads */}
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-xaralaOrange text-black">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Téléphone</th>
            <th className="p-3 text-left">Formation</th>
            <th className="p-3 text-left">Statut</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-3">{lead.fullname}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{lead.bootcamp?.title || "Non spécifié"}</td>
              <td className="p-3 font-semibold">{lead.status}</td>
              <td className="p-3 space-x-2">
                {["Nouveau", "Contacté", "Inscrit"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(lead.id, s)}
                    className={`px-3 py-1 rounded text-white ${
                      s === "Inscrit"
                        ? "bg-green-600"
                        : s === "Contacté"
                        ? "bg-blue-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-10" />
      <h2 className="text-xl font-bold text-center text-xaralaRose mb-4">Gestion des Bootcamps</h2>

      {/* Formulaire ajout / modification Bootcamp */}
      <div className="bg-gray-50 border rounded p-4 mb-6 space-y-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="p-2 border rounded" />
          <input placeholder="Durée" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="p-2 border rounded" />
          <input type="number" placeholder="Prix" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className="p-2 border rounded" />
          <input type="date" placeholder="Prochaine session" value={form.nextSession} onChange={(e) => setForm({ ...form, nextSession: e.target.value })} className="p-2 border rounded" />
        </div>
        <button
          onClick={handleSubmitBootcamp}
          className="bg-xaralaOrange text-black px-4 py-2 rounded hover:bg-orange-600"
          style={{ display: form.title && form.price && form.nextSession ? 'block' : 'inline-block' }}
        >
          {editingId ? "Mettre à jour" : "Ajouter"} le bootcamp
        </button>
      </div>

      {/* Table des Bootcamps */}
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden max-w-4xl mx-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Titre</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Prix</th>
            <th className="p-3 text-left">Session</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bootcamps.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.duration}</td>
              <td className="p-3">{b.price} FCA</td>
              <td className="p-3">{b.nextSession}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => handleEditBootcamp(b)} className="text-blue-600 hover:underline">Modifier</button>
                <button onClick={() => handleDeleteBootcamp(b.id)} className="text-red-600 hover:underline">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
