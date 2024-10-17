import React from 'react'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {

  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    return children;
  } else {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.replace("/login");
    return null;
  }

};

export default ProtectedRoute;
