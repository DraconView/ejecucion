const LimpiarLocalStorage = () => {
  const handleCleanLocalStorage = () => {
    localStorage.clear();
    // Puedes agregar cualquier otra lógica o notificaciones aquí después de limpiar el localStorage
  };

  return (
    <button onClick={handleCleanLocalStorage}>
      Limpiar LocalStorage
    </button>
  );
};

export default LimpiarLocalStorage;
