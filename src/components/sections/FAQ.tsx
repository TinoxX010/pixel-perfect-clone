export function FAQ() {
  const preguntas = [
    {
      pregunta: "¿Hacen envíos?",
      respuesta: "Sí, realizamos envíos a toda Argentina."
    },
    {
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta: "Aceptamos efectivo, transferencia, tarjetas de débito y crédito."
    },
    {
      pregunta: "¿Los productos tienen garantía?",
      respuesta: "Sí, todos poseen garantía solo por fallas de fabricación o envio."
    },
    {
      pregunta: "¿Cuánto demora el envío?",
      respuesta: "Entre 2 y 5 días hábiles según tu ubicación."
    },
    {
      pregunta: "¿Cómo me contacto?",
      respuesta: "Podés escribirnos por WhatsApp o Instagram."
    }
  ];
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-4">

          {preguntas.map((item, index) => (
            <details
              key={index}
              className="bg-card rounded-xl border border-border p-5"
            >
              <summary className="cursor-pointer text-lg font-semibold">
                {item.pregunta}
              </summary>

              <p className="mt-4 text-muted-foreground">
                {item.respuesta}
              </p>

            </details>
          ))}

        </div>

      </div>
    </section>
  );
}
