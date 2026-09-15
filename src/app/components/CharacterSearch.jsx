"use client";

import { useState } from "react";
import Link from "next/link";

export default function CharacterSearch({ characters }) {
  const [query, setQuery] = useState("");

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar personaje por nombre..."
        style={{
          width: "100%",
          padding: "10px 14px",
          marginBottom: 16,
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          fontSize: 14,
        }}
      />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((c) => (
          <li
            key={c.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Link href={`/character/${c.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={c.image}
                alt={c.name}
                style={{ width: "100%", display: "block" }}
              />
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: "0 0 4px" }}>{c.name}</h3>
                <small style={{ color: "#64748b" }}>
                  {c.species} · {c.status}
                </small>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p style={{ color: "#64748b", marginTop: 16 }}>
          No se encontraron personajes con ese nombre.
        </p>
      )}
    </>
  );
}
