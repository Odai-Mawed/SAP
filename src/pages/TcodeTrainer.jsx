import { useMemo, useRef, useState } from "react";
import { AREAS, TCODES } from "../data/tcodes.js";
import { useProgress } from "../progress.jsx";
import { shuffle } from "../utils.js";

const MODES = [
  { id: "befehl", label: "⌨️ Befehlsfeld" },
  { id: "karten", label: "🃏 Karteikarten" },
  { id: "liste", label: "🔍 Nachschlagen" }
];

export default function TcodeTrainer() {
  const [mode, setMode] = useState("befehl");
  const [area, setArea] = useState("Alle");
  const pool = useMemo(() => (area === "Alle" ? TCODES : TCODES.filter((t) => t.area === area)), [area]);

  return (
    <>
      <h1>Transaktions-Trainer</h1>
      <p className="lead">
        Profis navigieren in SAP über Transaktionscodes. Trainiere die wichtigsten {TCODES.length} T-Codes – wie im echten
        SAP GUI kannst du <code>/n</code> oder <code>/o</code> voranstellen.
      </p>
      <div className="toolbar">
        <div className="segmented">
          {MODES.map((m) => (
            <button key={m.id} className={mode === m.id ? "active" : ""} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <label className="select">
          Bereich:
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>
      {mode === "befehl" && <CommandField key={area} pool={pool} />}
      {mode === "karten" && <Flashcards key={area} pool={pool} />}
      {mode === "liste" && <Lookup pool={pool} />}
    </>
  );
}

/* ---------------- Befehlsfeld-Simulation ---------------- */

function normalize(input) {
  return input.trim().toUpperCase().replace(/^\/[NO*]/, "").trim();
}

function CommandField({ pool }) {
  const { state, recordTcode } = useProgress();
  const [deck, setDeck] = useState(() => shuffle(pool));
  const [i, setI] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState({ type: "info", text: "Bereit. Gib den passenden Transaktionscode ein und drücke Enter." });
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState(0);
  const [screen, setScreen] = useState(null); // nach Erfolg: "geöffnete" Transaktion
  const inputRef = useRef(null);

  const task = deck[i % deck.length];

  function advance() {
    setValue("");
    setHint(0);
    setScreen(null);
    if (i + 1 >= deck.length) {
      setDeck(shuffle(pool));
      setI(0);
    } else setI(i + 1);
    inputRef.current?.focus();
  }

  function submit(e) {
    e.preventDefault();
    if (screen) return advance();
    const raw = value.trim();
    if (!raw) return;
    const lower = raw.toLowerCase();
    if (lower === "/nex" || lower === "/nend") {
      setStatus({ type: "warn", text: "Netter Versuch – hier wird nicht abgemeldet. 😉 Gib die gesuchte Transaktion ein." });
      setValue("");
      return;
    }
    const code = normalize(raw);
    if (code === task.code) {
      const s = streak + 1;
      setStreak(s);
      recordTcode(true, s);
      setScreen(task);
      setStatus({ type: "ok", text: `Transaktion ${task.code} gestartet. ${s > 1 ? `🔥 ${s} in Folge!` : ""} (Enter = nächste Aufgabe)` });
    } else {
      const known = TCODES.find((t) => t.code === code);
      recordTcode(false, 0);
      setStreak(0);
      setStatus({
        type: "err",
        text: known
          ? `${code} ist „${known.desc}“. Gesucht war: ${task.code}`
          : `Transaktion ${code} existiert nicht (in dieser Übung). Richtig wäre: ${task.code}`
      });
      // Falsch beantwortete Aufgabe kommt später im Stapel erneut
      setDeck((d) => [...d, task]);
      advance();
    }
  }

  const hintText = hint > 0 ? task.code.slice(0, hint) + "•".repeat(Math.max(0, task.code.length - hint)) : null;

  return (
    <div className="gui">
      <div className="gui-titlebar">
        <span>SAP Easy Access</span>
        <span className="gui-win">— ▢ ✕</span>
      </div>
      <div className="gui-menubar">Menü&nbsp;&nbsp; Bearbeiten&nbsp;&nbsp; Favoriten&nbsp;&nbsp; Zusätze&nbsp;&nbsp; System&nbsp;&nbsp; Hilfe</div>
      <form className="gui-toolbar" onSubmit={submit}>
        <span className="gui-check">✔</span>
        <input
          ref={inputRef}
          className="gui-cmd"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/n…"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="characters"
          aria-label="Befehlsfeld"
        />
        <button type="submit" className="gui-tbtn" title="Enter">⏎</button>
        <span className="gui-icons">💾 ⬅ ⤴ ✖ | 🖨 🔍</span>
      </form>
      <div className="gui-screen">
        {screen ? (
          <div className="gui-opened">
            <div className="gui-opened-title">{screen.desc}</div>
            <div className="gui-fields">
              <label>Feld 1 <span /></label>
              <label>Feld 2 <span /></label>
              <label>Feld 3 <span /></label>
            </div>
            <button className="btn" onClick={advance}>Nächste Aufgabe →</button>
          </div>
        ) : (
          <div className="gui-task">
            <span className="gui-area">{task.area}</span>
            <p>Welche Transaktion brauchst du?</p>
            <h2>{task.desc}</h2>
            {hintText && <div className="gui-hint">Tipp: <code>{hintText}</code></div>}
            <div className="gui-task-actions">
              <button
                className="btn ghost"
                type="button"
                onClick={() => {
                  setHint((h) => Math.min(h + 1, task.code.length));
                  inputRef.current?.focus();
                }}
              >
                💡 Tipp
              </button>
              <button
                className="btn ghost"
                type="button"
                onClick={() => {
                  setStatus({ type: "warn", text: `Übersprungen – die Lösung war ${task.code}.` });
                  setStreak(0);
                  advance();
                }}
              >
                Überspringen
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={`gui-status ${status.type}`}>
        <span className="gui-status-icon">{{ ok: "✅", err: "⛔", warn: "⚠️", info: "ℹ️" }[status.type]}</span>
        <span className="gui-status-text">{status.text}</span>
        <span className="gui-status-sys">
          🔥 {streak} · Rekord {state.tcode.bestStreak} · LRN (100)
        </span>
      </div>
    </div>
  );
}

/* ---------------- Karteikarten ---------------- */

function Flashcards({ pool }) {
  const [deck, setDeck] = useState(() => shuffle(pool));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [known, setKnown] = useState(0);
  const [again, setAgain] = useState([]);

  const card = deck[i];

  function answer(isKnown) {
    if (isKnown) setKnown((k) => k + 1);
    else setAgain((a) => [...a, card]);
    setFlipped(false);
    setI(i + 1);
  }

  if (!card) {
    return (
      <div className="card center">
        <h2>Stapel durch! 🎉</h2>
        <p>
          Gewusst: <strong>{known}</strong> · Wiederholen: <strong>{again.length}</strong>
        </p>
        <div className="row">
          {again.length > 0 && (
            <button className="btn" onClick={() => { setDeck(shuffle(again)); setAgain([]); setKnown(0); setI(0); }}>
              Nur die {again.length} unbekannten wiederholen
            </button>
          )}
          <button className="btn ghost" onClick={() => { setDeck(shuffle(pool)); setAgain([]); setKnown(0); setI(0); }}>
            Neu mischen
          </button>
        </div>
      </div>
    );
  }

  const front = reverse ? card.desc : card.code;
  const back = reverse ? card.code : card.desc;

  return (
    <div className="flash-wrap">
      <div className="flash-meta">
        <span>Karte {i + 1} / {deck.length}</span>
        <label className="check">
          <input type="checkbox" checked={reverse} onChange={(e) => { setReverse(e.target.checked); setFlipped(false); }} />
          Umgekehrt (Beschreibung → T-Code)
        </label>
      </div>
      <button className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
        <div className="flash-inner">
          <div className="flash-face front">
            <small>{card.area}</small>
            <span className={reverse ? "fc-desc" : "fc-code"}>{front}</span>
            <em>Antippen zum Umdrehen</em>
          </div>
          <div className="flash-face back">
            <small>{card.area}</small>
            <span className={reverse ? "fc-code" : "fc-desc"}>{back}</span>
          </div>
        </div>
      </button>
      <div className="row center">
        <button className="btn ghost" onClick={() => answer(false)} disabled={!flipped}>🔁 Nochmal</button>
        <button className="btn" onClick={() => answer(true)} disabled={!flipped}>✅ Gewusst</button>
      </div>
    </div>
  );
}

/* ---------------- Nachschlagen ---------------- */

function Lookup({ pool }) {
  const [q, setQ] = useState("");
  const list = pool.filter((t) => (t.code + " " + t.desc).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="card">
      <input className="search" placeholder="Suche nach Code oder Beschreibung, z. B. „Bestellung“…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="tc-table">
        {list.map((t) => (
          <div key={t.code} className="tc-row">
            <code className="tc">{t.code}</code>
            <span>{t.desc}</span>
            <span className="tc-area">{t.area}</span>
          </div>
        ))}
        {list.length === 0 && <p className="muted">Keine Treffer.</p>}
      </div>
    </div>
  );
}
