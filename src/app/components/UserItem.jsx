import Link from "next/link";

export default function UserItem({user}) {
    const id = user["Object Id"];
    const name = user["Display name"];
    const location = `${user.City}, ${user.State}`;
    const image = user.Picture;

    return (
        <li className="user-item">
            <img className="user-photo" src={image} alt={`Avatar de ${name}`}  />
            <div className="user-info">
                <h3 className="user-name">{name}</h3>
                <p className="user-location">{location}</p>
                <Link href={`/usuarios/${id}`} className="user-link">
                    Ver detalles
                </Link>
            </div>
        </li>
    );
}