// Para darle formato a la fecha en el formato dd-mm-yyyy
export const formatoFecha = (fecha: string) => {
  const date = new Date(fecha);
  const mes = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dia = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${dia}-${mes}-${date.getFullYear()}`;
};

// Para darle formato a la fecha en el formato yyyy-mm-dd
export const reFormatoFecha = (fecha: string) => {
  const [dia, mes, anio] = fecha.split("-");
  return `${anio}-${mes}-${dia}`;
};