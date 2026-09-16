"use client";

import estilos from './page.module.css';
import { useState } from 'react';
import {useRouter} from 'next/navigation';

const API_URL = "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    async function handleSubmit(e) {
    e.preventDefault(); // evita que la página se recargue al enviar el formulario
    console.log("Formulario enviado");

    setCargando(true);
    setError('');

    try{
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if(!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // TODO: redireccion al home"
        console.log('Inicio de sesión exitoso', data.token);
        router.push('/'); // redirecciona al home


    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setError('Error al iniciar sesión');
    } finally {
        setCargando(false);
    }
}

    return (
        <section className={estilos.section}>
            <h3>Inicar Sesión</h3>
            <form className={estilos.form} onSubmit={handleSubmit}>
                <label className={estilos.label}>
                    Email
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={estilos.input}
                        required
                    />
                </label>
                <label className={estilos.label}>
                    Contraseña
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={estilos.input}
                        required
                    />
                </label>
                <button type="submit" className={estilos.boton}>
                    {cargando ? 'Cargando...' : 'Iniciar Sesión'}
                </button>

            </form>
            {error && <p className={estilos.error}>{error}</p>}
        </section>
    );
}