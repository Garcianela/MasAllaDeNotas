import type { SendData } from "../components/Dashboard";

const URI = 'https://masalladenotas.onrender.com'

export const postPrediction = async (form: SendData) => {
  try {
    const response = await fetch(`${URI}/predecir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch(error) {
    console.error("Error posting prediction:", error);
    throw error;
  }
}