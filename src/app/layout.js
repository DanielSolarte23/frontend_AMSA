import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/autenticacionContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 dark:bg-gray-900">
        <AuthProvider>
          <NavBar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
