import Link from "next/link";
import CharacterSearch from "../components/CharacterSearch";

async function getCharacters(page) {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("No se pudieron obtener los personajes");
  }

  return res.json();
}

export default async function CharacterListPage({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getCharacters(currentPage);
  const characters = data.results;
  const { next, prev } = data.info;

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Personajes</h1>
      <CharacterSearch characters={characters} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 24,
        }}
      >
        <Link
          href={`/character?page=${currentPage - 1}`}
          aria-disabled={!prev}
          style={{
            pointerEvents: prev ? "auto" : "none",
            opacity: prev ? 1 : 0.4,
            padding: "8px 16px",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          ← Anterior
        </Link>

        <span style={{ color: "#64748b" }}>Página {currentPage}</span>

        <Link
          href={`/character?page=${currentPage + 1}`}
          aria-disabled={!next}
          style={{
            pointerEvents: next ? "auto" : "none",
            opacity: next ? 1 : 0.4,
            padding: "8px 16px",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Siguiente →
        </Link>
      </div>
    </section>
  );
}
