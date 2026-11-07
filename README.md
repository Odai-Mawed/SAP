# SAP Lernpfad 🎓

Eine interaktive React-App, mit der du SAP von Grund auf lernst – auf Deutsch.

## Inhalte

- **11 Lernmodule, 28 Lektionen** mit Quiz zu jeder Lektion
  - SAP-Grundlagen · Navigation (SAP GUI & Fiori) · Organisationsstrukturen
  - Finanzwesen (FI) · Controlling (CO) · Materialwirtschaft (MM) · Vertrieb (SD) · Produktion (PP)
  - SAP S/4HANA · ABAP-Entwicklung · Basis & Berechtigungen
- **T-Code-Trainer** mit 92 Transaktionen
  - *Befehlsfeld*: SAP-GUI-Simulation – Transaktion eintippen (`/n` und `/o` funktionieren wie im echten System)
  - *Karteikarten*: in beide Richtungen, mit Wiederholungsstapel
  - *Nachschlagen*: durchsuchbare Liste, filterbar nach Bereich
- **Prozess-Puzzle**: Procure-to-Pay, Order-to-Cash, Plan-to-Produce und Record-to-Report in die richtige Reihenfolge bringen – inklusive T-Codes und FI-Buchungen je Schritt
- **Glossar** mit den wichtigsten SAP-Begriffen
- **Abschlussprüfung**: 20 zufällige Fragen aus wählbaren Modulen, Bestehensgrenze 70 %, mit Lern-Zertifikat
- **Fortschritt, XP und Level** werden lokal im Browser gespeichert; heller und dunkler Modus; mobil nutzbar

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:5173
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal ansehen
```

Der Build verwendet relative Pfade (`base: "./"`) und Hash-Routing, kann also auf jedem statischen Hosting
(z. B. GitHub Pages) oder direkt aus einem Unterordner ausgeliefert werden.

## Projektstruktur

```
src/
  data/          Lerninhalte (Module & Quizfragen, T-Codes, Glossar, Prozesse)
  components/    Wiederverwendbare Komponenten (Quiz)
  pages/         Seiten: Start, Modul, Lektion, T-Code-Trainer, Prozesse, Glossar, Prüfung
  progress.jsx   Lernfortschritt (React Context + localStorage)
  router.js      Minimaler Hash-Router
```

Neue Lektionen fügst du einfach in `src/data/modules.js` hinzu – Inhalt als HTML, Quizfragen mit
`options` und dem Index der richtigen Antwort in `answer`.

> Inoffizielles Lernprojekt. SAP, S/4HANA, Fiori und ABAP sind Marken der SAP SE.
