const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowAtencionCliente = addKeyword(['1']).addAnswer(['¡Entendido! En unos minutos atención al cliente se comunicará contigo.👩🏻‍💻📚 \n\nEnvía # si deseas volver al menú de opciones. 📝']);
const flowMetodosEntrega = addKeyword(['2']).addAnswer([
    '🛵 Delivery a toda Caracas, costo según la zona.',
    '',
    '🏠 Pick-up en Prados del Este (lunes a viernes) y Santa Mónica (fines de semana)',
    '',
    '📦 Envíos a todo el país a través de MRW (aprox. 125 bs). El pago se realiza directamente a la agencia al recibir el libro.',
    '',
    '📬 Podemos enviarte por Zoom o Tealca. ¡También tenemos un instructivo si es tu primera vez recibiendo un envío nacional! 💗 \n\nEnvía # si deseas volver al menú de opciones. 📝'
]);
const flowPagoCuotas = addKeyword(['3']).addAnswer([
    '¡Hola de nuevo! Antes de comenzar, quiero comentarte que el siguiente mensaje puede ser un poco extenso, pero vale la pena leerlo para tener toda la información clara y asegurar que aproveches al máximo nuestros servicios. ¡Gracias por tu comprensión!',
    '',
    '¡Descubre cómo comprar tus libros en cuotas!📚',
    '',
    'Te ofrecemos la flexibilidad de abonar desde 1$ hasta el monto que desees, adaptándonos a tus posibilidades.',
    '',
    '¡Sin fechas límite ni plazos fijos! Tú decides cuándo realizar los abonos y avanzar en la adquisición de tus libros favoritos con nosotros. 📚',
    '',
    'Cada abono se suma a tu “saldo disponible en la librería”, acercándote cada vez más a obtener el libro que tanto deseas cuando alcances su valor y esté disponible.',
    '',
    'Además, aceptamos múltiples métodos de pago como pago móvil, efectivo, Binance Pay, Paypal, Zelle, Reserve, MoneyWays y Zinli, brindándote comodidad y facilidad en tu experiencia de compra. 💰',
    '',
    'Queremos asegurarte que estamos comprometidos contigo y tu satisfacción. Sin embargo, es importante destacar que el dinero abonado no es retornable. Por eso, te invitamos a realizar tus abonos con plena seguridad y confianza, considerando tus prioridades financieras.',
    '',
    '🙋🏻‍♀️ Preguntas frecuentes',
    '',
    '📍 ¿Cómo se maneja la tasa de cambio si abono en bolívares?',
    '',
    'No te preocupes por ajustar la diferencia de tasa. Los bolívares que nos envíes serán convertidos a dólares según la tasa vigente en el momento del abono. Así, mantendrás el valor de tus abonos, sin sorpresas.',
    '',
    '🔖 ¿Puedo apartar un libro mediante abonos?',
    '',
    'En lugar de apartar un libro, te brindamos la opción de acumular un saldo disponible en tu cuenta. Cuando alcances el valor del libro que deseas y esté disponible, podrás canjearlo y obtenerlo rápidamente. ¡Sin complicaciones ni demoras! 📝',
    '',
    'Recuerda que cada abono que realices te acerca a tu próxima lectura. Si tienes más consultas, no dudes en comunicarte conmigo.',
    '',
    'Envía # si deseas volver al menú de opciones. 📝'
]);
const flowCombosPreventas = addKeyword(['4']).addAnswer([
    '📦 ¡Combos disponibles!',
    '',
    '– Damián $25 🐇',
    '(libro original, marcapáginas ¡y una postal firmada por la autora!) 📚',
    '',
    '– Damián $30 🔪',
    '(libro original, marcapáginas, totebag exclusivo de la librería, un póster a color del libro (64 x 39 cm), ¡y una postal firmada por la autora!) 📚',
    '',
    '-',
    '',
    'Combos $30 c/u',
    '(sigue mi voz, irresistible error, a través de la lluvia, boulevard: después de él)',
    '',
    'Combos $35 c/u',
    '(lascivia I, lascivia II, lujuria I, el perfume del rey, las cadenas del rey, antes de diciembre, después de diciembre, tres meses, contradicciones y la revelación)',
    '',
    '*(dichos combos incluyen cada uno: libro original, un marcapáginas y un totebag referente al libro, ambos exclusivos de la librería)*📚',
    '',
    '-',
    '',
    '– Chrischel $65 🪖',
    '(Ambos libros originales de Lascivia, un marcapáginas exclusivo de la librería por cada libro y un totebag de “final chrischel” de regalo)',
    '',
    '– Chrischel $100 ❤️‍🔥',
    '(Los primeros tres libros, originales, un marcapáginas exclusivo de la librería por cada libro, un totebag de “final chrischel” y uno de “primero yo y luego el mundo” de regalo)',
    '',
    '– Tres meses 🎬 $100',
    '(Los primeros tres libros de la saga, originales, un marcapáginas por cada libro, exclusivos de la librería, y una totebag referente a los libros)',
    '',
    '– Meses a tu lado 💟  $130',
    '(Los cuatro libros de la saga, originales, un marcapáginas por cada libro, exclusivos de la librería, y una totebag referente a los libros)',
    '',
    'Precios por separado:',
    'Marcapáginas $2 c/u',
    'Totebag $5 c/u',
    '',
    '📚 ¡Preventas!',
    '',
    '¡En este momento no tenemos ninguna preventa en proceso! 💗 (por favor avísanos si deseas alguna en específico)',
    '',
    'Envía # si deseas volver al menú de opciones. 📝'
]);
const flowNoEncuentroLibro = addKeyword(['5']).addAnswer('¡Hola! Cuéntame, ¿qué libro es? Puedo conseguirlo para ti 📚').addAnswer('Envía # si deseas volver al menú de opciones. 📝', { capture: true }).addAnswer('¡Recibido! Atención al cliente se comunicará contigo en unos minutos para ayudarte a encontrarlo. 📚✨\n\nEnvía # si deseas volver al menú de opciones. 📝');
const flowGracias = addKeyword(['gracias']).addAnswer(['¡Excelente! Atención al cliente se comunicará contigo para ayudarte a encontrarlo. ✨\n\nEnvía # si deseas volver al menú de opciones. 📝']);
const flowMenu = addKeyword(['#']).addAnswer([
    '📝 Opciones:',
    '',
    '1 – Hablar con atención al cliente.',
    '2 – Métodos de entrega.',
    '3 – Pago en cuotas.',
    '4 – Combos y preventas disponibles.',
    '5 – No veo un libro en el catálogo.',
    '',
    'Escribe el número de la opción a elegir.'
], null, null, [flowAtencionCliente, flowMetodosEntrega, flowPagoCuotas, flowCombosPreventas, flowNoEncuentroLibro, flowGracias]);

const flowPrincipal = addKeyword(['hola', 'Hola', '¡Hola! Me interesa ver el catálogo 💓'])
    .addAnswer('¡Hola! Soy una asistente virtual, estoy aquí para ayudarte a hacer el proceso más rápido y cómodo para ti 💗')
    .addAnswer([
        '📝 Opciones:',
        '',
        '1 – Hablar con atención al cliente.',
        '2 – Métodos de entrega.',
        '3 – Pago en cuotas.',
        '4 – Combos y preventas disponibles.',
        '5 – No veo un libro en el catálogo.',
        '',
        'Escribe el número de la opción a elegir.'
    ], null, null, [flowAtencionCliente, flowMetodosEntrega, flowPagoCuotas, flowCombosPreventas, flowNoEncuentroLibro, flowGracias, flowMenu]);

const PORT = process.env.PORT || 3000;

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowMenu, flowGracias]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
};

main();