import { useState } from "react";
import { GLOSSARY } from "../data/glossary.js";

export default function Glossary() {
  const [q, setQ] = useState("");
  const items = [...GLOSSARY]
    .sort((a, b) => a.term.localeCompare(b.term, "de"))
    .filter((g) => (g.term + " " + g.def).toLowerCase().includes(q.toLowerCase()));

  const groups = {};
  items.forEach((g) => {
    const letter = g.term[0].toUpperCase();
    (groups[letter] ||= []).push(g);
  });

  return (
    <>
      <h1>Glossar</h1>
      <p className="lead">{GLOSSARY.length} wichtige SAP-Begriffe kurz erklärt.</p>
      <input className="search" placeholder="Begriff suchen…" value={q} onChange={(e) => setQ(e.target.value)} />
      {Object.entries(groups).map(([letter, list]) => (
        <section key={letter} className="gloss-group">
          <h2>{letter}</h2>
          <dl>
            {list.map((g) => (
              <div key={g.term} className="gloss-item">
                <dt>{g.term}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {items.length === 0 && <p className="muted">Keine Treffer für „{q}“.</p>}
    </>
  );
}
