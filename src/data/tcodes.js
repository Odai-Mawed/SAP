/* Transaktionscodes für den Trainer und das Nachschlagewerk. */
export const TCODES = [
  // Allgemein / Navigation
  { code: "SPRO", desc: "Customizing: Einführungsleitfaden (IMG) öffnen", area: "Allgemein" },
  { code: "SU3", desc: "Eigene Benutzerdaten und Parameter pflegen", area: "Allgemein" },
  { code: "SE16N", desc: "Tabelleninhalte anzeigen (Data Browser)", area: "Allgemein" },
  { code: "SBWP", desc: "Business Workplace (Posteingang)", area: "Allgemein" },
  { code: "SQ01", desc: "SAP Query pflegen", area: "Allgemein" },
  { code: "BP", desc: "Geschäftspartner (Kunde/Lieferant) pflegen", area: "Allgemein" },

  // FI
  { code: "FS00", desc: "Sachkonto zentral pflegen", area: "FI" },
  { code: "FB50", desc: "Sachkontenbuchung erfassen", area: "FI" },
  { code: "FB60", desc: "Kreditorenrechnung erfassen", area: "FI" },
  { code: "FB70", desc: "Debitorenrechnung erfassen", area: "FI" },
  { code: "FB03", desc: "Buchhaltungsbeleg anzeigen", area: "FI" },
  { code: "FB08", desc: "Buchhaltungsbeleg stornieren", area: "FI" },
  { code: "F-28", desc: "Zahlungseingang buchen", area: "FI" },
  { code: "F-53", desc: "Zahlungsausgang buchen", area: "FI" },
  { code: "F110", desc: "Automatischer Zahllauf", area: "FI" },
  { code: "F150", desc: "Mahnlauf", area: "FI" },
  { code: "FBL1N", desc: "Kreditoren-Einzelposten anzeigen", area: "FI" },
  { code: "FBL5N", desc: "Debitoren-Einzelposten anzeigen", area: "FI" },
  { code: "FAGLL03", desc: "Sachkonten-Einzelposten anzeigen", area: "FI" },
  { code: "OB52", desc: "Buchungsperioden öffnen und schließen", area: "FI" },
  { code: "AFAB", desc: "Abschreibungslauf buchen", area: "FI" },

  // CO
  { code: "KS01", desc: "Kostenstelle anlegen", area: "CO" },
  { code: "KSB1", desc: "Ist-Einzelposten Kostenstellen", area: "CO" },
  { code: "KP06", desc: "Kostenplanung auf Kostenstellen", area: "CO" },
  { code: "KB11N", desc: "Manuelle Umbuchung von Primärkosten", area: "CO" },
  { code: "KO01", desc: "Innenauftrag anlegen", area: "CO" },
  { code: "KO88", desc: "Auftrag einzeln abrechnen", area: "CO" },
  { code: "KE51", desc: "Profit-Center anlegen", area: "CO" },
  { code: "KE30", desc: "Ergebnisbericht (CO-PA) ausführen", area: "CO" },
  { code: "OKEON", desc: "Kostenstellen-Standardhierarchie pflegen", area: "CO" },

  // MM
  { code: "MM01", desc: "Material anlegen", area: "MM" },
  { code: "MM02", desc: "Material ändern", area: "MM" },
  { code: "MM03", desc: "Material anzeigen", area: "MM" },
  { code: "ME51N", desc: "Bestellanforderung anlegen", area: "MM" },
  { code: "ME21N", desc: "Bestellung anlegen", area: "MM" },
  { code: "ME22N", desc: "Bestellung ändern", area: "MM" },
  { code: "ME23N", desc: "Bestellung anzeigen", area: "MM" },
  { code: "ME29N", desc: "Bestellung freigeben", area: "MM" },
  { code: "ME11", desc: "Einkaufsinfosatz anlegen", area: "MM" },
  { code: "ME01", desc: "Orderbuch pflegen", area: "MM" },
  { code: "ME31K", desc: "Kontrakt anlegen", area: "MM" },
  { code: "MIGO", desc: "Warenbewegung buchen (z. B. Wareneingang)", area: "MM" },
  { code: "MIRO", desc: "Eingangsrechnung mit Bestellbezug erfassen", area: "MM" },
  { code: "MMBE", desc: "Bestandsübersicht eines Materials", area: "MM" },
  { code: "MB52", desc: "Lagerbestände anzeigen", area: "MM" },
  { code: "MB51", desc: "Materialbelegliste", area: "MM" },

  // SD
  { code: "VA11", desc: "Anfrage anlegen", area: "SD" },
  { code: "VA21", desc: "Angebot anlegen", area: "SD" },
  { code: "VA01", desc: "Kundenauftrag anlegen", area: "SD" },
  { code: "VA02", desc: "Kundenauftrag ändern", area: "SD" },
  { code: "VA03", desc: "Kundenauftrag anzeigen", area: "SD" },
  { code: "VL01N", desc: "Auslieferung anlegen", area: "SD" },
  { code: "VL02N", desc: "Auslieferung ändern / Warenausgang buchen", area: "SD" },
  { code: "VF01", desc: "Faktura (Rechnung) anlegen", area: "SD" },
  { code: "VF03", desc: "Faktura anzeigen", area: "SD" },
  { code: "VK11", desc: "Konditionssatz (z. B. Preis) anlegen", area: "SD" },

  // PP
  { code: "CS01", desc: "Stückliste anlegen", area: "PP" },
  { code: "CS11", desc: "Stückliste mehrstufig auflösen", area: "PP" },
  { code: "CR01", desc: "Arbeitsplatz anlegen", area: "PP" },
  { code: "CA01", desc: "Arbeitsplan anlegen", area: "PP" },
  { code: "MD01N", desc: "MRP Live: Bedarfsplanung ausführen", area: "PP" },
  { code: "MD04", desc: "Aktuelle Bedarfs-/Bestandsliste", area: "PP" },
  { code: "MD61", desc: "Planprimärbedarf pflegen", area: "PP" },
  { code: "CO01", desc: "Fertigungsauftrag anlegen", area: "PP" },
  { code: "CO40", desc: "Planauftrag in Fertigungsauftrag umsetzen", area: "PP" },
  { code: "CO11N", desc: "Rückmeldung zum Fertigungsauftrag erfassen", area: "PP" },
  { code: "CK11N", desc: "Produktkalkulation anlegen", area: "PP" },

  // HCM
  { code: "PA30", desc: "Personalstammdaten pflegen", area: "HCM" },
  { code: "PA40", desc: "Personalmaßnahmen durchführen (z. B. Einstellung)", area: "HCM" },
  { code: "PPOME", desc: "Organisationsstruktur pflegen", area: "HCM" },

  // ABAP
  { code: "SE11", desc: "ABAP Dictionary (Tabellen, Datenelemente, Domänen)", area: "ABAP" },
  { code: "SE38", desc: "ABAP-Editor", area: "ABAP" },
  { code: "SE80", desc: "Object Navigator", area: "ABAP" },
  { code: "SE37", desc: "Function Builder (Funktionsbausteine)", area: "ABAP" },
  { code: "SE24", desc: "Class Builder (Klassen)", area: "ABAP" },
  { code: "SE93", desc: "Transaktionscodes pflegen", area: "ABAP" },
  { code: "SM30", desc: "Tabellensichtpflege", area: "ABAP" },
  { code: "ST05", desc: "SQL-Trace (Performance-Analyse)", area: "ABAP" },

  // Basis
  { code: "SU01", desc: "Benutzer pflegen", area: "Basis" },
  { code: "PFCG", desc: "Rollen pflegen (Profilgenerator)", area: "Basis" },
  { code: "SU53", desc: "Letzte fehlgeschlagene Berechtigungsprüfung anzeigen", area: "Basis" },
  { code: "SM37", desc: "Übersicht der Hintergrundjobs", area: "Basis" },
  { code: "SM36", desc: "Hintergrundjob einplanen", area: "Basis" },
  { code: "SM50", desc: "Workprozess-Übersicht", area: "Basis" },
  { code: "SM21", desc: "Systemlog anzeigen", area: "Basis" },
  { code: "ST22", desc: "ABAP-Laufzeitfehler (Dumps) analysieren", area: "Basis" },
  { code: "SM12", desc: "Sperreinträge anzeigen und löschen", area: "Basis" },
  { code: "SM13", desc: "Verbuchungsaufträge anzeigen", area: "Basis" },
  { code: "SM04", desc: "Angemeldete Benutzer anzeigen", area: "Basis" },
  { code: "SM59", desc: "RFC-Verbindungen pflegen", area: "Basis" },
  { code: "STMS", desc: "Transport Management System", area: "Basis" },
  { code: "SE10", desc: "Transport Organizer", area: "Basis" }
];

export const AREAS = ["Alle", ...Array.from(new Set(TCODES.map((t) => t.area)))];
