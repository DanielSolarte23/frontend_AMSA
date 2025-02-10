"use client";
import { useAuth } from "@/app/context/autenticacionContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RutasProtegidas({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsChecking(false);
      if (!isAuthenticated) {
        router.replace('/inicio');
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isChecking) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-2 border-l-4 border-verde"></div>
        <p className="text-verde text-xl font-medium">Cargando...</p>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}