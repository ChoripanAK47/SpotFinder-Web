import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 
import '../assets/cssViejos/RegistroLogin.css';

const LoginPage = () => {
    const { login, user, loading } = useAuth(); 
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    // Redirigir si el usuario ya está autenticado (esperar a que loading termine)
    useEffect(() => {
        if (!loading && user) {
            navigate('/home');
        }
    }, [user, loading, navigate]);

    // Redirigir si es admin (esperar loading)
    useEffect(() => {
        if (!loading && user?.rol === 'ADMIN') {
            navigate('/administracion');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(email, password);

            if (!result.success) {
                setError(result.message);
            }
            // Si es exitoso, el useEffect se encargará de redirigir cuando loading=false
        } catch (err) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="fondo-ritual">
            <div className="envoltorio-login">
                <section className="carta-dinamica text-center">
                    <h2 className="fw-bold mb-3">Iniciar sesión</h2>
                    <hr style={{ borderTop: '2px solid black', width: '90%', margin: '0 auto 20px' }} />
                    <p className="text-muted mb-4">Accede con tu cuenta de SpotFinder.</p>
                    <hr style={{ borderTop: '2px solid black', width: '90%', margin: '0 auto 20px' }} />

                    {/* Mostrar mensaje de error */}
                    {error && <div className="alert alert-danger small">{error}</div>} 

                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3 text-start">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Correo electrónico</label>
                        </div>
                        <div className="form-floating mb-3 text-start">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>
                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-success btn-lg fw-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Conectando...' : 'Iniciar sesión'}
                            </button>
                        </div>
                    </form>

                    <hr className="my-4" />

                    <p className="small text-muted">
                        ¿No tienes una cuenta? <Link to="/CreateAccount" className="text-success fw-semibold">Regístrate ahora</Link>.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;