import "./globals.css";
import Navbar from "@/./components/Navbar";

export const metadata = {
  title: "Xarala Bootcamps",
  description: "Inscrivez-vous aux bootcamps tech de Xarala",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <div className="max-w-6xl mx-auto mt-6 px-4">{children}</div>
      </body>
    </html>
  );
}
