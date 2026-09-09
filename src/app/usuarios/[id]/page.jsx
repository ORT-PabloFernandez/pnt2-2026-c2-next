
const USERS_URL = "https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json";

export default async function DetalleUsuario({params}) {
    const {id} = await params; // Obtener el ID del usuario desde los parámetros de la URL
    let user = null;
    try {
        const response = await fetch(USERS_URL);
        const users = await response.json();
        user = users.find(usuario => usuario["Object Id"] === id);
    } catch (error) {
        console.error("Error fetching user details:", error);   
    }


    return (
        <div>
            <img src={user.Picture} alt={`Avatar de ${user["Display name"]}`} />
            <h2>{user["Display name"]}</h2>
            <p>Ubicación: {user.City}, {user.State}</p>
        </div>
    );
}