"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import estilos from "./page.module.css";

const API_URL = "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net";

export default function RegisterPage() {
	const router = useRouter();
	const [formulario, setFormulario] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [exito, setExito] = useState("");
	const [cargando, setCargando] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormulario((actual) => ({ ...actual, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setExito("");

		if (formulario.password !== formulario.confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}

		setCargando(true);

		try {
			const response = await fetch(`${API_URL}/api/users/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formulario.name,
					email: formulario.email,
					password: formulario.password,
				}),
			});

			if (!response.ok) {
				let message = "No se pudo crear la cuenta.";

				try {
					const data = await response.json();
					message = data.message || data.error || message;
				} catch {
					// La respuesta puede no tener un cuerpo JSON.
				}

				throw new Error(message);
			}

			setExito("Cuenta creada correctamente. Redirigiendo al inicio de sesión...");
			setTimeout(() => router.push("/login"), 700);
		} catch (submitError) {
			setError(submitError.message || "No se pudo crear la cuenta.");
		} finally {
			setCargando(false);
		}
	}

	return (
		<section className={estilos.section}>
			<h1>Crear cuenta</h1>
			<p className={estilos.intro}>Registrate para conectarte con tu equipo.</p>

			<form className={estilos.form} onSubmit={handleSubmit}>
				<label className={estilos.label}>
					Nombre
					<input
						className={estilos.input}
						type="text"
						name="name"
						value={formulario.name}
						onChange={handleChange}
						autoComplete="name"
						required
					/>
				</label>

				<label className={estilos.label}>
					Email
					<input
						className={estilos.input}
						type="email"
						name="email"
						value={formulario.email}
						onChange={handleChange}
						autoComplete="email"
						required
					/>
				</label>

				<label className={estilos.label}>
					Contraseña
					<input
						className={estilos.input}
						type="password"
						name="password"
						value={formulario.password}
						onChange={handleChange}
						autoComplete="new-password"
						minLength={6}
						required
					/>
				</label>

				<label className={estilos.label}>
					Repetir contraseña
					<input
						className={estilos.input}
						type="password"
						name="confirmPassword"
						value={formulario.confirmPassword}
						onChange={handleChange}
						autoComplete="new-password"
						minLength={6}
						required
					/>
				</label>

				<button className={estilos.boton} type="submit" disabled={cargando}>
					{cargando ? "Creando cuenta..." : "Registrarme"}
				</button>
			</form>

			{error && <p className={estilos.error} role="alert">{error}</p>}
			{exito && <p className={estilos.success} role="status">{exito}</p>}
			<p className={estilos.footer}>
				¿Ya tenés una cuenta? <Link href="/login">Iniciá sesión</Link>
			</p>
		</section>
	);
}