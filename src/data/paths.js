/* Rollenbasierte Lernpfade.
   Schritt-Typen:
   - { type: "lesson", module, lesson }
   - { type: "task", id }
   - { type: "tcodes", area, target }   → so viele richtige Antworten im T-Code-Trainer in diesem Bereich
   - { type: "process", id }
   - { type: "test" }                    → Abschlusstest aus den Lektionen des Pfads */

const L = (module, lesson) => ({ type: "lesson", module, lesson });
const T = (id) => ({ type: "task", id });
const D = (area, target = 10) => ({ type: "tcodes", area, target });
const P = (id) => ({ type: "process", id });
const TEST = { type: "test" };

export const PATHS = [
  {
    id: "einsteiger",
    title: "SAP-Einsteiger",
    role: "Für alle, die neu mit SAP arbeiten",
    icon: "🌱",
    color: "#188918",
    description: "Verstehe, was SAP ist, bewege dich sicher im System und lerne die Organisationsstruktur kennen. Die Basis für jeden weiteren Pfad.",
    steps: [
      L("grundlagen", "was-ist-sap"),
      L("grundlagen", "systemlandschaft"),
      L("grundlagen", "datenarten"),
      L("navigation", "gui-aufbau"),
      L("navigation", "befehlsfeld"),
      L("navigation", "tastenkuerzel"),
      L("navigation", "fiori"),
      D("Allgemein", 5),
      T("support-anwender"),
      L("organisation", "org-grundlagen"),
      L("organisation", "org-logistik"),
      T("zuordnen-org"),
      P("o2c"),
      TEST
    ]
  },
  {
    id: "finanzen",
    title: "Finanzen & Controlling",
    role: "Buchhaltung, Controlling, FI/CO-Beratung",
    icon: "💶",
    color: "#0a6ed1",
    description: "Hauptbuch, Debitoren, Kreditoren, Abschluss und Kostenrechnung. Mit vielen Buchungssätzen aus der Praxis.",
    steps: [
      L("grundlagen", "datenarten"),
      L("organisation", "org-grundlagen"),
      L("fi", "hauptbuch"),
      T("luecke-fi"),
      T("maske-fb50"),
      L("fi", "debkred"),
      T("buchung-zahlung-deb"),
      T("buchung-zahlung-kred"),
      T("reihenfolge-f110"),
      L("fi", "abschluss"),
      T("buchung-we"),
      T("buchung-re"),
      D("FI", 10),
      L("co", "kostenstellen"),
      T("maske-ks01"),
      T("buchung-entnahme"),
      L("co", "innenauftraege"),
      T("zuordnen-co"),
      D("CO", 6),
      P("r2r"),
      TEST
    ]
  },
  {
    id: "logistik",
    title: "Einkauf & Produktion",
    role: "Einkauf, Lager, Disposition, MM/PP-Beratung",
    icon: "📦",
    color: "#c0399f",
    description: "Vom Materialstamm über Procure-to-Pay und Bestandsführung bis zur Fertigung. Du füllst echte SAP-Masken aus.",
    steps: [
      L("organisation", "org-grundlagen"),
      L("organisation", "org-logistik"),
      L("mm", "materialstamm"),
      T("zuordnen-materialart"),
      T("maske-mm01"),
      L("mm", "einkauf"),
      T("maske-me21n"),
      T("maske-migo"),
      T("buchung-we"),
      T("buchung-re"),
      P("p2p"),
      L("mm", "bestand"),
      T("wissen-bwa"),
      D("MM", 10),
      L("pp", "pp-stammdaten"),
      L("pp", "mrp"),
      D("PP", 6),
      P("p2p-prod"),
      TEST
    ]
  },
  {
    id: "vertrieb",
    title: "Vertrieb",
    role: "Innendienst, Auftragsabwicklung, SD-Beratung",
    icon: "🛒",
    color: "#df1278",
    description: "Kundenaufträge, Lieferungen, Fakturen und Preisfindung, inklusive der Buchungen, die dabei entstehen.",
    steps: [
      L("organisation", "org-logistik"),
      L("sd", "o2c"),
      T("maske-va01"),
      T("buchung-wa"),
      T("buchung-faktura"),
      T("buchung-zahlung-deb"),
      T("luecke-o2c"),
      L("sd", "preisfindung"),
      D("SD", 8),
      P("o2c"),
      TEST
    ]
  },
  {
    id: "entwickler",
    title: "ABAP-Entwicklung",
    role: "Entwicklerinnen und Entwickler",
    icon: "💻",
    color: "#354a5f",
    description: "Von der ersten Zeile ABAP über das Data Dictionary bis zu CDS Views, RAP und Clean Core.",
    steps: [
      L("navigation", "tastenkuerzel"),
      L("abap", "abap-basics"),
      T("luecke-select"),
      T("luecke-klasse"),
      L("abap", "ddic"),
      T("zuordnen-tabellen"),
      T("wissen-tabellen"),
      D("ABAP", 6),
      L("s4", "s4-neu"),
      L("abap", "cds-rap"),
      T("luecke-cds"),
      L("s4", "s4-cleancore"),
      TEST
    ]
  },
  {
    id: "basis",
    title: "Basis & Administration",
    role: "SAP-Basis, Berechtigungen, Systembetrieb",
    icon: "🔐",
    color: "#bb0000",
    description: "Systemlandschaft, Benutzer und Rollen, Transporte und Monitoring. Mit echten Support-Fällen.",
    steps: [
      L("grundlagen", "systemlandschaft"),
      L("basis", "berechtigungen"),
      T("reihenfolge-mitarbeiter"),
      L("basis", "monitoring"),
      T("reihenfolge-transport"),
      T("support-basis"),
      D("Basis", 10),
      L("s4", "s4-neu"),
      TEST
    ]
  },
  {
    id: "s4",
    title: "Umstieg auf S/4HANA",
    role: "Für alle, die ECC kennen",
    icon: "🚀",
    color: "#0070f2",
    description: "Was sich mit S/4HANA ändert: HANA, Universal Journal, Business Partner, Fiori, Clean Core und Cloud.",
    steps: [
      L("s4", "s4-neu"),
      L("navigation", "fiori"),
      L("fi", "hauptbuch"),
      L("co", "kostenstellen"),
      L("mm", "bestand"),
      T("support-anwender"),
      L("s4", "s4-cleancore"),
      L("abap", "cds-rap"),
      TEST
    ]
  }
];

export const PATH_BY_ID = Object.fromEntries(PATHS.map((p) => [p.id, p]));
