const BASE_URL = "https:calm-growth-production.up.railway.app"; // à adapter si backend est déployé

export async function getBootcamps() {
  const res = await fetch(`${BASE_URL}/bootcamps`);
  if (!res.ok) throw new Error("Erreur chargement bootcamps");
  return res.json();
}

export async function getBootcamp(id: string) {
  const res = await fetch(`${BASE_URL}/bootcamps/${id}`);
  if (!res.ok) throw new Error("Erreur chargement bootcamp");
  return res.json();
}

export async function createLead(data: {
    fullname: string;
    email: string;
    phone: string;
    message: string;
    bootcampId: string;
  }) {
    const res = await fetch(`${BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorText = await res.text(); // 🔍 lisible en console
      console.error("Erreur API createLead:", errorText);
      throw new Error("Erreur lors de l'envoi du lead");
    }
  
    return res.json();
  }
  
export async function getLeads(token: string) {
  const res = await fetch(`${BASE_URL}/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur chargement des leads");
  return res.json();
}

export async function updateLeadStatus(id: string, status: string, token: string) {
    const res = await fetch(`${BASE_URL}/leads/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API updateLeadStatus ERROR:", errorText);
      throw new Error("Erreur mise à jour statut");
    }
  
    return res.json();
  }
  export async function createBootcamp(
    data: {
      title: string;
      duration: string;
      price: number;
      nextSession: string;
    },
    token: string
  ) {
    const res = await fetch(`${BASE_URL}/bootcamps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API createBootcamp ERROR:", errorText);
      throw new Error("Erreur lors de la création du bootcamp");
    }
  
    return res.json();
  }
  
  export async function updateBootcamp(
    id: string,
    data: {
      title: string;
      duration: string;
      price: number;
      nextSession: string;
    },
    token: string
  ) {
    const res = await fetch(`${BASE_URL}/bootcamps/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API updateBootcamp ERROR:", errorText);
      throw new Error("Erreur mise à jour bootcamp");
    }
  
    return res.json();
  }
  
  export async function deleteBootcamp(id: string, token: string) {
    const res = await fetch(`${BASE_URL}/bootcamps/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API deleteBootcamp ERROR:", errorText);
      throw new Error("Erreur suppression bootcamp");
    }
  
    // ✅ ne pas faire res.json() si réponse vide
    return;
  }
  
  
  
