export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">Sobre Nosotros</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Entendemos lo que significa comenzar una nueva etapa en la vida.
        </p>
      </section>

      <section className="mx-auto mb-12 max-w-3xl">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Nuestra Misión</h2>
          <p className="mb-6 text-gray-700">
            En Venta de Garage, nuestra misión es proporcionar una plataforma simple y efectiva para 
            que las personas que están a punto de emigrar puedan vender sus pertenencias de forma rápida 
            y sencilla. Entendemos que este proceso puede ser emocionalmente desafiante, pero también 
            representa el comienzo de nuevas aventuras y oportunidades.
          </p>
          
          <h2 className="mb-4 text-2xl font-bold text-blue-600">¿Por qué existimos?</h2>
          <p className="mb-6 text-gray-700">
            Cada año, miles de personas toman la difícil decisión de emigrar en busca de nuevas 
            oportunidades. Este viaje viene con desafíos prácticos, como decidir qué hacer con las 
            pertenencias que no pueden llevar consigo. Nuestra plataforma nació para facilitar este 
            proceso, ofreciendo un espacio donde los objetos encuentran nuevos dueños y las historias 
            continúan.
          </p>

          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <blockquote className="italic text-gray-700">
              "Transforma el adiós en nuevas oportunidades. Cada objeto cuenta una historia; 
              vende y comparte la tuya."
            </blockquote>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-blue-600">Nuestros Valores</h2>
          <ul className="mb-6 space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span><strong>Simplicidad:</strong> Creemos en mantener las cosas simples y accesibles para todos.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span><strong>Comunidad:</strong> Fomentamos conexiones entre quienes se van y quienes se quedan.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span><strong>Sostenibilidad:</strong> Promovemos la reutilización de objetos, reduciendo el desperdicio.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span><strong>Empatía:</strong> Entendemos el proceso emocional de desprenderse de objetos personales.</span>
            </li>
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-blue-600">Cómo Funciona</h2>
          <p className="text-gray-700">
            Nuestra plataforma es simple: publica tus productos, conéctate con compradores 
            interesados y transforma tus pertenencias en recursos para tu nuevo comienzo. No cobramos 
            comisiones y facilitamos que mantengas el control de tus ventas y negociaciones.
          </p>
        </div>
      </section>

      <section className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-6 text-2xl font-bold">Historias que Inspiran</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="mb-4 italic text-gray-700">
              "Gracias a Venta de Garage pude vender casi todos mis muebles en solo una semana antes 
              de mudarme a Canadá. El proceso fue simple y me ayudó no solo económicamente, sino también 
              emocionalmente a cerrar un capítulo."
            </p>
            <p className="font-medium text-gray-900">— María G.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="mb-4 italic text-gray-700">
              "Compré varios artículos de alguien que se mudaba al extranjero. Me encantó saber que 
              estaba ayudando a alguien en su transición mientras conseguía cosas que necesitaba para 
              mi hogar a buen precio."
            </p>
            <p className="font-medium text-gray-900">— Carlos L.</p>
          </div>
        </div>
      </section>
    </main>
  );
} 