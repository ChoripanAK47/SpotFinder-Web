import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../assets/cssViejos/RegistroLogin.css';

const CreateAccountPage = () => {
  const { createAccount } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    passwordConfirm: '',
    genero: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validar que el género sea válido
    if (formData.genero === 'Tu Género:') {
      setError('Por favor, selecciona un género válido.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createAccount({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        genero: formData.genero
      });

      if (result.success) {
        alert("¡Registro exitoso! Redirigiendo a iniciar sesión.");
        navigate("/login"); 
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error al intentar registrarse.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fondo-blanco-dinamico">
      <main className="d-flex justify-content-center align-items-start pt-2">
        <section className="container my-2 p-3 carta-dinamicaRegistro">
          <h3 className="text-center mb-4 fw-bold">Crear Cuenta</h3>
          <form className="row g-3" onSubmit={handleSubmit}> 
            {error && <div className="alert alert-danger col-12 text-center">{error}</div>}

            <div className="col-md-12">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
                placeholder="Ej: Juan" 
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="apellido" className="form-label">Apellido:</label>
              <input 
                type="text" 
                className="form-control" 
                id="apellido" 
                value={formData.apellido}
                onChange={handleChange}
                required 
                placeholder="Ej: Pérez" 
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="tu@email.com" 
              />
            </div>

            <div className="col-12">
              <label htmlFor="genero" className="form-label">Género:</label>
              <select
                className="form-select form-select"
                id="genero"
                value={formData.genero}
                onChange={handleChange}
                aria-label="Large select example"
                required
              >
                <option value="" disabled>Selecciona tu género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="Mínimo 6 caracteres" 
              />
            </div>
            
            <div className="col-md-6">
              <label htmlFor="passwordConfirm" className="form-label">Confirma contraseña:</label>
              <input 
                type="password" 
                className="form-control" 
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required 
                placeholder="Repite tu contraseña" 
              />
            </div>


            <div className="col-12">
              <div className="text-center mb-3">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-success fw-bold">Inicia sesión</Link>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success btn-lg" disabled={isLoading}>
                  {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateAccountPage;