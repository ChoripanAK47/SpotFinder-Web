import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Administracion = () => {
  const { user, fetchAllUsers, deleteUserById, updateUserById, loading: authLoading } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [editing, setEditing] = useState({}); // Estado local para cambios no guardados
  const navigate = useNavigate();

  // 1. Cargar usuarios al iniciar
  useEffect(() => {
    if (!authLoading) {
      if (user?.rol !== 'ADMIN') {
        navigate('/home'); // Redirigir si no es admin
      } else {
        cargarUsuarios();
      }
    }
  }, [user, authLoading, navigate]);

  const cargarUsuarios = async () => {
    setLoadingData(true);
    const result = await fetchAllUsers();
    if (result.success) {
      setUsuarios(result.data);
    } else {
      alert("Error cargando usuarios: " + result.message);
    }
    setLoadingData(false);
  };

  // 2. Manejar borrado
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
      const result = await deleteUserById(id);
      if (result.success) {
        // Actualizar UI filtrando el eliminado
        setUsuarios(prev => prev.filter(u => u.id !== id));
        alert('Usuario eliminado correctamente');
      } else {
        alert('Error al eliminar: ' + result.message);
      }
    }
  };

  // 3. Manejar cambio en el select (estado local)
  const handleRolChange = (id, nuevoRol) => {
    setEditing(prev => ({
      ...prev,
      [id]: { ...prev[id], rol: nuevoRol }
    }));
  };

  // 4. Guardar cambios (Actualizar Rol)
  const handleSave = async (id) => {
    const cambios = editing[id];
    if (!cambios) return;

    // Buscamos el usuario original para no perder datos (nombre, email, etc)
    const usuarioActual = usuarios.find(u => u.id === id);
    if (!usuarioActual) return alert('Usuario no encontrado en lista local');

    const { contrasena, ...usuarioSinPass } = usuarioActual; 
    
    const body = { ...usuarioSinPass, ...cambios }; 
    
    const result = await updateUserById(id, body);
    
    if (result.success) {
      // Actualizamos la lista principal con la respuesta del servidor
      setUsuarios(prev => prev.map(u => (u.id === id ? result.data : u)));
      
      // Limpiamos el estado de edición para este ID
      const newEditing = { ...editing };
      delete newEditing[id];
      setEditing(newEditing);
      
      alert('Rol actualizado correctamente');
    } else {
      alert('Error al actualizar: ' + result.message);
    }
  };

  if (authLoading) return <div className="p-5 text-center">Verificando permisos...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header card-header-administracion">
          <h2 className="h3 mb-0">Panel de Administración</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="mb-1">Bienvenido, {user?.nombre} {user?.apellido}</h5>
              <p className="mb-0 text-muted">Gestión de usuarios registrados en la plataforma.</p>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={cargarUsuarios}>
              Refrescar Lista
            </button>
          </div>

          {loadingData ? (
            <div className="text-center p-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-admin table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Género</th>
                    <th>Rol Actual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>
                          <div className="fw-bold">{usuario.nombre} {usuario.apellido}</div>
                        </td>
                        <td>{usuario.email}</td>
                        <td>{usuario.genero}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: '120px', borderColor: editing[usuario.id] ? '#198754' : '' }}
                            value={editing[usuario.id]?.rol || usuario.rol || 'USER'}
                            onChange={(e) => handleRolChange(usuario.id, e.target.value)}
                          >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                        <td>
                          <div className="btn-group">
                            {editing[usuario.id] && (
                              <button 
                                className="btn btn-guardar btn-sm"
                                onClick={() => handleSave(usuario.id)}
                                title="Guardar cambios"
                              >
                                💾 Guardar
                              </button>
                            )}
                            <button 
                              className="btn btn-eliminar btn-sm"
                              onClick={() => handleDelete(usuario.id)}
                              title="Eliminar usuario"
                              disabled={usuario.id === user.id} // Evitar auto-eliminación
                            >
                              🗑 Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">No se encontraron usuarios.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administracion;