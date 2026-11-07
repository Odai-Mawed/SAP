import { useMemo } from "react";
import { shuffle } from "../utils.js";

/* ------------------------------------------------------------------ */
/* Vergleich von Eingaben: Groß-/Kleinschreibung und Leerzeichen egal,
   Zahlen werden numerisch verglichen (50 = 50,00 = 50.00). */
const asNumber = (s) => (/^-?\d+([.,]\d+)?$/.test(s) ? parseFloat(s.replace(",", ".")) : null);
const norm = (s) => String(s ?? "").trim().toUpperCase().replace(/\s+/g, " ");

export function matches(input, answers) {
  const a = norm(input);
  if (!a) return false;
  return answers.some((ans) => {
    const b = norm(ans);
    if (a === b) return true;
    const na = asNumber(a);
    const nb = asNumber(b);
    return na !== null && nb !== null && na === nb;
  });
}

const euro = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/* ------------------------------------------------------------------ */
/* Buchungssatz */
const Posting = {
  init: () => ({}),
  check(task, value) {
    const expected = {};
    task.solution.soll.forEach(([id]) => (expected[id] = "S"));
    task.solution.haben.forEach(([id]) => (expected[id] = "H"));
    const items = {};
    task.accounts.forEach((a) => (items[a.id] = (value[a.id] ?? "") === (expected[a.id] ?? "")));
    return { ok: Object.values(items).every(Boolean), items };
  },
  View({ task, value, onChange, result, locked }) {
    const set = (id, side) => onChange({ ...value, [id]: value[id] === side ? "" : side });
    return (
      <div className="posting">
        <p className="task-hint">Tippe bei jedem betroffenen Konto auf <b>Soll</b> oder <b>Haben</b>. Nicht betroffene Konten lässt du leer.</p>
        <div className="acc-list">
          {task.accounts.map((a) => {
            const state = result ? (result.items[a.id] ? "ok" : "bad") : "";
            return (
              <div key={a.id} className={`acc-row ${state}`}>
                <span className="acc-name">{a.name}</span>
                <div className="sh-toggle" role="group" aria-label={`Seite für ${a.name}`}>
                  <button type="button" disabled={locked} className={value[a.id] === "S" ? "on" : ""} onClick={() => set(a.id, "S")}>Soll</button>
                  <button type="button" disabled={locked} className={value[a.id] === "H" ? "on" : ""} onClick={() => set(a.id, "H")}>Haben</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  Solution({ task }) {
    const name = (id) => task.accounts.find((a) => a.id === id)?.name;
    const rows = Math.max(task.solution.soll.length, task.solution.haben.length);
    const sum = (side) => task.solution[side].reduce((s, [, v]) => s + v, 0);
    return (
      <div className="t-konto-wrap">
        <table className="t-konto">
          <thead>
            <tr><th colSpan="2">Soll</th><th colSpan="2">Haben</th></tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => {
              const s = task.solution.soll[i];
              const h = task.solution.haben[i];
              return (
                <tr key={i}>
                  <td>{s ? name(s[0]) : ""}</td><td className="num">{s ? euro(s[1]) : ""}</td>
                  <td>{h ? name(h[0]) : ""}</td><td className="num">{h ? euro(h[1]) : ""}</td>
                </tr>
              );
            })}
            <tr className="sum">
              <td>Summe</td><td className="num">{euro(sum("soll"))}</td>
              <td>Summe</td><td className="num">{euro(sum("haben"))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

/* ------------------------------------------------------------------ */
/* SAP-Maske */
const Form = {
  init: () => ({}),
  check(task, value) {
    const items = {};
    task.fields.forEach((f) => (items[f.id] = matches(value[f.id], f.answer)));
    return { ok: Object.values(items).every(Boolean), items };
  },
  View({ task, value, onChange, result, locked, reveal }) {
    const sections = [];
    task.fields.forEach((f) => {
      let sec = sections.find((s) => s.name === f.section);
      if (!sec) sections.push((sec = { name: f.section, fields: [] }));
      sec.fields.push(f);
    });
    return (
      <div className="gui sap-form">
        <div className="gui-titlebar"><span>{task.screen.title}</span><span className="gui-win">— ▢ ✕</span></div>
        <div className="gui-toolbar">
          <span className="gui-check">✔</span>
          <span className="gui-cmd static">{task.screen.tcode}</span>
          <span className="gui-icons">💾 ⬅ ⤴ ✖</span>
        </div>
        <div className="form-body">
          {sections.map((sec) => (
            <fieldset key={sec.name} className="form-sec">
              <legend>{sec.name}</legend>
              {sec.fields.map((f) => {
                const state = result ? (result.items[f.id] ? "ok" : "bad") : "";
                const id = `f-${task.id}-${f.id}`;
                return (
                  <div key={f.id} className={`form-row ${state}`}>
                    <label htmlFor={id}>{f.label}</label>
                    <div className="form-input">
                      {f.type === "select" ? (
                        <select id={id} disabled={locked} value={value[f.id] ?? ""} onChange={(e) => onChange({ ...value, [f.id]: e.target.value })}>
                          {f.options.map((o) => <option key={o} value={o}>{o || "–"}</option>)}
                        </select>
                      ) : (
                        <input
                          id={id}
                          disabled={locked}
                          value={value[f.id] ?? ""}
                          onChange={(e) => onChange({ ...value, [f.id]: e.target.value })}
                          autoComplete="off"
                          spellCheck={false}
                        />
                      )}
                      {reveal && state === "bad" && <small className="sol">Richtig: {f.answer[0]}</small>}
                    </div>
                  </div>
                );
              })}
            </fieldset>
          ))}
        </div>
      </div>
    );
  }
};

/* ------------------------------------------------------------------ */
/* Support-Fälle / Freitext */
const Input = {
  init: (task) => task.items.map(() => ""),
  check(task, value) {
    const items = task.items.map((it, i) => matches(value[i], it.answers));
    return { ok: items.every(Boolean), items };
  },
  View({ task, value, onChange, result, locked, reveal }) {
    return (
      <div className="tickets">
        {task.items.map((it, i) => {
          const state = result ? (result.items[i] ? "ok" : "bad") : "";
          const id = `in-${task.id}-${i}`;
          return (
            <div key={i} className={`ticket ${state}`}>
              <label htmlFor={id} className="ticket-q"><span className="ticket-no">#{i + 1}</span> {it.q}</label>
              <input
                id={id}
                className="ticket-input"
                disabled={locked}
                value={value[i]}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder="Antwort…"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
              {result && (state === "ok" || reveal) && (
                <small className="ticket-explain">{state === "bad" && <b>Richtig: {it.answers[0]}. </b>}{it.explain}</small>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

/* ------------------------------------------------------------------ */
/* Zuordnen */
const Match = {
  init: (task) => task.pairs.map(() => ""),
  check(task, value) {
    const items = task.pairs.map(([, right], i) => value[i] === right);
    return { ok: items.every(Boolean), items };
  },
  View({ task, value, onChange, result, locked, reveal }) {
    const options = useMemo(() => shuffle(task.pairs.map(([, r]) => r)), [task]);
    const used = new Set(value.filter(Boolean));
    return (
      <div className="match">
        {task.pairs.map(([left, right], i) => {
          const state = result ? (result.items[i] ? "ok" : "bad") : "";
          const id = `m-${task.id}-${i}`;
          return (
            <div key={i} className={`match-row ${state}`}>
              <label htmlFor={id}>{left}</label>
              <div className="form-input">
                <select id={id} disabled={locked} value={value[i]} onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}>
                  <option value="">Bitte wählen…</option>
                  {options.map((o) => (
                    <option key={o} value={o}>{used.has(o) && value[i] !== o ? `${o} (vergeben)` : o}</option>
                  ))}
                </select>
                {reveal && state === "bad" && <small className="sol">Richtig: {right}</small>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

/* ------------------------------------------------------------------ */
/* Reihenfolge */
const Order = {
  init: () => [],
  check(task, value) {
    const items = task.steps.map((_, i) => value[i] === i);
    return { ok: items.every(Boolean), items };
  },
  ready: (task, value) => value.length === task.steps.length,
  View({ task, value, onChange, result, locked }) {
    const pool = useMemo(() => {
      let s = shuffle(task.steps.map((_, i) => i));
      if (s.every((x, i) => x === i)) s = s.reverse();
      return s;
    }, [task]);
    const remaining = pool.filter((i) => !value.includes(i));
    return (
      <div className="order">
        <p className="task-hint">Tippe die Schritte der Reihe nach an. Einen falsch gesetzten Schritt entfernst du durch erneutes Antippen.</p>
        <ol className="placed">
          {task.steps.map((_, pos) => {
            const idx = value[pos];
            const state = result && idx !== undefined ? (result.items[pos] ? "ok" : "bad") : "";
            return (
              <li key={pos} className={`${idx !== undefined ? "filled" : ""} ${state}`}>
                <span className="p-no">{pos + 1}</span>
                {idx !== undefined ? (
                  <button type="button" className="placed-btn" disabled={locked} onClick={() => onChange(value.filter((v) => v !== idx))}>
                    {task.steps[idx]}
                  </button>
                ) : (
                  <span className="p-empty">{pos === value.length ? "Welcher Schritt kommt jetzt?" : "…"}</span>
                )}
              </li>
            );
          })}
        </ol>
        {!locked && remaining.length > 0 && (
          <div className="pool">
            {remaining.map((i) => (
              <button key={i} type="button" className="pool-item" onClick={() => onChange([...value, i])}>{task.steps[i]}</button>
            ))}
          </div>
        )}
      </div>
    );
  },
  Solution({ task }) {
    return (
      <ol className="solution-list">
        {task.steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
    );
  }
};

/* ------------------------------------------------------------------ */
/* Lückentext */
function parseCloze(text) {
  const parts = [];
  const re = /\[\[(.+?)\]\]/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ gap: parts.filter((p) => p.gap !== undefined).length, answers: m[1].split("|") });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

const Cloze = {
  init: (task) => parseCloze(task.text).filter((p) => p.gap !== undefined).map(() => ""),
  check(task, value) {
    const gaps = parseCloze(task.text).filter((p) => p.gap !== undefined);
    const items = gaps.map((g) => matches(value[g.gap], g.answers));
    return { ok: items.every(Boolean), items };
  },
  View({ task, value, onChange, result, locked, reveal }) {
    const parts = useMemo(() => parseCloze(task.text), [task]);
    const content = parts.map((p, i) => {
      if (p.gap === undefined) return <span key={i}>{p.text}</span>;
      const state = result ? (result.items[p.gap] ? "ok" : "bad") : "";
      const width = Math.max(...p.answers.map((a) => a.length), 3) + 2;
      return (
        <span key={i} className="gap-wrap">
          <input
            className={`gap ${state}`}
            style={{ width: `${width}ch` }}
            disabled={locked}
            value={value[p.gap]}
            aria-label={`Lücke ${p.gap + 1}`}
            onChange={(e) => onChange(value.map((v, j) => (j === p.gap ? e.target.value : v)))}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {reveal && state === "bad" && <span className="gap-sol">{p.answers[0]}</span>}
        </span>
      );
    });
    return task.code ? <pre className="cloze code">{content}</pre> : <p className="cloze text">{content}</p>;
  }
};

export const TASK_VIEWS = { posting: Posting, form: Form, input: Input, match: Match, order: Order, cloze: Cloze };
