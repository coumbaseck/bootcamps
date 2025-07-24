'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBootcamp, createLead } from "@/lib/api";

export default function BootcampDetailPage() {
  const { id } = useParams();
  const [bootcamp, setBootcamp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);  // Ajout de l'état pour la modale

  useEffect(() => {
    async function fetchBootcamp() {
      try {
        const data = await getBootcamp(id as string);
        setBootcamp(data);
      } catch (err) {
        setError("Erreur lors du chargement du bootcamp.");
      } finally {
        setLoading(false);
      }
    }

    fetchBootcamp();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createLead({ ...form, bootcampId: id as string });
      setSuccess(true);
      setForm({ fullname: "", email: "", phone: "", message: "" });
      setFormVisible(false);  // Ferme le formulaire après soumission
      setShowModal(true);  // Affiche la modale après soumission réussie
    } catch (err) {
      setError("Erreur lors de l'envoi du formulaire.");
    }
  };

  if (loading) return <p className="text-center p-6">Chargement...</p>;
  if (!bootcamp) return <p className="text-center text-red-600 p-6">Bootcamp introuvable.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">{bootcamp.title}</h1>
      <div className="text-lg text-gray-800 space-y-2">
        <p>📅 <strong>Durée :</strong> {bootcamp.duration}</p>
        <p>💰 <strong>Prix :</strong> {bootcamp.price} FCA</p>
        <p>🚀 <strong>Prochaine session :</strong> {bootcamp.nextSession}</p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-[#db4061] hover:bg-[#c43756] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
        >
          {formVisible ? "Annuler" : "Je suis intéressé·e"}
        </button>
      </div>

      {formVisible && (
        <section className="mt-10 border-t pt-8 transition-all duration-300 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Formulaire d’inscription</h2>

          {success && (
            <p className="text-green-600 mb-4 text-center">Merci ! Nous vous contacterons bientôt.</p>
          )}

          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nom complet</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={4}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-all"
              >
                Envoyer
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Modale popup qui s'affiche après l'inscription réussie */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-center mb-4">Inscription réussie !</h2>
            <p className="text-center mb-4">Merci de votre inscription. Nous vous contacterons bientôt.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
