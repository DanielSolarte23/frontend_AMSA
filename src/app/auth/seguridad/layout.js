import RutasProtegidas from "../../components/RutasProtegidas";
import { ApartamentosProvider } from "../../context/apartamentosContext";
import { InformesProvider } from "../../context/informesContext";
import { PagosProvider } from "../../context/pagosContext";
import { UsuariosProvider } from "../../context/usuariosContext";
import { VisitasProvider } from "../../context/visitasContex";

export default function SeguridadLayout({ children }) {
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