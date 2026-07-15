export function FAQ() {
  const faqs = [
    {
      pregunta: "¿Hacen envíos a todo el país?",
      respuesta: "Sí, realizamos envíos a toda Argentina mediante Correo Argentino y otras empresas de logística."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos efectivo, transferencia, tarjetas de crédito y débito."
    },
    {
      pregunta: "¿Los productos tienen garantía?",
      respuesta: "Sí, todos nuestros productos cuentan con garantía por fallas de fabricación."
    },
    {
      pregunta: "¿Cuánto demora el envío?",
      respuesta: "Generalmente entre 2 y 5 días hábiles dependiendo de tu ubicación."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border rounded-xl p-5 bg-card"
            >
              <summary className="cursor-pointer font-semibold text-lg">
                {faq.pregunta}
              </summary>

              <p className="mt-3 text-muted-foreground">
                {faq.respuesta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
