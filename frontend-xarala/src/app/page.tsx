import Link from "next/link";
import { getBootcamps } from "@/lib/api";

export default async function HomePage() {
  const bootcamps = await getBootcamps();

  return (
    <main>
      <h1 className="text-3xl font-bold text-xaralaOrange mb-6 text-center">Nos Bootcamps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bootcamps.map((bootcamp: any) => (
          <div key={bootcamp.id} className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition">
            <h2 className="text-2xl font-semibold text-xaralaRose mb-2">{bootcamp.title}</h2>
            <p className="text-gray-700">⏱️ {bootcamp.duration}</p>
            <p className="text-gray-700">💰 {bootcamp.price} FCA</p>
            <p className="text-gray-700 mb-4">📅 {bootcamp.nextSession}</p>
            <Link
              href={`/bootcamps/${bootcamp.id}`}
              className="text-xaralaOrange hover:underline font-medium"
            >
              Voir les détails →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
