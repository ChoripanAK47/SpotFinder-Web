import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // --- NUEVO: claves y helper para token con expiración ---
  const TOKEN_KEY = 'token';
  const TOKEN_EXP_KEY = 'token_expiry';
  const DEFAULT_TTL = 1000 * 60 * 60 * 24 * 7; // 7 días

  const setTokenWithExpiry = (tokenValue, ttl = DEFAULT_TTL) => {
    const now = Date.now();
    localStorage.setItem(TOKEN_KEY, tokenValue);
    localStorage.setItem(TOKEN_EXP_KEY, String(now + ttl));
  };

  const getTokenFromStorage = () => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      const exp = localStorage.getItem(TOKEN_EXP_KEY);
      if (!t) return null;
      if (exp && Number(exp) < Date.now()) {
        // expirado -> limpiar
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXP_KEY);
        return null;
      }
      return t;
    } catch (e) {
      return null;
    }
  };
  // --- FIN helpers ---

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getTokenFromStorage() || null);
  const [loading, setLoading] = useState(true); // Para saber si estamos verificando sesión

  // URL base del backend (Asegúrate de que tu backend esté corriendo en este puerto)
  // const API_URL = "http://localhost:8080/api/v1/usuarios";
  // const API_URL = "http://3.220.100.170:8080/api/v1/usuarios";
  const API_URL = "/api/v1/usuarios";

  const fetchUserProfile = async (tokenToUse) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({ ...userData, rol: userData.rol });
        return { success: true, data: userData };
      } else {
        console.warn("fetchUserProfile response:", response.status);
        logout();
        return { success: false, status: response.status };
      }
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      logout();
      return { success: false, message: 'error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  // --- EFECTO: Cargar usuario al iniciar la app si hay token ---
  useEffect(() => {
    const storedToken = getTokenFromStorage();
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // 1. FUNCIÓN DE REGISTRO
  const createAccount = async (userData) => {
    try {
      const payload = {
        nombre: userData.nombre.trim(),
        apellido: userData.apellido.trim(),
        email: userData.email,
        contrasena: userData.password,
        genero: userData.genero
      };

      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        return { success: false, message: errorText || "Error al crear la cuenta." };
      }

      return { success: true, message: "Cuenta creada con éxito." };
    } catch (error) {
      console.error("Error en createAccount:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  // 2. FUNCIÓN DE LOGIN (Actualizada)
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Esperamos { "token": "..." }
        
        if (data.token) {
          // Guardar token con expiración
          setTokenWithExpiry(data.token);
          setToken(data.token);

          // Obtener datos reales del usuario inmediatamente
          await fetchUserProfile(data.token);

          return { success: true, message: "Inicio de sesión exitoso." };
        }
      }
      
      return { success: false, message: "Credenciales inválidas." };
      
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error de conexión con el servidor." };
    }
  };

  // 3. FUNCIÓN DE LOGOUT
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
    setToken(null);
    setUser(null);
  };

  // --- FUNCIONES ADMIN (sin cambios de lógica) ---
  const fetchAllUsers = async () => {
    const tokenToUse = token || getTokenFromStorage();
    if (!tokenToUse) return { success: false, message: 'No autorizado' };

    try {
      const res = await fetch(`${API_URL}`, { // GET a /api/v1/usuarios
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        return { success: true, data };
      } else {
        return { success: false, message: 'Error al obtener usuarios' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  };

  const deleteUserById = async (id) => {
    const tokenToUse = token || getTokenFromStorage();
    try {
      const res = await fetch(`${API_URL}/delete?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok || res.status === 204) return { success: true };
      return { success: false, message: 'No se pudo eliminar' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserById = async (id, payload) => {
    const tokenToUse = token || getTokenFromStorage();
    try {
      const bodyObj = { ...payload, id }; 

      const res = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      if (res.ok) {
        const updated = await res.json();
        return { success: true, data: updated };
      }
      return { success: false, message: 'Error al actualizar' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    createAccount,
    login,
    logout,
    fetchAllUsers,
    deleteUserById,
    updateUserById
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};