export const buildUrlWithParams = (baseUrl: string, params: { [key: string]: any }) => {
  // Construir URL con parámetros
  const url = new URL(baseUrl);
  // Agregar parámetros a la URL
  Object.keys(params).forEach(key => {
    // Si el valor del parámetro no es nulo ni indefinido
    if (params[key] !== undefined && params[key] !== null) {
      // Agregar parámetro a la URL
      url.searchParams.append(key, params[key]);
    }
  });
  // Retornamos la URL construida
  return url.toString();
};