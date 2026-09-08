"use client";
import UserItem from "../components/UserItem";
import {useState, useEffect} from "react";


export default function PageUsuarios() {
    const [users, setUsers] = useState([]);
    const URL = "https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json";

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
    <ul className="user-list">
        {users.map(user => (
            <UserItem user={user} key={user["Object Id"]} />
        ))}
    </ul>
  );
}