import { Button } from "@/components/ui/button";

export default function PublicarPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">Publica tu Producto</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Da una nueva oportunidad a tus objetos y ayuda a financiar tu próxima aventura.
        </p>
      </section>

      <section className="mx-auto max-w-2xl">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="nombre" className="mb-2 block font-medium text-gray-700">
                Nombre del producto
              </label>
              <input
                type="text"
                id="nombre"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ej. Bicicleta"
                required
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="mb-2 block font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="descripcion"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe tu producto, su estado, etc."
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="precio" className="mb-2 block font-medium text-gray-700">
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-0 top-0 flex h-full items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="precio"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-7 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="100"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="mb-2 block font-medium text-gray-700">
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="" disabled selected>
                  Selecciona una categoría
                </option>
                <option value="muebles">Muebles</option>
                <option value="electronica">Electrónica</option>
                <option value="ropa">Ropa y Accesorios</option>
                <option value="hogar">Hogar y Cocina</option>
                <option value="deportes">Deportes y Aire Libre</option>
                <option value="libros">Libros y Entretenimiento</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <label htmlFor="fotos" className="mb-2 block font-medium text-gray-700">
                Fotos
              </label>
              <div className="rounded-lg border border-dashed border-gray-400 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  Arrastra y suelta tus fotos aquí, o
                </p>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => document.getElementById("fotos-input")?.click()}
                >
                  Seleccionar archivos
                </Button>
                <input
                  type="file"
                  id="fotos-input"
                  className="hidden"
                  accept="image/*"
                  multiple
                />
              </div>
            </div>

            <div>
              <label htmlFor="contacto" className="mb-2 block font-medium text-gray-700">
                Información de Contacto
              </label>
              <input
                type="text"
                id="contacto"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Teléfono o correo electrónico"
                required
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p>
                <strong>Consejo:</strong> Añade fotos claras y una buena descripción para 
                vender más rápido. Sé honesto sobre el estado de tus productos.
              </p>
            </div>

            <Button type="submit" className="w-full bg-blue-600 py-3 hover:bg-blue-700">
              Publicar Producto
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
} 