// Gera uma cor aleatória pastel (mais suave)
export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 70%, 75%)`;
  return pastel;
};

// Versão vibrante (para destaque)
export const getVibrantColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const vibrant = `hsl(${hue}, 80%, 55%)`;
  return vibrant;
};
