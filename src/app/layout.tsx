import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Venta de Garage - Tu último adiós con oportunidades",
  description: "Vende lo que ya no necesitas antes de emprender una nueva aventura.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <header className="sticky top-0 z-30 border-b bg-white shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Venta de Garage
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Inicio
              </Link>
              <Link href="/productos" className="text-gray-700 hover:text-blue-600">
                Productos
              </Link>
              <Link href="/publicar" className="text-gray-700 hover:text-blue-600">
                Publicar
              </Link>
              <Link href="/sobre-nosotros" className="text-gray-700 hover:text-blue-600">
                Sobre Nosotros
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-lg font-bold">Venta de Garage</h3>
                <p className="text-gray-600">
                  Haz espacio para lo nuevo: Vende lo que ya no necesitas y emprende tu aventura.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-blue-600">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/productos" className="text-gray-600 hover:text-blue-600">
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link href="/publicar" className="text-gray-600 hover:text-blue-600">
                      Publicar
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Contacto</h3>
                <p className="text-gray-600">
                  ¿Tienes alguna pregunta? ¡Contáctanos!
                </p>
                <p className="mt-2 text-gray-600">
                  Email: info@ventadegarage.com
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
              © {new Date().getFullYear()} Venta de Garage. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
