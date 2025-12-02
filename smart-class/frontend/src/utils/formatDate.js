// Converte datas ISO (ex: 2025-11-11T19:49:26.000Z) em formato local legível
export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${min}`;
};

// Retorna apenas a data
export const formatOnlyDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

// Retorna data e hora separados
export const splitDateTime = (isoDate) => {
  if (!isoDate) return { date: "", time: "" };
  const date = new Date(isoDate);
  const localISO = date.toISOString().slice(0, 16);
  const [d, t] = localISO.split("T");
  return { date: d, time: t };
};
