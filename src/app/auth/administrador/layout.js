import BarraLateral from "@/app/components/BarraLateral";
import NavBar from "@/app/components/NavBar";

export default function AdminLayout({ children }) {
  return (
    <body className="w-full h-screen">
      <NavBar />
      <main className="h-5/6 flex">
        <BarraLateral />
        {children}
      </main>
    </body>
  );
}