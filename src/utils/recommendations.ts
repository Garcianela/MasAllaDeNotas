export const messageRecommendations = (status: string) => {
  if (status === 'Bajo') {
    return 'Es recomendable implementar estrategias de refuerzo y revisión de conceptos básicos.'
  } else if (status === 'Medio') {
    return 'Es recomendable aprender los conceptos aprendidos y trabajar en areas específicas de mejoras.'
  } else if (status === 'Alto') {
    return 'Es recomendable mantener el ritmo de estudio y buscar desafíos adicionales para potenciar el aprendizaje.'
  }
}