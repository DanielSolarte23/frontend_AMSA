"use client";
import { useAuth } from "@/app/context/autenticacionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RutasProtegidas({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Esperar a que loading sea false antes de hacer la redirección
    if (!loading && isAuthenticated === false) {
      router.push('/inicio');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-2 border-l-4 border-verde"></div>
        <p className="text-verde text-xl font-medium">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
