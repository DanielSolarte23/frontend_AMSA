
import BarraLateral from "@/app/components/BarraLateral";
import NavBar from "@/app/components/NavBar";

export default function AdminLayout({ children }) {
  return (
    <div className="w-full">
      <NavBar />
      <main className="flex">
        <BarraLateral />
        <section className="w-full justify-end">
          <main className="flex">
            <div className="w-1/6"></div>
            <div className="w-5/6">{children}</div>
          </main>
        </section>
      </main>
    </div>
  );
}