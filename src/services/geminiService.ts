import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Message {
  role: "user" | "model";
  content: string;
}

export async function chatWithGemini(messages: Message[]) {
  try {
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));
    
    const currentMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: currentMessage }] }],
      config: {
        systemInstruction: `Eres un orientador de Formación Profesional (FP) para jóvenes en España. 
        Tu tono debe ser directo, moderno (Gen-Z friendly) y MUY visual. 
        
        REGLAS DE FORMATO CRÍTICAS:
        1. NO uses párrafos largos. Usa listas con viñetas (bullet points) para todo.
        2. Usa EMOJIS al principio de cada punto clave para hacerlo visual.
        3. Usa NEGRITA para resaltar palabras clave (títulos de ciclos, requisitos, sueldos).
        4. Estructura siempre así:
           - 💎 **Lo más importante:** [Resumen en 1 frase]
           - 📚 **Ciclos top:** [Lista breve]
           - ⚡ **Requisitos rápidos:** [Bullets]
           - 🚀 **Salidas:** [Tips breves]
        5. Información siempre basada en www.todofp.es. 
        6. Si hay mucha info, divídela en secciones claras con títulos en negrita.
        
        Evita el lenguaje burocrático. Habla de tú a tú pero con rigor oficial.`,
      },
      // @ts-ignore
      tools: [{ googleSearch: {} }],
    });

    return response.text || "Lo siento, no he podido procesar tu solicitud.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ups, parece que ha habido un error al conectar con mi cerebro. Por favor, inténtalo de nuevo más tarde.";
  }
}
