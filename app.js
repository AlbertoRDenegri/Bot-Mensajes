const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])


const flowGracias = addKeyword([' muchas gracias', 'grac']).addAnswer(
    [
        'Que tenga un excelente día ✨',
        
    ],
    null,
    null,
    [flowSecundario]
)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola buen día')
    .addAnswer(
        [
            'Estimado cliente, por el momento me encuentro fuera de la oficina. ',
            '                                                                   ',
            'En cuanto me sea posible, me pongo en contacto con usted. ',
            
        ],
        null,
        null,
        [ flowGracias]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
