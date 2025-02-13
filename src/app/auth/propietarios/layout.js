
import BarraLateralPropietario from "@/app/components/BarraPropietario";
import NavBar from "@/app/components/NavBar";

export default function SeguridadLayout({ children }) {
  return (
    <div className="w-full">
      <NavBar />
      <main className="flex">
        <BarraLateralPropietario />
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