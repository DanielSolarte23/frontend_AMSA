import RutasProtegidas from "@/app/components/RutasProtegidas";
import { ApartamentosProvider } from "@/app/context/apartamentosContext";
import { InformesProvider } from "@/app/context/informesContext";
import { PagosProvider } from "@/app/context/pagosContext";
import { UsuariosProvider } from "@/app/context/usuariosContext";
import { VisitasProvider } from "@/app/context/visitasContex";

export default function AuthLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <RutasProtegidas>
                    <UsuariosProvider>
                        <ApartamentosProvider>
                            <InformesProvider>
                                <PagosProvider>
                                    <VisitasProvider>
                                        {children}
                                    </VisitasProvider>
                                </PagosProvider>
                            </InformesProvider>
                        </ApartamentosProvider>
                    </UsuariosProvider>
                </RutasProtegidas>
            </body>
        </html>
    );
}