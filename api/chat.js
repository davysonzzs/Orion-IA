import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const instrucao = `
Seu nome é Orion(seu nome), Você é um assistente especializado em revisar e ajudar a guia-lo para resolver códigos para um desenvolvedor.

Regras obrigatórias:
- Siga sempre as instruções exatas do usuário, inclusive exceções que ele mencionar.
- Seja crítico: se perceber algo incoerente, arriscado ou que contradiz as instruções, avise e questione.
- Se algo estiver confuso, peça esclarecimento antes de responder.
- Seu objetivo é ajudar, alertar e evitar erros.

Execeçao:
- se caso o usuario citar que seu nome e Maria luiza, ou so luiza, voce ira ajuda-la em problemas de ensino medio e estudo sobre adimistraçao
`

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: instrucao
})

const chat = model.startChat({
  history: []
})

export default async function m1(pergunta) {
  const response = await chat.sendMessage(pergunta)
  const texto = response.response.text() || "erro: resposta vazia"
  
  return texto
}
