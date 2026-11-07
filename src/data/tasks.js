/* Praxisaufgaben.
   Typen:
   - posting: Buchungssatz – Konten der Soll- oder Haben-Seite zuordnen
   - form:    SAP-Maske anhand eines Szenarios ausfüllen
   - input:   Freitext-Fragen (z. B. Support-Tickets), mehrere richtige Schreibweisen möglich
   - match:   Begriffe einander zuordnen
   - order:   Schritte in die richtige Reihenfolge bringen
   - cloze:   Lückentext, Lücken als [[antwort|alternative]] */

export const TASK_TYPES = {
  posting: { label: "Buchungssatz", icon: "💶" },
  form: { label: "SAP-Maske", icon: "🖥️" },
  input: { label: "Support-Fall", icon: "🎧" },
  match: { label: "Zuordnen", icon: "🔀" },
  order: { label: "Reihenfolge", icon: "🔢" },
  cloze: { label: "Lückentext", icon: "✏️" }
};

export const DIFFICULTY = { 1: "Leicht", 2: "Mittel", 3: "Schwer" };

export const TASKS = [
  /* ============================ Buchungssätze ============================ */
  {
    id: "buchung-we",
    type: "posting",
    module: "mm",
    difficulty: 1,
    title: "Wareneingang zur Bestellung",
    scenario:
      "Für die Bestellung 4500000123 treffen 50 Stück Schrauben (Rohstoff, 20 € pro Stück) ein. Das Lager bucht den Wareneingang mit MIGO, Bewegungsart 101. Welche Buchung erzeugt SAP automatisch in der Finanzbuchhaltung?",
    accounts: [
      { id: "roh", name: "Rohstoffbestand" },
      { id: "were", name: "WE/RE-Verrechnung" },
      { id: "kred", name: "Kreditor (Verbindlichkeiten)" },
      { id: "aufw", name: "Materialaufwand" },
      { id: "bank", name: "Bank" },
      { id: "vst", name: "Vorsteuer" }
    ],
    solution: { soll: [["roh", 1000]], haben: [["were", 1000]] },
    explain:
      "Der Bestand steigt (Soll), der Lieferant hat aber noch keine Rechnung geschickt. Deshalb wird gegen das Zwischenkonto WE/RE-Verrechnung gebucht, nicht gegen den Kreditor."
  },
  {
    id: "buchung-re",
    type: "posting",
    module: "mm",
    difficulty: 2,
    title: "Rechnungseingang mit MIRO",
    scenario:
      "Zur Bestellung aus der vorherigen Aufgabe kommt die Rechnung des Lieferanten: 1.000 € netto zuzüglich 19 % Umsatzsteuer. Menge und Preis stimmen mit Bestellung und Wareneingang überein. Welche Konten werden bei der Buchung in MIRO angesprochen?",
    accounts: [
      { id: "were", name: "WE/RE-Verrechnung" },
      { id: "vst", name: "Vorsteuer" },
      { id: "ust", name: "Umsatzsteuer" },
      { id: "kred", name: "Kreditor (Verbindlichkeiten)" },
      { id: "roh", name: "Rohstoffbestand" },
      { id: "bank", name: "Bank" }
    ],
    solution: { soll: [["were", 1000], ["vst", 190]], haben: [["kred", 1190]] },
    explain:
      "Die Rechnung gleicht das WE/RE-Konto aus (Soll), die gezahlte Steuer ist Vorsteuer (Soll), und gegenüber dem Lieferanten entsteht eine Verbindlichkeit über den Bruttobetrag (Haben)."
  },
  {
    id: "buchung-zahlung-kred",
    type: "posting",
    module: "fi",
    difficulty: 1,
    title: "Zahlung an den Lieferanten",
    scenario: "Der Zahllauf F110 bezahlt die offene Rechnung über 1.190 € per SEPA-Überweisung.",
    accounts: [
      { id: "kred", name: "Kreditor (Verbindlichkeiten)" },
      { id: "bank", name: "Bank" },
      { id: "deb", name: "Debitor (Forderungen)" },
      { id: "vst", name: "Vorsteuer" },
      { id: "were", name: "WE/RE-Verrechnung" }
    ],
    solution: { soll: [["kred", 1190]], haben: [["bank", 1190]] },
    explain: "Die Verbindlichkeit sinkt (Soll), das Bankguthaben sinkt (Haben). Der offene Posten beim Kreditor wird dabei ausgeglichen."
  },
  {
    id: "buchung-faktura",
    type: "posting",
    module: "sd",
    difficulty: 2,
    title: "Faktura an den Kunden",
    scenario:
      "Mit VF01 wird eine Rechnung an den Kunden erstellt: 2.000 € netto zuzüglich 19 % Umsatzsteuer. Welche Buchung entsteht bei der Übergabe an die Buchhaltung?",
    accounts: [
      { id: "deb", name: "Debitor (Forderungen)" },
      { id: "erl", name: "Umsatzerlöse" },
      { id: "ust", name: "Umsatzsteuer" },
      { id: "vst", name: "Vorsteuer" },
      { id: "fert", name: "Bestand Fertigerzeugnisse" },
      { id: "bank", name: "Bank" }
    ],
    solution: { soll: [["deb", 2380]], haben: [["erl", 2000], ["ust", 380]] },
    explain:
      "Es entsteht eine Forderung gegenüber dem Kunden über den Bruttobetrag (Soll). Der Erlös und die geschuldete Umsatzsteuer stehen im Haben."
  },
  {
    id: "buchung-wa",
    type: "posting",
    module: "sd",
    difficulty: 2,
    title: "Warenausgang zur Lieferung",
    scenario:
      "Für einen Kundenauftrag werden 10 Fahrräder (Fertigerzeugnis, Standardpreis 300 €) ausgeliefert. In VL02N wird der Warenausgang gebucht (Bewegungsart 601). Welche Buchung entsteht?",
    accounts: [
      { id: "fert", name: "Bestand Fertigerzeugnisse" },
      { id: "hk", name: "Bestandsveränderung / Herstellkosten des Umsatzes" },
      { id: "deb", name: "Debitor (Forderungen)" },
      { id: "erl", name: "Umsatzerlöse" },
      { id: "were", name: "WE/RE-Verrechnung" }
    ],
    solution: { soll: [["hk", 3000]], haben: [["fert", 3000]] },
    explain:
      "Der Bestand sinkt (Haben), der Wertabgang wird als Aufwand gebucht (Soll). Erlöse und Forderungen entstehen erst mit der Faktura."
  },
  {
    id: "buchung-zahlung-deb",
    type: "posting",
    module: "fi",
    difficulty: 1,
    title: "Zahlungseingang vom Kunden",
    scenario: "Der Kunde überweist die Rechnung über 2.380 €. Die Buchhaltung bucht den Zahlungseingang mit F-28.",
    accounts: [
      { id: "bank", name: "Bank" },
      { id: "deb", name: "Debitor (Forderungen)" },
      { id: "erl", name: "Umsatzerlöse" },
      { id: "kred", name: "Kreditor (Verbindlichkeiten)" },
      { id: "ust", name: "Umsatzsteuer" }
    ],
    solution: { soll: [["bank", 2380]], haben: [["deb", 2380]] },
    explain: "Das Bankguthaben steigt (Soll), die Forderung gegenüber dem Kunden wird ausgeglichen (Haben)."
  },
  {
    id: "buchung-entnahme",
    type: "posting",
    module: "co",
    difficulty: 2,
    title: "Materialentnahme für eine Kostenstelle",
    scenario:
      "Die Instandhaltung entnimmt 40 Liter Schmieröl (Wert 120 €) aus dem Lager für die Kostenstelle 4200 „Werkstatt“. Gebucht wird in MIGO mit Bewegungsart 201. Welche Konten sind betroffen?",
    accounts: [
      { id: "aufw", name: "Materialaufwand (kontiert auf Kostenstelle)" },
      { id: "hilf", name: "Bestand Hilfs- und Betriebsstoffe" },
      { id: "were", name: "WE/RE-Verrechnung" },
      { id: "kred", name: "Kreditor (Verbindlichkeiten)" },
      { id: "bank", name: "Bank" }
    ],
    solution: { soll: [["aufw", 120]], haben: [["hilf", 120]] },
    explain:
      "Der Bestand sinkt (Haben), der Verbrauch ist Aufwand (Soll). Weil das Aufwandskonto eine primäre Kostenart ist, landen die Kosten zusätzlich auf der Kostenstelle 4200 im Controlling."
  },

  /* ============================ SAP-Masken ============================ */
  {
    id: "maske-me21n",
    type: "form",
    module: "mm",
    difficulty: 2,
    title: "Bestellung anlegen",
    screen: { tcode: "ME21N", title: "Normalbestellung anlegen" },
    scenario:
      "Frau Weber aus der Einkäufergruppe 001 bestellt für das Werk 1010 beim Lieferanten 17300001 100 Stück Schrauben (Material RM-100). Zuständig ist die Einkaufsorganisation 1010, gebucht wird im Buchungskreis 1010. Es handelt sich um eine normale Bestellung.",
    fields: [
      { id: "bsart", section: "Kopf", label: "Bestellart", type: "select", options: ["", "NB – Normalbestellung", "FO – Rahmenbestellung", "UB – Umlagerungsbestellung"], answer: ["NB – Normalbestellung"] },
      { id: "lifnr", section: "Kopf", label: "Lieferant", answer: ["17300001"] },
      { id: "ekorg", section: "Kopf", label: "Einkaufsorganisation", answer: ["1010"] },
      { id: "ekgrp", section: "Kopf", label: "Einkäufergruppe", answer: ["001"] },
      { id: "bukrs", section: "Kopf", label: "Buchungskreis", answer: ["1010"] },
      { id: "matnr", section: "Position 10", label: "Material", answer: ["RM-100"] },
      { id: "menge", section: "Position 10", label: "Bestellmenge", answer: ["100"] },
      { id: "werk", section: "Position 10", label: "Werk", answer: ["1010"] }
    ],
    explain:
      "Kopfdaten gelten für die ganze Bestellung (Lieferant, Organisation). Positionsdaten gelten pro Material. Nach dem Sichern erhältst du eine Nummer aus dem Bereich 45…"
  },
  {
    id: "maske-va01",
    type: "form",
    module: "sd",
    difficulty: 2,
    title: "Kundenauftrag anlegen",
    screen: { tcode: "VA01", title: "Terminauftrag anlegen" },
    scenario:
      "Der Fahrradhändler mit der Kundennummer 10100001 bestellt telefonisch 5 E-Bikes (Material FG-200). Seine eigene Bestellnummer lautet PO-4711. Verkauft wird über die Verkaufsorganisation 1010 im Direktvertrieb (Vertriebsweg 10), Sparte 00. Es ist ein normaler Terminauftrag.",
    fields: [
      { id: "auart", section: "Einstieg", label: "Auftragsart", type: "select", options: ["", "TA – Terminauftrag", "AG – Angebot", "AF – Anfrage", "RE – Retoure"], answer: ["TA – Terminauftrag"] },
      { id: "vkorg", section: "Einstieg", label: "Verkaufsorganisation", answer: ["1010"] },
      { id: "vtweg", section: "Einstieg", label: "Vertriebsweg", answer: ["10"] },
      { id: "spart", section: "Einstieg", label: "Sparte", answer: ["00", "0"] },
      { id: "kunag", section: "Übersicht", label: "Auftraggeber", answer: ["10100001"] },
      { id: "bstkd", section: "Übersicht", label: "Bestellnummer des Kunden", answer: ["PO-4711"] },
      { id: "matnr", section: "Position 10", label: "Material", answer: ["FG-200"] },
      { id: "menge", section: "Position 10", label: "Auftragsmenge", answer: ["5"] }
    ],
    explain:
      "Verkaufsorganisation, Vertriebsweg und Sparte bilden zusammen den Vertriebsbereich. Die Bestellnummer des Kunden steht später auf Lieferschein und Rechnung."
  },
  {
    id: "maske-migo",
    type: "form",
    module: "mm",
    difficulty: 2,
    title: "Wareneingang buchen",
    screen: { tcode: "MIGO", title: "Warenbewegung" },
    scenario:
      "Die Lieferung zur Bestellung 4500000123 ist vollständig angekommen. Buche den Wareneingang in den Lagerort 0001 (Rohstofflager). Die Ware ist sofort frei verwendbar.",
    fields: [
      { id: "action", section: "Kopf", label: "Vorgang", type: "select", options: ["", "Wareneingang", "Warenausgang", "Umbuchung", "Storno"], answer: ["Wareneingang"] },
      { id: "ref", section: "Kopf", label: "Referenz", type: "select", options: ["", "Bestellung", "Auftrag", "Lieferung", "Sonstige"], answer: ["Bestellung"] },
      { id: "ebeln", section: "Kopf", label: "Bestellnummer", answer: ["4500000123"] },
      { id: "bwart", section: "Kopf", label: "Bewegungsart", answer: ["101"] },
      { id: "lgort", section: "Position", label: "Lagerort", answer: ["0001"] },
      { id: "insmk", section: "Position", label: "Bestandsart", type: "select", options: ["", "Frei verwendbar", "Qualitätsprüfung", "Gesperrt"], answer: ["Frei verwendbar"] }
    ],
    explain:
      "Wareneingang mit Referenz Bestellung und Bewegungsart 101 ist der Standardfall. SAP übernimmt Material und Menge aus der Bestellung, du prüfst nur noch und setzt das Häkchen „Position OK“."
  },
  {
    id: "maske-fb50",
    type: "form",
    module: "fi",
    difficulty: 3,
    title: "Sachkontenbuchung erfassen",
    screen: { tcode: "FB50", title: "Sachkontenbeleg erfassen: Buchungskreis 1010" },
    scenario:
      "Die Verwaltung kauft Büromaterial für 50,00 € und bezahlt bar aus der Kasse. Buche den Aufwand auf das Sachkonto 476000 (Büromaterial) und die Kostenstelle 1010-ADM. Das Gegenkonto ist die Kasse, Sachkonto 100000. Steuer kannst du hier ignorieren.",
    fields: [
      { id: "k1", section: "Zeile 1", label: "Sachkonto", answer: ["476000"] },
      { id: "s1", section: "Zeile 1", label: "Soll/Haben", type: "select", options: ["", "Soll", "Haben"], answer: ["Soll"] },
      { id: "b1", section: "Zeile 1", label: "Betrag", answer: ["50"] },
      { id: "c1", section: "Zeile 1", label: "Kostenstelle", answer: ["1010-ADM"] },
      { id: "k2", section: "Zeile 2", label: "Sachkonto", answer: ["100000"] },
      { id: "s2", section: "Zeile 2", label: "Soll/Haben", type: "select", options: ["", "Soll", "Haben"], answer: ["Haben"] },
      { id: "b2", section: "Zeile 2", label: "Betrag", answer: ["50"] }
    ],
    explain:
      "Aufwand steht im Soll, der Kassenbestand sinkt im Haben. Weil 476000 eine primäre Kostenart ist, verlangt SAP ein CO-Objekt, hier die Kostenstelle. Ohne sie kommt eine Fehlermeldung."
  },
  {
    id: "maske-ks01",
    type: "form",
    module: "co",
    difficulty: 2,
    title: "Kostenstelle anlegen",
    screen: { tcode: "KS01", title: "Kostenstelle anlegen: Grunddaten" },
    scenario:
      "Für das neue Vertriebsteam Nord soll ab dem 01.01.2027 die Kostenstelle 4711 mit der Bezeichnung „Vertrieb Nord“ angelegt werden. Verantwortlich ist Herr Schulz. Die Kostenstelle gehört zum Buchungskreis 1010 und ist eine Vertriebskostenstelle.",
    fields: [
      { id: "kostl", section: "Einstieg", label: "Kostenstelle", answer: ["4711"] },
      { id: "datab", section: "Einstieg", label: "Gültig ab", answer: ["01.01.2027", "1.1.2027"] },
      { id: "ktext", section: "Grunddaten", label: "Bezeichnung", answer: ["Vertrieb Nord"] },
      { id: "verak", section: "Grunddaten", label: "Verantwortlicher", answer: ["Schulz", "Herr Schulz"] },
      { id: "kosar", section: "Grunddaten", label: "Kostenstellenart", type: "select", options: ["", "F – Fertigung", "V – Verwaltung", "W – Vertrieb", "H – Hilfskostenstelle"], answer: ["W – Vertrieb"] },
      { id: "bukrs", section: "Grunddaten", label: "Buchungskreis", answer: ["1010"] }
    ],
    explain:
      "Kostenstellen sind zeitabhängig, daher das Gültig-ab-Datum. Die Kostenstellenart steuert unter anderem, welche Kostenarten erlaubt sind, und dient für Auswertungen."
  },
  {
    id: "maske-mm01",
    type: "form",
    module: "mm",
    difficulty: 1,
    title: "Material anlegen",
    screen: { tcode: "MM01", title: "Material anlegen (Einstieg)" },
    scenario:
      "Das Unternehmen produziert ein neues Kinderfahrrad selbst und verkauft es. Lege das Material KB-16 an: Branche Maschinenbau, die Mengeneinheit ist Stück (ST), die Bezeichnung lautet „Kinderfahrrad 16 Zoll“.",
    fields: [
      { id: "matnr", section: "Einstieg", label: "Material", answer: ["KB-16"] },
      { id: "mbrsh", section: "Einstieg", label: "Branche", type: "select", options: ["", "M – Maschinenbau", "C – Chemie", "P – Pharma", "A – Anlagenbau"], answer: ["M – Maschinenbau"] },
      { id: "mtart", section: "Einstieg", label: "Materialart", type: "select", options: ["", "ROH – Rohstoff", "HALB – Halbfabrikat", "FERT – Fertigerzeugnis", "HAWA – Handelsware"], answer: ["FERT – Fertigerzeugnis"] },
      { id: "maktx", section: "Grunddaten 1", label: "Materialkurztext", answer: ["Kinderfahrrad 16 Zoll"] },
      { id: "meins", section: "Grunddaten 1", label: "Basismengeneinheit", answer: ["ST", "STK", "PC"] }
    ],
    explain:
      "Ein selbst produziertes und verkauftes Produkt ist ein Fertigerzeugnis (FERT). Handelsware (HAWA) wäre zugekauft und unverändert weiterverkauft."
  },

  /* ============================ Support-Fälle ============================ */
  {
    id: "support-basis",
    type: "input",
    module: "basis",
    difficulty: 2,
    title: "Support-Hotline: Basis-Tickets",
    scenario: "Du sitzt im SAP-Support. Welche Transaktion öffnest du als Erstes, um das Ticket zu analysieren?",
    items: [
      { q: "„Ich bekomme beim Anlegen einer Bestellung die Meldung ‚Keine Berechtigung‘.“", answers: ["SU53"], explain: "SU53 zeigt direkt nach dem Fehler die fehlgeschlagene Berechtigungsprüfung." },
      { q: "„Mein Programm ist mit einem Kurzdump abgebrochen.“", answers: ["ST22"], explain: "ST22 listet alle ABAP-Laufzeitfehler mit Ursache und Codestelle." },
      { q: "„Material RM-100 wird angeblich von Kollege Meier bearbeitet, aber der ist seit gestern im Urlaub.“", answers: ["SM12"], explain: "In SM12 siehst du hängende Sperreinträge und kannst sie nach Prüfung löschen." },
      { q: "„Der nächtliche Zahllauf-Job ist heute Nacht nicht durchgelaufen.“", answers: ["SM37"], explain: "SM37 zeigt den Jobstatus und das Joblog mit der Abbruchursache." },
      { q: "„Ich habe mein Passwort vergessen und bin gesperrt.“", answers: ["SU01"], explain: "In SU01 entsperrst du den Benutzer und setzt ein Initialkennwort." },
      { q: "„Das System ist extrem langsam, alle Prozesse scheinen belegt.“", answers: ["SM50", "SM66"], explain: "SM50 (pro Server) bzw. SM66 (systemweit) zeigen, welche Workprozesse was gerade tun." }
    ]
  },
  {
    id: "support-anwender",
    type: "input",
    module: "navigation",
    difficulty: 1,
    title: "Kollegen helfen: Welche Transaktion?",
    scenario: "Neue Kolleginnen und Kollegen fragen dich, wie sie ihre Aufgabe in SAP erledigen. Nenne den Transaktionscode.",
    items: [
      { q: "„Ich möchte sehen, wie viel vom Material RM-100 in allen Werken auf Lager ist.“", answers: ["MMBE"], explain: "MMBE zeigt die Bestandsübersicht über alle Organisationsebenen." },
      { q: "„Ich will eine Bestellung, die ich gestern angelegt habe, nur ansehen.“", answers: ["ME23N"], explain: "ME23N = Bestellung anzeigen." },
      { q: "„Ich muss einen neuen Lieferanten anlegen.“", answers: ["BP"], explain: "In S/4HANA werden Lieferanten als Geschäftspartner mit BP angelegt." },
      { q: "„Ich will die offenen Posten eines Kunden sehen.“", answers: ["FBL5N"], explain: "FBL5N = Debitoren-Einzelposten." },
      { q: "„Ich will meinen Buchungskreis als Vorschlagswert hinterlegen.“", answers: ["SU3"], explain: "In SU3 pflegst du Parameter-IDs wie BUK für den Buchungskreis." }
    ]
  },
  {
    id: "wissen-bwa",
    type: "input",
    module: "mm",
    difficulty: 2,
    title: "Bewegungsarten im Lager",
    scenario: "Das Lager fragt nach der richtigen Bewegungsart. Gib die dreistellige Nummer ein.",
    items: [
      { q: "Wareneingang zur Bestellung", answers: ["101"], explain: "101 = WE zur Bestellung oder zum Fertigungsauftrag." },
      { q: "Der Wareneingang von gestern war falsch und soll storniert werden.", answers: ["102"], explain: "Storno = Bewegungsart + 1." },
      { q: "Beschädigte Ware wird verschrottet.", answers: ["551"], explain: "551 = Verschrottung." },
      { q: "Material wird aus dem Lager für einen Fertigungsauftrag entnommen.", answers: ["261"], explain: "261 = Warenausgang zum Auftrag." },
      { q: "Ware wird vom Lagerort 0001 an den Lagerort 0002 im selben Werk umgelagert.", answers: ["311"], explain: "311 = Umlagerung Lagerort an Lagerort." },
      { q: "Mangelhafte Ware geht an den Lieferanten zurück.", answers: ["122"], explain: "122 = Rücklieferung an den Lieferanten." }
    ]
  },
  {
    id: "wissen-tabellen",
    type: "input",
    module: "abap",
    difficulty: 3,
    title: "Tabellen-Detektiv",
    scenario: "Ein Kollege will per SE16N Daten auswerten. In welcher Tabelle findet er die Informationen?",
    items: [
      { q: "Positionen von Bestellungen (Material, Menge, Preis)", answers: ["EKPO"], explain: "EKKO = Bestellkopf, EKPO = Bestellposition." },
      { q: "Kopfdaten von Kundenaufträgen", answers: ["VBAK"], explain: "VBAK = Verkaufsbeleg Kopf." },
      { q: "Werksspezifische Materialdaten (z. B. Disposition)", answers: ["MARC"], explain: "MARC = Werksdaten zum Material." },
      { q: "Alle Buchungszeilen des Universal Journals in S/4HANA", answers: ["ACDOCA"], explain: "ACDOCA = Universal Journal." },
      { q: "Kopf eines Buchhaltungsbelegs", answers: ["BKPF"], explain: "BKPF = Belegkopf Buchhaltung." },
      { q: "Allgemeine Daten eines Geschäftspartners", answers: ["BUT000"], explain: "BUT000 = Geschäftspartner allgemeine Daten." }
    ]
  },

  /* ============================ Zuordnen ============================ */
  {
    id: "zuordnen-org",
    type: "match",
    module: "organisation",
    difficulty: 1,
    title: "Organisationseinheiten zuordnen",
    scenario: "Die Fahrrad GmbH führt SAP ein. Ordne jedem Teil des Unternehmens die passende SAP-Organisationseinheit zu.",
    pairs: [
      ["Die Fahrrad GmbH als rechtlich selbständige Firma mit eigener Bilanz", "Buchungskreis"],
      ["Die Fabrik in Leipzig", "Werk"],
      ["Das Ersatzteilregal in Halle 2 der Fabrik", "Lagerort"],
      ["Die Abteilung, die Preise mit Lieferanten verhandelt", "Einkaufsorganisation"],
      ["Die Abteilung, die für den Verkauf verantwortlich ist und haftet", "Verkaufsorganisation"],
      ["Der Online-Shop als Absatzkanal", "Vertriebsweg"],
      ["Der gesamte Konzern im SAP-System", "Mandant"]
    ]
  },
  {
    id: "zuordnen-materialart",
    type: "match",
    module: "mm",
    difficulty: 1,
    title: "Materialarten erkennen",
    scenario: "Ein Fahrradhersteller pflegt seine Materialien. Welche Materialart passt?",
    pairs: [
      ["Stahlrohre, aus denen Rahmen geschweißt werden", "ROH – Rohstoff"],
      ["Der geschweißte, noch unlackierte Rahmen", "HALB – Halbfabrikat"],
      ["Das fertige Rennrad für den Verkauf", "FERT – Fertigerzeugnis"],
      ["Zugekaufte Helme, die unverändert weiterverkauft werden", "HAWA – Handelsware"],
      ["Die jährliche Fahrradinspektion als Leistung", "DIEN – Dienstleistung"]
    ]
  },
  {
    id: "zuordnen-tabellen",
    type: "match",
    module: "abap",
    difficulty: 2,
    title: "Tabellen und Inhalte",
    scenario: "Ordne jeder SAP-Tabelle ihren Inhalt zu.",
    pairs: [
      ["MARA", "Allgemeine Materialdaten"],
      ["EKKO", "Bestellkopf"],
      ["VBAP", "Positionen von Verkaufsbelegen"],
      ["LIKP", "Lieferkopf"],
      ["VBRK", "Fakturakopf"],
      ["BSEG", "Positionen eines FI-Belegs"],
      ["MATDOC", "Materialbelege in S/4HANA"]
    ]
  },
  {
    id: "zuordnen-co",
    type: "match",
    module: "co",
    difficulty: 2,
    title: "Das richtige CO-Objekt",
    scenario: "Auf welchem Controlling-Objekt sammelst du diese Kosten bzw. Ergebnisse am besten?",
    pairs: [
      ["Laufende Kosten der IT-Abteilung (Gehälter, Lizenzen)", "Kostenstelle"],
      ["Kosten für den Messeauftritt auf der Eurobike im Juni", "Innenauftrag"],
      ["Gewinn der Sparte E-Bikes mit Kosten und Erlösen", "Profit-Center"],
      ["Profitabilität nach Kunde, Produkt und Region", "Ergebnisrechnung (CO-PA)"],
      ["Kosten der Herstellung von 200 Rädern", "Fertigungsauftrag"]
    ]
  },

  /* ============================ Reihenfolge ============================ */
  {
    id: "reihenfolge-f110",
    type: "order",
    module: "fi",
    difficulty: 2,
    title: "Der Zahllauf F110",
    scenario: "Es ist Freitag, die fälligen Lieferantenrechnungen sollen bezahlt werden. Bring die Schritte im F110 in die richtige Reihenfolge.",
    steps: [
      "Laufdatum und Identifikation festlegen",
      "Parameter pflegen (Buchungskreis, Zahlwege, Kreditoren)",
      "Vorschlagslauf einplanen",
      "Vorschlag prüfen und bei Bedarf bearbeiten",
      "Zahllauf einplanen",
      "Zahlungsträger erzeugen (z. B. SEPA-XML an die Bank)"
    ]
  },
  {
    id: "reihenfolge-transport",
    type: "order",
    module: "basis",
    difficulty: 2,
    title: "Eine Änderung transportieren",
    scenario: "Eine neue Zahlungsbedingung soll ins Produktivsystem. In welcher Reihenfolge läuft das ab?",
    steps: [
      "Customizing im Entwicklungssystem (SPRO) ändern",
      "Änderung einem Transportauftrag zuordnen",
      "Transportauftrag freigeben (SE09/SE10)",
      "Import ins Qualitätssicherungssystem (STMS)",
      "Fachbereich testet im QAS",
      "Import ins Produktivsystem"
    ]
  },
  {
    id: "reihenfolge-mitarbeiter",
    type: "order",
    module: "basis",
    difficulty: 1,
    title: "Neuen Benutzer einrichten",
    scenario: "Eine neue Einkäuferin startet am Montag. Bring die Schritte zur Einrichtung ihres SAP-Zugangs in eine sinnvolle Reihenfolge.",
    steps: [
      "Berechtigungsantrag vom Vorgesetzten genehmigen lassen",
      "Benutzer in SU01 anlegen (Typ Dialog, Initialkennwort)",
      "Einkaufsrolle aus PFCG zuordnen",
      "Benutzerabgleich durchführen, damit die Rolle wirkt",
      "Zugangsdaten sicher an die Mitarbeiterin übergeben",
      "Mitarbeiterin ändert beim ersten Login ihr Kennwort"
    ]
  },

  /* ============================ Lückentexte ============================ */
  {
    id: "luecke-select",
    type: "cloze",
    module: "abap",
    difficulty: 2,
    title: "ABAP: Daten lesen und ausgeben",
    scenario: "Vervollständige das Programm. Es soll alle Fertigerzeugnisse aus der allgemeinen Materialtabelle lesen und ausgeben.",
    code: true,
    text: `REPORT z_fertigerzeugnisse.

SELECT matnr, mtart
  FROM [[mara]]
  WHERE mtart = '[[FERT]]'
  INTO TABLE @DATA(lt_mat).

IF sy-[[subrc]] <> 0.
  WRITE 'Keine Materialien gefunden'.
  RETURN.
ENDIF.

[[LOOP]] AT lt_mat INTO DATA(ls_mat).
  WRITE: / ls_mat-matnr.
[[ENDLOOP]].`
  },
  {
    id: "luecke-klasse",
    type: "cloze",
    module: "abap",
    difficulty: 3,
    title: "ABAP: Eine Klasse schreiben",
    scenario: "Vervollständige die lokale Klasse, die einen Bruttobetrag berechnet.",
    code: true,
    text: `CLASS lcl_steuer [[DEFINITION]].
  [[PUBLIC]] SECTION.
    METHODS brutto
      IMPORTING iv_netto TYPE p
      [[RETURNING]] VALUE(rv_brutto) TYPE p.
ENDCLASS.

CLASS lcl_steuer [[IMPLEMENTATION]].
  METHOD brutto.
    rv_brutto = iv_netto * '1.19'.
  [[ENDMETHOD]].
ENDCLASS.

DATA(lo_steuer) = [[NEW]] lcl_steuer( ).
WRITE lo_steuer->brutto( 100 ).`
  },
  {
    id: "luecke-cds",
    type: "cloze",
    module: "s4",
    difficulty: 3,
    title: "CDS View definieren",
    scenario: "Vervollständige die CDS View Entity, die Bestellköpfe mit Lieferant liefert.",
    code: true,
    text: `@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Bestellungen'
define view [[entity]] ZI_Bestellung
  as select from [[ekko]]
{
  [[key]] ebeln as Bestellung,
      lifnr as Lieferant,
      bukrs as Buchungskreis
}`
  },
  {
    id: "luecke-o2c",
    type: "cloze",
    module: "sd",
    difficulty: 1,
    title: "Order-to-Cash in Worten",
    scenario: "Fülle die Lücken mit dem richtigen Transaktionscode oder Fachbegriff.",
    text: `Der Kunde bestellt, und der Vertrieb legt mit [[VA01]] einen Kundenauftrag an. Dabei prüft SAP die Verfügbarkeit und ermittelt den Preis über die [[Preisfindung|Konditionstechnik]]. Das Lager legt mit VL01N die [[Auslieferung|Lieferung]] an und bucht den Warenausgang mit der Bewegungsart [[601]]. Danach erstellt die Fakturierung mit [[VF01]] die Rechnung. Dabei entsteht eine Forderung auf dem [[Debitor|Debitorenkonto|Kundenkonto]].`
  },
  {
    id: "luecke-fi",
    type: "cloze",
    module: "fi",
    difficulty: 2,
    title: "Grundbegriffe der Buchhaltung",
    scenario: "Ergänze die Lücken.",
    text: `Die kleinste Einheit mit eigener Bilanz und GuV heißt [[Buchungskreis]]. Buchungen auf Kunden landen im Nebenbuch und werden automatisch über das [[Abstimmkonto]] im Hauptbuch mitgebucht. Der Buchungsschlüssel [[40]] steht für eine Sachkontenbuchung im Soll, der Schlüssel [[50]] für eine im Haben. Buchungsperioden werden mit der Transaktion [[OB52]] geöffnet und geschlossen. Falsche Belege werden nicht gelöscht, sondern [[storniert|storniert (Storno)|gegengebucht]].`
  }
];

export const TASK_BY_ID = Object.fromEntries(TASKS.map((t) => [t.id, t]));
