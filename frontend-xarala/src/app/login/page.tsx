'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur de connexion");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token); // ✅ Stocke le token

      router.push("/admin"); // Redirige vers dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-xaralaRose">Connexion admin</h1>

      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-xaralaOrange text-orange py-2 rounded hover:bg-orange-600 transition"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
