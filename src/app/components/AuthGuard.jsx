"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicPaths = ["/login", "/register"];

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);
  const esRutaPublica = publicPaths.includes(pathname);

  useEffect(() => {
    // El token se guarda en localStorage, por eso la validación se ejecuta en el navegador.
    const token = localStorage.getItem("token");

    if (!token && !publicPaths.includes(pathname)) {
      router.replace("/login");
      return;
    }

    setVerificando(false);
  }, [pathname, router]);

  // Evita mostrar una página protegida antes de terminar la validación.
  if (verificando && !esRutaPublica) {
    return null;
  }

  return children;
}