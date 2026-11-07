/* End-to-End-Prozesse. Die Schritte sind in der korrekten Reihenfolge angegeben. */
export const PROCESSES = [
  {
    id: "p2p",
    title: "Procure-to-Pay",
    subtitle: "Einkauf: vom Bedarf bis zur Zahlung an den Lieferanten",
    icon: "📦",
    steps: [
      { label: "Bestellanforderung", tcode: "ME51N", fi: "Keine FI-Buchung" },
      { label: "Bestellung", tcode: "ME21N", fi: "Keine FI-Buchung (ggf. Obligo in CO)" },
      { label: "Wareneingang (BWA 101)", tcode: "MIGO", fi: "Bestand an WE/RE-Verrechnung" },
      { label: "Rechnungsprüfung", tcode: "MIRO", fi: "WE/RE-Verrechnung + Vorsteuer an Kreditor" },
      { label: "Zahlung", tcode: "F110", fi: "Kreditor an Bank" }
    ]
  },
  {
    id: "o2c",
    title: "Order-to-Cash",
    subtitle: "Vertrieb: von der Anfrage bis zum Zahlungseingang",
    icon: "🛒",
    steps: [
      { label: "Anfrage", tcode: "VA11", fi: "Keine FI-Buchung" },
      { label: "Angebot", tcode: "VA21", fi: "Keine FI-Buchung" },
      { label: "Kundenauftrag", tcode: "VA01", fi: "Keine FI-Buchung" },
      { label: "Auslieferung & Kommissionierung", tcode: "VL01N", fi: "Keine FI-Buchung" },
      { label: "Warenausgang (BWA 601)", tcode: "VL02N", fi: "Bestandsveränderung an Bestand" },
      { label: "Faktura", tcode: "VF01", fi: "Debitor an Umsatzerlöse + Umsatzsteuer" },
      { label: "Zahlungseingang", tcode: "F-28", fi: "Bank an Debitor" }
    ]
  },
  {
    id: "p2p-prod",
    title: "Plan-to-Produce",
    subtitle: "Produktion: von der Planung bis zum fertigen Produkt",
    icon: "🏭",
    steps: [
      { label: "Planprimärbedarf pflegen", tcode: "MD61", fi: "Keine FI-Buchung" },
      { label: "Bedarfsplanung (MRP) → Planauftrag", tcode: "MD01N", fi: "Keine FI-Buchung" },
      { label: "Planauftrag in Fertigungsauftrag umsetzen", tcode: "CO40", fi: "Keine FI-Buchung" },
      { label: "Materialentnahme (BWA 261)", tcode: "MIGO", fi: "Verbrauch an Bestand Rohstoffe" },
      { label: "Rückmeldung", tcode: "CO11N", fi: "Leistungsverrechnung im CO" },
      { label: "Wareneingang Fertigerzeugnis (BWA 101)", tcode: "MIGO", fi: "Bestand Fertigerzeugnis an Bestandsveränderung" },
      { label: "Auftragsabrechnung", tcode: "KO88", fi: "Abweichungen auf Preisdifferenzen" }
    ]
  },
  {
    id: "r2r",
    title: "Record-to-Report",
    subtitle: "Finanzen: Monatsabschluss bis zum Bericht",
    icon: "📑",
    steps: [
      { label: "Laufende Buchungen erfassen", tcode: "FB50", fi: "Sachkontenbuchungen" },
      { label: "Abschreibungslauf", tcode: "AFAB", fi: "Abschreibungsaufwand an Anlagen" },
      { label: "Fremdwährungsbewertung", tcode: "FAGL_FCV", fi: "Kursdifferenzen" },
      { label: "Innenaufträge abrechnen", tcode: "KO88", fi: "Abrechnung auf Empfänger" },
      { label: "Buchungsperiode schließen", tcode: "OB52", fi: "Keine Buchung" },
      { label: "Bilanz & GuV erstellen", tcode: "F.01", fi: "Bericht" }
    ]
  }
];
