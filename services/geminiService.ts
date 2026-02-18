import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from "../constants";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
Tu es "Éclat", un conseiller styliste personnel virtuel pour la marque de luxe "Lumière & Éclat".
Ton rôle est d'aider les clients à choisir des bijoux, des montres et des extensions capillaires.
Tu es poli, élégant, et tu as un goût exquis.

Voici les produits disponibles dans le catalogue (utilise ces informations pour recommander des produits précis) :
${JSON.stringify(PRODUCTS.map(p => ({id: p.id, name: p.name, price: p.price, category: p.category, desc: p.description})))}

Règles :
1. Sois bref et concis.
2. Si un client cherche quelque chose de spécifique, recommande un produit de la liste ci-dessus en mentionnant son nom et son prix.
3. Adopte un ton chaleureux et professionnel.
4. Parle toujours en Français.
`;

export const initChat = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to init chat", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initChat();
  }
  
  if (!chatSession) {
    return "Désolé, je ne suis pas disponible pour le moment. Veuillez vérifier votre clé API.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Error sending message to Gemini", error);
    return "Une erreur est survenue lors de la communication avec le service styliste.";
  }
};
