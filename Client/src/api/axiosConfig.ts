import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";


// 1. Definimos la URL base (usando variables de entorno por seguridad)
const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos antes de cancelar por falta de respuesta
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor de Peticiones: Útil para adjuntar el JWT de CosmicEvents
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('cosmic_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Interceptor de Respuestas: Para manejar errores globales (ej: 401, 500)
axiosInstance.interceptors.response.use(
    (response) => response, // Si todo sale bien, solo pasamos la respuesta
    (error) => {
        if (error.response?.status === 401) {
            // Ejemplo: Redirigir al login si el token expiró
            console.error("Sesión expirada, redirigiendo...");
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;