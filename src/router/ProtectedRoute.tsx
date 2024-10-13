import React from 'react'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {

  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    return children;
  } else {
    window.location.replace("/");
    return null;
  }

};

export default ProtectedRoute;
