/* Lerninhalte: Module, Lektionen und Quizfragen.
   answer = Index der richtigen Option (0-basiert). */
export const MODULES = [
  /* ------------------------------------------------------------------ */
  {
    id: "grundlagen",
    title: "SAP-Grundlagen",
    icon: "🏢",
    color: "#0a6ed1",
    level: "Einsteiger",
    description: "Was SAP ist, wie ein ERP-System funktioniert und welche Datenarten es gibt.",
    lessons: [
      {
        id: "was-ist-sap",
        title: "Was ist SAP?",
        minutes: 6,
        content: `
<p><strong>SAP</strong> ist ein Softwareunternehmen aus Walldorf (gegründet 1972) und gleichzeitig der umgangssprachliche Name für seine <strong>ERP-Software</strong>. ERP steht für <em>Enterprise Resource Planning</em> – also die Planung und Steuerung aller Ressourcen eines Unternehmens: Geld, Material, Personal, Maschinen und Zeit.</p>
<h3>Die Grundidee: ein integriertes System</h3>
<p>Statt dass Einkauf, Lager, Vertrieb und Buchhaltung jeweils eigene Programme verwenden, arbeiten in SAP alle Abteilungen auf <strong>einer gemeinsamen Datenbasis</strong>. Bucht das Lager einen Wareneingang, entsteht automatisch auch ein Buchhaltungsbeleg. Das nennt man <strong>Integration</strong>.</p>
<div class="tip"><strong>Beispiel:</strong> Ein Kunde bestellt 10 Fahrräder. Der Vertrieb erfasst den Auftrag, das System prüft die Verfügbarkeit im Lager, die Produktion plant fehlende Teile, beim Versand sinkt der Bestand, und mit der Rechnung entsteht automatisch eine Forderung in der Finanzbuchhaltung.</div>
<h3>Die wichtigsten Produktgenerationen</h3>
<table>
<tr><th>Produkt</th><th>Zeitraum</th><th>Merkmal</th></tr>
<tr><td>R/2</td><td>ab 1979</td><td>Großrechner (Mainframe)</td></tr>
<tr><td>R/3</td><td>ab 1992</td><td>Client-Server-Architektur, 3 Schichten</td></tr>
<tr><td>SAP ECC 6.0</td><td>ab 2005</td><td>Teil der Business Suite, läuft auf diversen Datenbanken</td></tr>
<tr><td>SAP S/4HANA</td><td>ab 2015</td><td>Läuft nur auf der In-Memory-Datenbank SAP HANA, Fiori-Oberfläche</td></tr>
</table>
<p>Die Standardwartung für ECC endet 2027 – deshalb migrieren aktuell sehr viele Unternehmen auf <strong>S/4HANA</strong>.</p>
<h3>Module</h3>
<p>SAP ist fachlich in <strong>Module</strong> gegliedert, z. B. <span class="tag">FI</span> Finanzwesen, <span class="tag">CO</span> Controlling, <span class="tag">MM</span> Materialwirtschaft, <span class="tag">SD</span> Vertrieb, <span class="tag">PP</span> Produktionsplanung, <span class="tag">HCM</span> Personalwirtschaft. Die Module sind eng miteinander verzahnt.</p>`,
        quiz: [
          { q: "Wofür steht die Abkürzung ERP?", options: ["Enterprise Resource Planning", "External Reporting Process", "Electronic Retail Platform", "Enterprise Risk Protection"], answer: 0, explain: "ERP = Enterprise Resource Planning, die Planung aller Unternehmensressourcen." },
          { q: "Was ist der zentrale Vorteil eines integrierten ERP-Systems?", options: ["Jede Abteilung hat ihre eigene Datenbank", "Alle Bereiche arbeiten auf einer gemeinsamen Datenbasis", "Es benötigt keine Benutzer", "Es funktioniert nur offline"], answer: 1, explain: "Integration bedeutet: Ein Vorgang (z. B. Wareneingang) wirkt sich automatisch auf alle betroffenen Bereiche aus." },
          { q: "Auf welcher Datenbank läuft SAP S/4HANA?", options: ["Oracle", "Microsoft SQL Server", "SAP HANA", "Jede beliebige Datenbank"], answer: 2, explain: "S/4HANA läuft ausschließlich auf der In-Memory-Datenbank SAP HANA." },
          { q: "Welches Modul ist für den Vertrieb zuständig?", options: ["MM", "SD", "PP", "FI"], answer: 1, explain: "SD = Sales and Distribution (Vertrieb)." }
        ]
      },
      {
        id: "systemlandschaft",
        title: "Systemlandschaft & Mandanten",
        minutes: 5,
        content: `
<h3>Die Drei-System-Landschaft</h3>
<p>Unternehmen betreiben SAP fast immer in mehreren Systemen, damit Änderungen nicht direkt im laufenden Betrieb gemacht werden:</p>
<div class="flow"><span>DEV<br><small>Entwicklung</small></span><b>→</b><span>QAS<br><small>Qualitätssicherung / Test</small></span><b>→</b><span>PRD<br><small>Produktion</small></span></div>
<ul>
<li><strong>Entwicklungssystem (DEV):</strong> Hier wird customized (eingestellt) und programmiert.</li>
<li><strong>Qualitätssicherungssystem (QAS):</strong> Hier wird getestet.</li>
<li><strong>Produktivsystem (PRD):</strong> Hier arbeiten die Anwender mit echten Daten.</li>
</ul>
<p>Änderungen werden über <strong>Transportaufträge</strong> von System zu System übertragen (Transaktion <code class="tc">STMS</code>).</p>
<h3>Der Mandant</h3>
<p>Ein <strong>Mandant</strong> (engl. <em>Client</em>) ist die oberste organisatorische Einheit in SAP – eine in sich abgeschlossene Einheit mit eigenen Stammdaten, Bewegungsdaten und Benutzern. Mandanten werden durch eine dreistellige Nummer identifiziert, z. B. <code>100</code>.</p>
<div class="tip">Beim Anmelden gibst du immer <strong>Mandant, Benutzer, Kennwort und Sprache</strong> an. Ein Benutzer existiert immer nur in einem Mandanten.</div>
<p>Typische Mandanten: <code>000</code> (SAP-Auslieferungsmandant, nicht anfassen!), <code>001</code> (Kopie von 000), <code>066</code> (Early Watch, ältere Releases), sowie eigene Mandanten wie <code>100</code> für Customizing oder <code>200</code> für Tests.</p>
<h3>Mandantenabhängig vs. -unabhängig</h3>
<p>Die meisten Daten (z. B. Kunden, Materialien, Buchungen) sind <strong>mandantenabhängig</strong>. Programme (ABAP-Code) und viele technische Einstellungen sind <strong>mandantenübergreifend</strong> – sie gelten für alle Mandanten im System.</p>`,
        quiz: [
          { q: "In welcher Reihenfolge durchlaufen Änderungen typischerweise die Systemlandschaft?", options: ["PRD → QAS → DEV", "DEV → QAS → PRD", "QAS → DEV → PRD", "DEV → PRD → QAS"], answer: 1, explain: "Entwicklung → Test → Produktion." },
          { q: "Was ist ein Mandant?", options: ["Ein externer Berater", "Eine abgeschlossene organisatorische Einheit mit eigenen Daten und Benutzern", "Ein Datenbanktyp", "Ein ABAP-Programm"], answer: 1, explain: "Der Mandant ist die höchste Organisationseinheit im SAP-System." },
          { q: "Womit werden Änderungen zwischen Systemen übertragen?", options: ["Per E-Mail", "Über Transportaufträge", "Durch manuelles Abtippen", "Gar nicht"], answer: 1, explain: "Transportaufträge (Transport Management System, STMS) bringen Änderungen von DEV nach QAS und PRD." },
          { q: "Welcher Mandant ist der SAP-Auslieferungsmandant?", options: ["000", "100", "800", "999"], answer: 0, explain: "Mandant 000 ist der Referenzmandant von SAP und sollte nicht verändert werden." }
        ]
      },
      {
        id: "datenarten",
        title: "Stamm-, Bewegungs- und Customizingdaten",
        minutes: 5,
        content: `
<p>In SAP unterscheidet man drei grundlegende Datenarten. Dieses Verständnis ist die Basis für alles Weitere.</p>
<h3>1. Customizing (Konfiguration)</h3>
<p>Einstellungen, mit denen SAP an das Unternehmen angepasst wird – z. B. welche Buchungskreise, Werke, Belegarten oder Zahlungsbedingungen es gibt. Customizing erfolgt im <strong>Einführungsleitfaden (IMG)</strong> über die Transaktion <code class="tc">SPRO</code>. Es wird selten geändert und per Transport verteilt.</p>
<h3>2. Stammdaten</h3>
<p>Langfristig gültige Daten, die immer wieder verwendet werden:</p>
<ul>
<li>Geschäftspartner (Kunden, Lieferanten) – Transaktion <code class="tc">BP</code></li>
<li>Materialstamm – <code class="tc">MM01</code></li>
<li>Sachkonten – <code class="tc">FS00</code></li>
<li>Kostenstellen – <code class="tc">KS01</code></li>
</ul>
<h3>3. Bewegungsdaten</h3>
<p>Daten, die bei jedem Geschäftsvorfall neu entstehen und auf Stammdaten verweisen: Bestellungen, Kundenaufträge, Lieferungen, Rechnungen, Buchungsbelege. Sie werden in <strong>Belegen</strong> mit einer Belegnummer gespeichert.</p>
<div class="tip"><strong>Merkhilfe:</strong> Customizing = <em>Spielregeln</em>, Stammdaten = <em>Spielfiguren</em>, Bewegungsdaten = <em>Spielzüge</em>.</div>
<h3>Das Belegprinzip</h3>
<p>Jede Buchung in SAP erzeugt einen Beleg. Belege können nicht einfach gelöscht werden – Fehler werden durch <strong>Storno</strong> (Gegenbuchung) korrigiert. So bleibt alles revisionssicher nachvollziehbar.</p>`,
        quiz: [
          { q: "Ein Kundenauftrag ist ein Beispiel für…", options: ["Stammdaten", "Bewegungsdaten", "Customizing", "Systemdaten"], answer: 1, explain: "Kundenaufträge entstehen bei jedem Geschäftsvorfall neu – das sind Bewegungsdaten." },
          { q: "Mit welcher Transaktion öffnest du den Einführungsleitfaden (IMG)?", options: ["SE38", "SPRO", "SU01", "MM01"], answer: 1, explain: "SPRO öffnet das Customizing über den Einführungsleitfaden." },
          { q: "Wie werden fehlerhafte Buchungen in SAP korrigiert?", options: ["Beleg löschen", "Durch Storno (Gegenbuchung)", "Datenbank zurücksetzen", "Gar nicht"], answer: 1, explain: "Belege bleiben erhalten; ein Stornobeleg hebt die Wirkung auf." },
          { q: "Welche dieser Daten sind Stammdaten?", options: ["Eine Lieferung", "Eine Rechnung", "Ein Materialstamm", "Ein Wareneingang"], answer: 2, explain: "Der Materialstamm ist langfristig gültig und wird immer wieder verwendet." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "navigation",
    title: "Navigation: SAP GUI & Fiori",
    icon: "🧭",
    color: "#5b738b",
    level: "Einsteiger",
    description: "Sicher durch SAP bewegen: Befehlsfeld, Transaktionen, Tastenkürzel und Fiori Launchpad.",
    lessons: [
      {
        id: "gui-aufbau",
        title: "Aufbau des SAP GUI",
        minutes: 5,
        content: `
<p>Das <strong>SAP GUI</strong> (Graphical User Interface) ist die klassische Oberfläche. Jedes Fenster ist ähnlich aufgebaut:</p>
<div class="gui-mock">
  <div class="gm-row gm-menu">Menüleiste: Menü · Bearbeiten · Springen · System · Hilfe</div>
  <div class="gm-row gm-std"><span class="gm-cmd">▸ /nME21N ▾</span> 💾 ⬅ ⤴ ✖ 🖨 🔍 Standard-Symbolleiste</div>
  <div class="gm-row gm-title">Titelleiste: „Bestellung anlegen“</div>
  <div class="gm-row gm-app">Anwendungsfunktionsleiste (transaktionsspezifische Buttons)</div>
  <div class="gm-row gm-body">Arbeitsbereich mit Eingabefeldern</div>
  <div class="gm-row gm-status">Statusleiste: Meldungen ✅ ⚠️ ❌ · System · Mandant</div>
</div>
<ul>
<li><strong>Befehlsfeld:</strong> Links in der Standard-Symbolleiste. Hier gibst du Transaktionscodes ein.</li>
<li><strong>Statusleiste:</strong> Zeigt Erfolgs-, Warn- und Fehlermeldungen. Unbedingt immer lesen!</li>
<li><strong>SAP Easy Access Menü:</strong> Der Startbildschirm mit einem Menübaum aller Transaktionen. Unter „Favoriten“ kannst du häufig genutzte Transaktionen ablegen.</li>
</ul>
<h3>Modi (Sessions)</h3>
<p>Du kannst bis zu 6 (je nach Einstellung mehr) parallele Fenster – sogenannte <strong>Modi</strong> – öffnen und so gleichzeitig in mehreren Transaktionen arbeiten.</p>
<h3>Meldungstypen</h3>
<table>
<tr><th>Typ</th><th>Bedeutung</th></tr>
<tr><td>S – Success</td><td>Erfolg, z. B. „Bestellung 4500000123 angelegt“</td></tr>
<tr><td>W – Warning</td><td>Warnung, mit Enter bestätigen und weiterarbeiten</td></tr>
<tr><td>E – Error</td><td>Fehler, muss behoben werden</td></tr>
<tr><td>I – Info</td><td>Hinweis in einem Popup</td></tr>
<tr><td>A – Abort</td><td>Abbruch der Transaktion</td></tr>
</table>`,
        quiz: [
          { q: "Wo gibst du einen Transaktionscode ein?", options: ["In der Statusleiste", "Im Befehlsfeld", "In der Titelleiste", "Im Hilfe-Menü"], answer: 1, explain: "Das Befehlsfeld befindet sich in der Standard-Symbolleiste." },
          { q: "Wo erscheinen Erfolgs- und Fehlermeldungen?", options: ["In der Statusleiste", "In der Menüleiste", "Im Befehlsfeld", "Gar nicht"], answer: 0, explain: "Die Statusleiste am unteren Rand zeigt Meldungen an." },
          { q: "Was bedeutet ein Meldungstyp „W“?", options: ["Fehler", "Warnung – man kann mit Enter fortfahren", "Abbruch", "Erfolg"], answer: 1, explain: "Warnungen kann man bestätigen; Fehler (E) müssen behoben werden." },
          { q: "Was ist ein „Modus“ im SAP GUI?", options: ["Ein Berechtigungsprofil", "Ein paralleles SAP-Fenster", "Ein Buchungskreis", "Ein Druckformat"], answer: 1, explain: "Mehrere Modi erlauben das parallele Arbeiten in verschiedenen Transaktionen." }
        ]
      },
      {
        id: "befehlsfeld",
        title: "Befehlsfeld & Transaktionscodes",
        minutes: 6,
        content: `
<p>Ein <strong>Transaktionscode</strong> (T-Code) ist ein Kürzel, das direkt eine Funktion aufruft, z. B. <code class="tc">VA01</code> für „Kundenauftrag anlegen“. Profis navigieren fast nur über T-Codes.</p>
<h3>Das Namensschema</h3>
<p>Viele klassische T-Codes folgen einem Muster: <strong>01 = Anlegen, 02 = Ändern, 03 = Anzeigen</strong>.</p>
<table>
<tr><th>Objekt</th><th>Anlegen</th><th>Ändern</th><th>Anzeigen</th></tr>
<tr><td>Material</td><td><code class="tc">MM01</code></td><td><code class="tc">MM02</code></td><td><code class="tc">MM03</code></td></tr>
<tr><td>Kundenauftrag</td><td><code class="tc">VA01</code></td><td><code class="tc">VA02</code></td><td><code class="tc">VA03</code></td></tr>
<tr><td>Bestellung</td><td><code class="tc">ME21N</code></td><td><code class="tc">ME22N</code></td><td><code class="tc">ME23N</code></td></tr>
<tr><td>Kostenstelle</td><td><code class="tc">KS01</code></td><td><code class="tc">KS02</code></td><td><code class="tc">KS03</code></td></tr>
</table>
<p>Das <strong>N</strong> am Ende (z. B. ME21<strong>N</strong>) steht für die „neue“ Enjoy-Variante einer Transaktion.</p>
<h3>Steuerbefehle im Befehlsfeld</h3>
<table>
<tr><th>Eingabe</th><th>Wirkung</th></tr>
<tr><td><code>/nVA01</code></td><td>Aktuelle Transaktion verlassen und VA01 im <strong>selben</strong> Fenster starten</td></tr>
<tr><td><code>/oVA01</code></td><td>VA01 in einem <strong>neuen</strong> Fenster (Modus) öffnen</td></tr>
<tr><td><code>/n</code></td><td>Aktuelle Transaktion beenden, zurück zum Easy Access</td></tr>
<tr><td><code>/o</code></td><td>Liste der offenen Modi anzeigen</td></tr>
<tr><td><code>/i</code></td><td>Aktuellen Modus schließen</td></tr>
<tr><td><code>/nend</code></td><td>Abmelden mit Sicherheitsabfrage</td></tr>
<tr><td><code>/nex</code></td><td>Sofort abmelden <strong>ohne</strong> Rückfrage (Achtung: Ungesichertes geht verloren!)</td></tr>
</table>
<div class="tip">Ohne <code>/n</code> funktioniert die Eingabe eines T-Codes nur auf dem Easy-Access-Startbild. Gewöhne dir daher <code>/n</code> an!</div>
<p>Übe das jetzt im <a href="#tcodes">Transaktions-Trainer</a>!</p>`,
        quiz: [
          { q: "Was bewirkt die Eingabe /oMM03?", options: ["Öffnet MM03 im selben Fenster", "Öffnet MM03 in einem neuen Modus", "Löscht ein Material", "Meldet den Benutzer ab"], answer: 1, explain: "/o öffnet die Transaktion in einem neuen Fenster (Modus)." },
          { q: "Welche Ziffernendung steht klassisch für „Anzeigen“?", options: ["01", "02", "03", "04"], answer: 2, explain: "01 = Anlegen, 02 = Ändern, 03 = Anzeigen." },
          { q: "Wie meldest du dich sofort ohne Rückfrage ab?", options: ["/nend", "/nex", "/i", "/o"], answer: 1, explain: "/nex beendet alle Modi sofort – ungesicherte Daten gehen verloren." },
          { q: "Was bedeutet /n allein im Befehlsfeld?", options: ["Neuen Modus öffnen", "Aktuelle Transaktion beenden", "Hilfe anzeigen", "Drucken"], answer: 1, explain: "/n verlässt die aktuelle Transaktion ohne zu speichern." }
        ]
      },
      {
        id: "tastenkuerzel",
        title: "Tastenkürzel, F1- und F4-Hilfe",
        minutes: 4,
        content: `
<h3>Die wichtigsten Funktionstasten</h3>
<table>
<tr><th>Taste</th><th>Funktion</th></tr>
<tr><td><kbd>F1</kbd></td><td>Feldhilfe: Erklärung zum Feld, in dem der Cursor steht (inkl. „Technische Info“ mit Tabellen- und Feldname)</td></tr>
<tr><td><kbd>F4</kbd></td><td>Wertehilfe (Suchhilfe): Liste möglicher Eingabewerte</td></tr>
<tr><td><kbd>F3</kbd></td><td>Zurück</td></tr>
<tr><td><kbd>Umschalt</kbd>+<kbd>F3</kbd></td><td>Beenden</td></tr>
<tr><td><kbd>F12</kbd></td><td>Abbrechen</td></tr>
<tr><td><kbd>F8</kbd></td><td>Ausführen (z. B. Report starten)</td></tr>
<tr><td><kbd>Strg</kbd>+<kbd>S</kbd></td><td>Sichern</td></tr>
<tr><td><kbd>Enter</kbd></td><td>Eingaben prüfen / weiter</td></tr>
</table>
<h3>Technische Info – der Profi-Trick</h3>
<p>Mit <kbd>F1</kbd> und dann dem Button <strong>„Technische Info“</strong> siehst du, in welcher <strong>Tabelle</strong> und welchem <strong>Feld</strong> ein Wert gespeichert ist. Mit diesem Wissen kannst du dann z. B. in <code class="tc">SE16N</code> direkt Tabellen auswerten.</p>
<h3>Pflichtfelder</h3>
<p>Felder mit einem <strong>Häkchen-Symbol</strong> (☑) sind Mussfelder. Ohne Eingabe kommt eine Fehlermeldung.</p>
<h3>Benutzerparameter</h3>
<p>Über <code class="tc">SU3</code> („Eigene Daten“) kannst du Vorschlagswerte setzen, z. B. Parameter-ID <code>BUK</code> für deinen Buchungskreis oder <code>WRK</code> für dein Werk. Dann sind diese Felder automatisch vorbelegt.</p>`,
        quiz: [
          { q: "Welche Taste öffnet die Wertehilfe (Liste möglicher Werte)?", options: ["F1", "F3", "F4", "F8"], answer: 2, explain: "F4 = Wertehilfe, F1 = Feldhilfe." },
          { q: "Wie findest du heraus, in welcher Tabelle ein Feld gespeichert ist?", options: ["F8 drücken", "F1 → Technische Info", "Strg+S", "/nex eingeben"], answer: 1, explain: "Die technische Info in der F1-Hilfe zeigt Tabelle und Feldname." },
          { q: "Welche Taste führt einen Report aus?", options: ["F8", "F12", "F4", "F1"], answer: 0, explain: "F8 = Ausführen." },
          { q: "Mit welcher Transaktion pflegst du eigene Benutzerparameter?", options: ["SU01", "SU3", "PFCG", "SE11"], answer: 1, explain: "SU3 = Eigene Benutzerdaten pflegen (inkl. Parameter-IDs)." }
        ]
      },
      {
        id: "fiori",
        title: "SAP Fiori Launchpad",
        minutes: 4,
        content: `
<p><strong>SAP Fiori</strong> ist die moderne, browserbasierte Benutzeroberfläche von SAP – rollenbasiert, responsiv (auch auf Tablet und Smartphone) und deutlich intuitiver als das SAP GUI.</p>
<h3>Das Fiori Launchpad</h3>
<p>Das <strong>Launchpad</strong> ist der zentrale Einstiegspunkt. Es zeigt <strong>Kacheln (Tiles)</strong>, die jeweils eine App öffnen. Welche Kacheln ein Benutzer sieht, hängt von seinen <strong>Rollen</strong> ab (Business Catalogs, Business Groups / Spaces &amp; Pages).</p>
<h3>App-Typen</h3>
<ul>
<li><strong>Transaktionale Apps:</strong> Daten anlegen/ändern, z. B. „Bestellung anlegen“.</li>
<li><strong>Analytische Apps:</strong> Kennzahlen und Auswertungen in Echtzeit.</li>
<li><strong>Infoblätter (Fact Sheets):</strong> Übersicht zu einem Objekt, z. B. einem Kunden.</li>
<li><strong>SAP GUI for HTML:</strong> Klassische Transaktionen im Browser, ebenfalls als Kachel startbar.</li>
</ul>
<h3>Fiori Design-Prinzipien</h3>
<p>Rollenbasiert · Adaptiv · Einfach · Kohärent · Ansprechend</p>
<div class="tip">Die <strong>SAP Fiori Apps Reference Library</strong> (im Internet frei verfügbar) listet alle Fiori-Apps samt App-ID und zugehöriger klassischer Transaktion.</div>
<p>Auch in Fiori kannst du klassische T-Codes über die Suche aufrufen. In S/4HANA ersetzen jedoch viele Apps alte Transaktionen.</p>`,
        quiz: [
          { q: "Was ist das SAP Fiori Launchpad?", options: ["Ein Datenbanktool", "Der zentrale, kachelbasierte Einstiegspunkt für Fiori-Apps", "Ein Transportsystem", "Ein ABAP-Editor"], answer: 1, explain: "Das Launchpad zeigt die Apps als Kacheln an." },
          { q: "Wovon hängt ab, welche Kacheln ein Benutzer sieht?", options: ["Von der Bildschirmgröße", "Von seinen Rollen", "Vom Wochentag", "Vom Browser"], answer: 1, explain: "Fiori ist rollenbasiert: Rollen bestimmen die verfügbaren Apps." },
          { q: "Welches Merkmal trifft auf Fiori zu?", options: ["Nur auf Windows nutzbar", "Responsiv – auch mobil nutzbar", "Nur für Entwickler", "Ersetzt die Datenbank"], answer: 1, explain: "Fiori läuft im Browser und passt sich verschiedenen Geräten an." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "organisation",
    title: "Organisationsstrukturen",
    icon: "🏗️",
    color: "#925ace",
    level: "Einsteiger",
    description: "Mandant, Buchungskreis, Werk, Lagerort, Verkaufs- und Einkaufsorganisation.",
    lessons: [
      {
        id: "org-grundlagen",
        title: "Mandant, Buchungskreis, Werk & Lagerort",
        minutes: 6,
        content: `
<p><strong>Organisationseinheiten</strong> bilden die rechtliche und organisatorische Struktur eines Unternehmens in SAP ab. Sie werden im Customizing angelegt und sind das Gerüst für alle Prozesse.</p>
<div class="hierarchy">
  <div class="h-node h1">Mandant <small>z. B. 100 – der gesamte Konzern</small></div>
  <div class="h-node h2">Buchungskreis <small>z. B. 1000 – rechtlich selbständige Firma (GmbH)</small></div>
  <div class="h-node h3">Werk <small>z. B. 1010 – Produktionsstandort, Lager, Niederlassung</small></div>
  <div class="h-node h4">Lagerort <small>z. B. 0001 – physischer Bereich im Werk</small></div>
</div>
<h3>Buchungskreis (Company Code)</h3>
<p>Die kleinste Einheit, für die eine <strong>vollständige, eigenständige Buchhaltung</strong> mit Bilanz und GuV erstellt wird. Er hat eine Währung (Hauswährung) und ein Land. Ein Buchungskreis wird durch einen <strong>vierstelligen</strong> Schlüssel identifiziert.</p>
<h3>Kostenrechnungskreis (Controlling Area)</h3>
<p>Organisationseinheit für das interne Rechnungswesen (CO). Einem Kostenrechnungskreis können ein oder mehrere Buchungskreise zugeordnet sein.</p>
<h3>Werk (Plant)</h3>
<p>Eine Betriebsstätte, in der produziert, gelagert oder Leistungen erbracht werden. Ein Werk ist <strong>genau einem</strong> Buchungskreis zugeordnet. Bestände werden auf Werksebene bewertet.</p>
<h3>Lagerort (Storage Location)</h3>
<p>Unterteilung eines Werkes, an der Bestände <strong>mengenmäßig</strong> geführt werden, z. B. Rohstofflager, Fertigwarenlager.</p>
<div class="tip">Merke: Ein Buchungskreis kann viele Werke haben – aber ein Werk gehört immer zu genau einem Buchungskreis.</div>`,
        quiz: [
          { q: "Was ist ein Buchungskreis?", options: ["Ein Lagerplatz", "Die kleinste Einheit mit eigenständiger Bilanz und GuV", "Ein Benutzer", "Eine Kostenstelle"], answer: 1, explain: "Der Buchungskreis entspricht meist einer rechtlich selbständigen Gesellschaft." },
          { q: "Wie viele Buchungskreise kann ein Werk haben?", options: ["Beliebig viele", "Genau einen", "Keinen", "Zwei"], answer: 1, explain: "Ein Werk ist genau einem Buchungskreis zugeordnet." },
          { q: "Was ist die oberste Organisationseinheit?", options: ["Werk", "Buchungskreis", "Mandant", "Lagerort"], answer: 2, explain: "Der Mandant steht ganz oben in der Hierarchie." },
          { q: "Auf welcher Ebene werden Bestände mengenmäßig detailliert geführt?", options: ["Lagerort", "Mandant", "Kostenrechnungskreis", "Buchungskreis"], answer: 0, explain: "Der Lagerort unterteilt das Werk und führt Bestände mengenmäßig." }
        ]
      },
      {
        id: "org-logistik",
        title: "Vertriebs- & Einkaufsorganisation",
        minutes: 5,
        content: `
<h3>Vertrieb (SD)</h3>
<p>Im Vertrieb ist der <strong>Vertriebsbereich</strong> entscheidend. Er ist eine Kombination aus drei Einheiten:</p>
<div class="flow"><span>Verkaufsorganisation<br><small>verkauft &amp; haftet, z. B. 1010</small></span><b>+</b><span>Vertriebsweg<br><small>wie? z. B. Großhandel, Online</small></span><b>+</b><span>Sparte<br><small>welche Produktgruppe?</small></span><b>=</b><span>Vertriebsbereich</span></div>
<ul>
<li><strong>Verkaufsorganisation:</strong> Verantwortlich für den Verkauf, ist genau einem Buchungskreis zugeordnet.</li>
<li><strong>Vertriebsweg:</strong> Der Weg zum Kunden, z. B. 10 = Direktvertrieb, 20 = Großhandel.</li>
<li><strong>Sparte:</strong> Gruppierung von Produkten, z. B. Fahrräder, Ersatzteile.</li>
</ul>
<p>Außerdem gibt es die <strong>Versandstelle</strong> (wo wird verschickt?) sowie <strong>Verkaufsbüro</strong> und <strong>Verkäufergruppe</strong> (interne Vertriebsorganisation).</p>
<h3>Einkauf (MM)</h3>
<ul>
<li><strong>Einkaufsorganisation:</strong> Verhandelt Konditionen mit Lieferanten und ist rechtlich verantwortlich für den Einkauf. Kann werksübergreifend oder sogar buchungskreisübergreifend arbeiten.</li>
<li><strong>Einkäufergruppe:</strong> Ein Einkäufer oder eine Gruppe von Einkäufern, die für bestimmte Materialien zuständig sind. Sie ist <em>nicht</em> an eine Einkaufsorganisation gebunden.</li>
</ul>
<div class="tip">Kundenstammdaten im Vertrieb werden pro <strong>Vertriebsbereich</strong> gepflegt – derselbe Kunde kann also im Großhandel andere Konditionen haben als im Online-Shop.</div>`,
        quiz: [
          { q: "Aus welchen drei Einheiten besteht der Vertriebsbereich?", options: ["Werk, Lagerort, Mandant", "Verkaufsorganisation, Vertriebsweg, Sparte", "Buchungskreis, Werk, Sparte", "Einkaufsorg., Werk, Vertriebsweg"], answer: 1, explain: "Vertriebsbereich = VKORG + VTWEG + SPART." },
          { q: "Was beschreibt der Vertriebsweg?", options: ["Die Lieferroute des LKWs", "Den Weg, über den Produkte den Kunden erreichen (z. B. Großhandel)", "Die Buchungsperiode", "Die Produktgruppe"], answer: 1, explain: "Vertriebsweg = Absatzkanal wie Direktvertrieb oder Großhandel." },
          { q: "Wer verhandelt Konditionen mit Lieferanten?", options: ["Die Sparte", "Die Einkaufsorganisation", "Die Versandstelle", "Der Lagerort"], answer: 1, explain: "Die Einkaufsorganisation ist für Beschaffungskonditionen zuständig." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "fi",
    title: "Finanzwesen (FI)",
    icon: "💶",
    color: "#188918",
    level: "Fortgeschritten",
    description: "Hauptbuch, Debitoren, Kreditoren, Zahlungen und Periodenabschluss.",
    lessons: [
      {
        id: "hauptbuch",
        title: "Hauptbuch & Kontenplan",
        minutes: 6,
        content: `
<p>Das Modul <strong>FI (Financial Accounting)</strong> bildet das externe Rechnungswesen ab – alles, was für Bilanz, GuV und Steuern nach HGB, IFRS oder US-GAAP gebraucht wird.</p>
<h3>Teilbereiche von FI</h3>
<ul>
<li><strong>FI-GL:</strong> Hauptbuchhaltung (General Ledger)</li>
<li><strong>FI-AP:</strong> Kreditorenbuchhaltung (Accounts Payable) – Lieferanten</li>
<li><strong>FI-AR:</strong> Debitorenbuchhaltung (Accounts Receivable) – Kunden</li>
<li><strong>FI-AA:</strong> Anlagenbuchhaltung (Asset Accounting)</li>
<li><strong>FI-BL:</strong> Bankbuchhaltung</li>
</ul>
<h3>Kontenplan</h3>
<p>Der <strong>Kontenplan</strong> ist ein Verzeichnis aller Sachkonten (z. B. angelehnt an SKR03/SKR04 oder ein Konzern-Kontenplan). Er wird dem Buchungskreis zugeordnet. Sachkonten werden mit <code class="tc">FS00</code> gepflegt – mit einem Kontenplanteil (Tabelle <code>SKA1</code>) und einem Buchungskreisteil (<code>SKB1</code>).</p>
<h3>Doppelte Buchführung</h3>
<p>Jede Buchung hat mindestens eine <strong>Soll-</strong> und eine <strong>Haben-</strong>Seite, die Summe muss null ergeben. Ein Beleg mit Saldo ≠ 0 kann nicht gebucht werden.</p>
<h3>Buchungsschlüssel</h3>
<p>Ein zweistelliger Buchungsschlüssel steuert Kontoart und Soll/Haben, z. B.:</p>
<table>
<tr><th>Schlüssel</th><th>Bedeutung</th></tr>
<tr><td>40 / 50</td><td>Sachkonto Soll / Haben</td></tr>
<tr><td>01 / 11</td><td>Debitor Rechnung (Soll) / Gutschrift (Haben)</td></tr>
<tr><td>31 / 21</td><td>Kreditor Rechnung (Haben) / Gutschrift (Soll)</td></tr>
</table>
<h3>Wichtige Transaktionen</h3>
<p><code class="tc">FB50</code> Sachkontenbuchung · <code class="tc">FB03</code> Beleg anzeigen · <code class="tc">FB08</code> Beleg stornieren · <code class="tc">FAGLL03</code> Sachkonten-Einzelposten · <code class="tc">FS00</code> Sachkonto pflegen</p>
<p>Ein FI-Beleg besteht aus einem <strong>Belegkopf</strong> (Tabelle <code>BKPF</code>) und <strong>Positionen</strong> (<code>BSEG</code>). In S/4HANA landen alle Positionen zusätzlich im <strong>Universal Journal</strong> (<code>ACDOCA</code>).</p>`,
        quiz: [
          { q: "Welcher FI-Teilbereich behandelt Lieferanten?", options: ["FI-AR", "FI-AP", "FI-AA", "FI-GL"], answer: 1, explain: "AP = Accounts Payable = Kreditorenbuchhaltung." },
          { q: "Mit welcher Transaktion pflegst du Sachkonten zentral?", options: ["FS00", "FB50", "XK01", "KS01"], answer: 0, explain: "FS00 = Sachkonto zentral pflegen." },
          { q: "Welcher Buchungsschlüssel steht für eine Sachkontenbuchung im Soll?", options: ["01", "31", "40", "50"], answer: 2, explain: "40 = Soll Sachkonto, 50 = Haben Sachkonto." },
          { q: "In welchen Tabellen werden klassisch Belegkopf und -positionen gespeichert?", options: ["MARA / MARC", "BKPF / BSEG", "VBAK / VBAP", "EKKO / EKPO"], answer: 1, explain: "BKPF = Belegkopf, BSEG = Belegsegment (Positionen) in FI." }
        ]
      },
      {
        id: "debkred",
        title: "Kreditoren, Debitoren & Zahlungen",
        minutes: 6,
        content: `
<h3>Nebenbücher</h3>
<p>Debitoren (Kunden) und Kreditoren (Lieferanten) werden in <strong>Nebenbüchern</strong> geführt. Jedes Debitoren- bzw. Kreditorenkonto ist über ein <strong>Abstimmkonto</strong> mit dem Hauptbuch verbunden. Bucht man auf einen Kreditor, wird automatisch auch das Abstimmkonto „Verbindlichkeiten aus L+L“ fortgeschrieben.</p>
<h3>Kreditorenbuchhaltung (AP)</h3>
<table>
<tr><th>Vorgang</th><th>T-Code</th></tr>
<tr><td>Kreditorenrechnung erfassen (ohne Bestellbezug)</td><td><code class="tc">FB60</code></td></tr>
<tr><td>Eingangsrechnung mit Bestellbezug (Logistik)</td><td><code class="tc">MIRO</code></td></tr>
<tr><td>Zahlungsausgang manuell</td><td><code class="tc">F-53</code></td></tr>
<tr><td>Automatischer Zahllauf</td><td><code class="tc">F110</code></td></tr>
<tr><td>Kreditoren-Einzelposten</td><td><code class="tc">FBL1N</code></td></tr>
</table>
<h3>Debitorenbuchhaltung (AR)</h3>
<table>
<tr><th>Vorgang</th><th>T-Code</th></tr>
<tr><td>Debitorenrechnung erfassen</td><td><code class="tc">FB70</code></td></tr>
<tr><td>Zahlungseingang buchen</td><td><code class="tc">F-28</code></td></tr>
<tr><td>Mahnlauf</td><td><code class="tc">F150</code></td></tr>
<tr><td>Debitoren-Einzelposten</td><td><code class="tc">FBL5N</code></td></tr>
</table>
<h3>Offene Posten &amp; Ausgleich</h3>
<p>Eine Rechnung ist ein <strong>offener Posten</strong>. Wird sie bezahlt, werden Rechnung und Zahlung miteinander <strong>ausgeglichen</strong> – beide Posten erhalten einen Ausgleichsbeleg und sind danach „ausgeglichen“.</p>
<h3>Der Zahllauf F110</h3>
<p>Der automatische Zahllauf läuft in Schritten: <strong>Parameter pflegen → Vorschlagslauf → Vorschlag prüfen/bearbeiten → Zahllauf → Zahlungsträger (z. B. SEPA-XML) erstellen</strong>.</p>
<div class="tip">In S/4HANA werden Kunden und Lieferanten als <strong>Geschäftspartner</strong> über die Transaktion <code class="tc">BP</code> angelegt. Die alten Transaktionen XK01/XD01 leiten auf BP um.</div>`,
        quiz: [
          { q: "Welche Transaktion startet den automatischen Zahllauf?", options: ["F-28", "F110", "FB60", "FBL5N"], answer: 1, explain: "F110 = Automatischer Zahlungsverkehr." },
          { q: "Was verbindet ein Debitorenkonto mit dem Hauptbuch?", options: ["Das Abstimmkonto", "Die Kostenstelle", "Der Mandant", "Der Lagerort"], answer: 0, explain: "Das Abstimmkonto wird automatisch mitgebucht und stellt die Verbindung zum Hauptbuch her." },
          { q: "Mit welcher Transaktion buchst du einen Zahlungseingang vom Kunden?", options: ["F-53", "F-28", "MIRO", "FB60"], answer: 1, explain: "F-28 = Zahlungseingang buchen, F-53 = Zahlungsausgang." },
          { q: "Was passiert beim Ausgleich?", options: ["Der Beleg wird gelöscht", "Offene Posten werden miteinander verrechnet und als ausgeglichen markiert", "Das Konto wird gesperrt", "Die Periode wird geschlossen"], answer: 1, explain: "Rechnung und Zahlung werden gegeneinander ausgeglichen." }
        ]
      },
      {
        id: "abschluss",
        title: "Perioden- und Jahresabschluss",
        minutes: 5,
        content: `
<p>Am Ende jedes Monats (Periodenabschluss) und Geschäftsjahres (Jahresabschluss) sind bestimmte Arbeiten nötig.</p>
<h3>Geschäftsjahresvariante &amp; Buchungsperioden</h3>
<p>Die <strong>Geschäftsjahresvariante</strong> (z. B. K4 = Kalenderjahr mit 12 Perioden + 4 Sonderperioden) legt fest, wie das Geschäftsjahr in Perioden unterteilt ist. Mit <code class="tc">OB52</code> werden Buchungsperioden <strong>geöffnet und geschlossen</strong>.</p>
<h3>Typische Abschlussarbeiten</h3>
<ol>
<li>Wiederkehrende Buchungen ausführen (<code class="tc">F.14</code>)</li>
<li>Abgrenzungen buchen (Rechnungsabgrenzungsposten, Rückstellungen)</li>
<li>Abschreibungslauf der Anlagenbuchhaltung (<code class="tc">AFAB</code>)</li>
<li>Fremdwährungsbewertung offener Posten (<code class="tc">FAGL_FCV</code>)</li>
<li>GR/IR-Konto analysieren (WE/RE-Verrechnung)</li>
<li>Saldovortrag ins neue Geschäftsjahr (<code class="tc">FAGLGVTR</code>)</li>
<li>Bilanz und GuV erstellen (<code class="tc">F.01</code> bzw. Fiori-App)</li>
</ol>
<div class="tip">Sonderperioden (13–16) dienen für Abschlussbuchungen nach Periode 12 – z. B. Korrekturen nach der Wirtschaftsprüfung.</div>
<h3>Das WE/RE-Verrechnungskonto</h3>
<p>Beim Wareneingang zur Bestellung wird gebucht: <em>Bestand an WE/RE</em>. Bei der Rechnung: <em>WE/RE an Kreditor</em>. Liegen WE und Rechnung vor, ist das Konto für diese Bestellung ausgeglichen. Offene Salden zeigen, dass noch Rechnungen oder Wareneingänge fehlen.</p>`,
        quiz: [
          { q: "Mit welcher Transaktion öffnest/schließt du Buchungsperioden?", options: ["OB52", "F110", "SPRO", "FB50"], answer: 0, explain: "OB52 = Buchungsperioden pflegen." },
          { q: "Wozu dienen Sonderperioden?", options: ["Für Urlaubsplanung", "Für Abschlussbuchungen nach der letzten regulären Periode", "Für Testbuchungen", "Für Fremdwährungen"], answer: 1, explain: "Sonderperioden 13–16 werden für Abschluss- und Prüfungskorrekturen genutzt." },
          { q: "Was bucht der Wareneingang zur Bestellung?", options: ["Kreditor an Bank", "Bestand an WE/RE-Verrechnung", "Debitor an Umsatz", "Aufwand an Bestand"], answer: 1, explain: "Der WE bucht den Bestand im Soll gegen das WE/RE-Verrechnungskonto." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "co",
    title: "Controlling (CO)",
    icon: "📊",
    color: "#e9730c",
    level: "Fortgeschritten",
    description: "Kostenarten, Kostenstellen, Innenaufträge, Profit-Center und Ergebnisrechnung.",
    lessons: [
      {
        id: "kostenstellen",
        title: "Kostenarten & Kostenstellen",
        minutes: 6,
        content: `
<p><strong>CO (Controlling)</strong> ist das interne Rechnungswesen. Es beantwortet die Fragen: <em>Welche Kosten sind entstanden? Wo? Wofür?</em></p>
<div class="flow"><span>Kostenarten<br><small>Welche Kosten?</small></span><b>→</b><span>Kostenstellen<br><small>Wo entstanden?</small></span><b>→</b><span>Kostenträger<br><small>Wofür?</small></span></div>
<h3>Kostenarten</h3>
<ul>
<li><strong>Primäre Kostenarten:</strong> Kosten, die von außen kommen und einem GuV-Konto in FI entsprechen (z. B. Gehälter, Miete, Strom).</li>
<li><strong>Sekundäre Kostenarten:</strong> Existieren nur im CO, für interne Verrechnungen (z. B. Umlagen, Leistungsverrechnung).</li>
</ul>
<div class="tip">In S/4HANA sind Kostenarten <strong>Sachkonten</strong> mit dem Sachkontentyp „Primäre bzw. Sekundäre Kosten“ und werden über <code class="tc">FS00</code> gepflegt. Die alte Transaktion KA01 entfällt.</div>
<h3>Kostenstellen</h3>
<p>Eine <strong>Kostenstelle</strong> ist ein Ort der Kostenentstehung, z. B. „Vertrieb Nord“, „IT“, „Fertigung Halle 2“. Kostenstellen sind in einer <strong>Standardhierarchie</strong> organisiert.</p>
<table>
<tr><th>Vorgang</th><th>T-Code</th></tr>
<tr><td>Kostenstelle anlegen</td><td><code class="tc">KS01</code></td></tr>
<tr><td>Standardhierarchie pflegen</td><td><code class="tc">OKEON</code></td></tr>
<tr><td>Kostenplanung</td><td><code class="tc">KP06</code></td></tr>
<tr><td>Ist-Einzelposten Kostenstellen</td><td><code class="tc">KSB1</code></td></tr>
<tr><td>Manuelle Umbuchung von Kosten</td><td><code class="tc">KB11N</code></td></tr>
</table>
<h3>Umlage &amp; Verteilung</h3>
<p>Kosten von Hilfskostenstellen (z. B. Kantine) werden per <strong>Umlage</strong> (sekundäre Kostenart) oder <strong>Verteilung</strong> (primäre Kostenart bleibt erhalten) auf andere Kostenstellen weiterverrechnet – nach einem Schlüssel wie Mitarbeiterzahl oder Fläche.</p>`,
        quiz: [
          { q: "Was ist eine primäre Kostenart?", options: ["Eine Kostenart nur für interne Verrechnungen", "Eine Kostenart mit Entsprechung in einem GuV-Konto in FI", "Eine Kostenstelle", "Ein Innenauftrag"], answer: 1, explain: "Primäre Kosten kommen von außen und entsprechen einem Aufwandskonto." },
          { q: "Mit welcher Transaktion legst du eine Kostenstelle an?", options: ["KS01", "KA01", "FS00", "KO01"], answer: 0, explain: "KS01 = Kostenstelle anlegen." },
          { q: "Wo werden Kostenarten in S/4HANA gepflegt?", options: ["KA01", "FS00 als Sachkonto", "SE11", "Gar nicht mehr"], answer: 1, explain: "Kostenarten sind in S/4HANA Sachkonten mit eigenem Sachkontentyp." },
          { q: "Welche Frage beantwortet die Kostenstellenrechnung?", options: ["Wofür sind Kosten entstanden?", "Wo sind Kosten entstanden?", "Wann wurde bezahlt?", "Wer ist der Lieferant?"], answer: 1, explain: "Kostenstellen = Wo; Kostenträger = Wofür." }
        ]
      },
      {
        id: "innenauftraege",
        title: "Innenaufträge, Profit-Center & Ergebnisrechnung",
        minutes: 5,
        content: `
<h3>Innenaufträge</h3>
<p>Ein <strong>Innenauftrag</strong> sammelt Kosten für eine zeitlich begrenzte Maßnahme, z. B. eine Messe, ein Marketing-Event oder eine Reparatur. Am Ende wird er auf eine Kostenstelle, Anlage oder ein anderes Objekt <strong>abgerechnet</strong>.</p>
<p><code class="tc">KO01</code> Innenauftrag anlegen · <code class="tc">KO88</code> Einzelabrechnung · <code class="tc">KOB1</code> Einzelposten Innenaufträge</p>
<h3>Profit-Center-Rechnung</h3>
<p>Ein <strong>Profit-Center</strong> ist ein Unternehmensbereich mit eigener Ergebnisverantwortung (z. B. eine Produktlinie oder Region). Es zeigt nicht nur Kosten, sondern auch <strong>Erlöse</strong> und damit den Gewinn. In S/4HANA ist die Profit-Center-Rechnung Teil des Universal Journals; Transaktion zum Anlegen: <code class="tc">KE51</code>.</p>
<h3>Ergebnis- und Marktsegmentrechnung (CO-PA)</h3>
<p>CO-PA analysiert die Profitabilität nach <strong>Marktsegmenten</strong> wie Kunde, Produkt, Region oder Vertriebsweg.</p>
<ul>
<li><strong>Kalkulatorische CO-PA:</strong> Werte in Wertfeldern, eigene Tabellen.</li>
<li><strong>Buchhalterische (Margin Analysis):</strong> Basiert auf Sachkonten, in S/4HANA die empfohlene Variante – direkt im Universal Journal.</li>
</ul>
<p>Berichte: <code class="tc">KE30</code> Ergebnisbericht ausführen.</p>
<div class="tip"><strong>Statistisch vs. echt:</strong> Ein Kontierungsobjekt kann „echt“ (Kosten bleiben dort und werden weiterverrechnet) oder „statistisch“ (nur zur Information) sein. Pro Buchung darf nur <strong>ein echtes</strong> CO-Objekt kontiert werden.</div>`,
        quiz: [
          { q: "Wofür wird typischerweise ein Innenauftrag verwendet?", options: ["Für dauerhafte Abteilungen", "Für zeitlich begrenzte Maßnahmen wie eine Messe", "Für Lieferantenzahlungen", "Für Bestandsführung"], answer: 1, explain: "Innenaufträge sammeln Kosten einer befristeten Maßnahme." },
          { q: "Was unterscheidet ein Profit-Center von einer Kostenstelle?", options: ["Es hat auch Erlöse und damit ein Ergebnis", "Es hat keine Kosten", "Es ist ein Lagerort", "Es ist dasselbe"], answer: 0, explain: "Profit-Center zeigen Kosten UND Erlöse." },
          { q: "Mit welcher Transaktion wird ein Innenauftrag einzeln abgerechnet?", options: ["KO01", "KO88", "KE30", "KS01"], answer: 1, explain: "KO88 = Einzelabrechnung Ist." },
          { q: "Wie viele echte CO-Kontierungsobjekte sind pro Buchungszeile erlaubt?", options: ["Beliebig viele", "Genau eines", "Keines", "Zwei"], answer: 1, explain: "Nur ein echtes Objekt; weitere müssen statistisch sein." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "mm",
    title: "Materialwirtschaft (MM)",
    icon: "📦",
    color: "#c0399f",
    level: "Fortgeschritten",
    description: "Materialstamm, Einkauf (Procure-to-Pay), Bestandsführung und Bewegungsarten.",
    lessons: [
      {
        id: "materialstamm",
        title: "Der Materialstamm",
        minutes: 6,
        content: `
<p>Der <strong>Materialstamm</strong> ist eines der wichtigsten Stammdatenobjekte. Er enthält alle Informationen zu einem Material und wird von Einkauf, Vertrieb, Produktion, Lager und Buchhaltung gemeinsam genutzt.</p>
<h3>Sichten</h3>
<p>Der Materialstamm ist in <strong>Sichten</strong> gegliedert, die jeweils von der zuständigen Abteilung gepflegt werden: Grunddaten, Vertrieb, Einkauf, Disposition (MRP 1–4), Arbeitsvorbereitung, Lagerung, Buchhaltung, Kalkulation u. a.</p>
<h3>Organisationsebenen und Tabellen</h3>
<table>
<tr><th>Ebene</th><th>Beispieldaten</th><th>Tabelle</th></tr>
<tr><td>Mandant (allgemein)</td><td>Materialnummer, Bezeichnung, Basismengeneinheit, Materialart</td><td><code>MARA</code> / <code>MAKT</code></td></tr>
<tr><td>Werk</td><td>Dispositionsdaten, Beschaffungsart</td><td><code>MARC</code></td></tr>
<tr><td>Lagerort</td><td>Lagerortbestände</td><td><code>MARD</code></td></tr>
<tr><td>Bewertungskreis</td><td>Preissteuerung, Preis, Bewertungsklasse</td><td><code>MBEW</code></td></tr>
<tr><td>Verkaufsorg./Vertriebsweg</td><td>Vertriebsdaten</td><td><code>MVKE</code></td></tr>
</table>
<h3>Materialart</h3>
<p>Die <strong>Materialart</strong> steuert, welche Sichten erlaubt sind und ob Menge/Wert fortgeschrieben werden: <code>ROH</code> Rohstoff, <code>HALB</code> Halbfabrikat, <code>FERT</code> Fertigerzeugnis, <code>HAWA</code> Handelsware, <code>DIEN</code> Dienstleistung, <code>NLAG</code> Nichtlagermaterial.</p>
<h3>Preissteuerung</h3>
<ul>
<li><strong>S – Standardpreis:</strong> Fester Preis; Abweichungen gehen auf Preisdifferenzkonten. Typisch für Eigenfertigung (FERT/HALB).</li>
<li><strong>V – Gleitender Durchschnittspreis:</strong> Ändert sich mit jedem Wareneingang. Typisch für Fremdbeschaffung (ROH/HAWA).</li>
</ul>
<p>Transaktionen: <code class="tc">MM01</code> anlegen · <code class="tc">MM02</code> ändern · <code class="tc">MM03</code> anzeigen · <code class="tc">MM60</code> Materialverzeichnis</p>`,
        quiz: [
          { q: "In welcher Tabelle stehen die allgemeinen (mandantenweiten) Materialdaten?", options: ["MARC", "MARA", "MARD", "MBEW"], answer: 1, explain: "MARA = Allgemeine Materialdaten, MARC = Werk, MARD = Lagerort." },
          { q: "Welche Materialart steht für ein Fertigerzeugnis?", options: ["ROH", "HAWA", "FERT", "DIEN"], answer: 2, explain: "FERT = Fertigerzeugnis." },
          { q: "Was bedeutet Preissteuerung „V“?", options: ["Verkaufspreis", "Gleitender Durchschnittspreis", "Vertragspreis", "Variabler Standardpreis"], answer: 1, explain: "V = gleitender Durchschnittspreis, S = Standardpreis." },
          { q: "Was steuert die Materialart unter anderem?", options: ["Welche Sichten gepflegt werden dürfen", "Die Uhrzeit", "Den Benutzer", "Die Sprache"], answer: 0, explain: "Die Materialart bestimmt u. a. Sichtenauswahl, Nummernkreis und Mengen-/Wertfortschreibung." }
        ]
      },
      {
        id: "einkauf",
        title: "Einkauf: Procure-to-Pay",
        minutes: 7,
        content: `
<p>Der <strong>Procure-to-Pay (P2P)</strong>-Prozess beschreibt den Weg vom Bedarf bis zur Bezahlung des Lieferanten.</p>
<div class="flow vertical">
<span><b>1. Bestellanforderung (BANF)</b> – <code class="tc">ME51N</code><br><small>Interne Anforderung, z. B. aus der Disposition oder manuell</small></span>
<span><b>2. Anfrage &amp; Angebot</b> (optional) – <code class="tc">ME41</code> / <code class="tc">ME47</code><br><small>Lieferanten um Angebote bitten und vergleichen</small></span>
<span><b>3. Bestellung</b> – <code class="tc">ME21N</code><br><small>Rechtsverbindliche Bestellung beim Lieferanten (Nummer z. B. 45…)</small></span>
<span><b>4. Wareneingang</b> – <code class="tc">MIGO</code> (Bewegungsart 101)<br><small>Bestand steigt, FI-Beleg: Bestand an WE/RE</small></span>
<span><b>5. Rechnungsprüfung</b> – <code class="tc">MIRO</code><br><small>3-Wege-Abgleich: Bestellung ↔ Wareneingang ↔ Rechnung. FI: WE/RE an Kreditor</small></span>
<span><b>6. Zahlung</b> – <code class="tc">F110</code><br><small>Kreditor an Bank</small></span>
</div>
<h3>Einkaufsstammdaten</h3>
<ul>
<li><strong>Einkaufsinfosatz</strong> (<code class="tc">ME11</code>): Beziehung Material ↔ Lieferant mit Preis und Konditionen.</li>
<li><strong>Orderbuch</strong> (<code class="tc">ME01</code>): Welche Lieferanten sind für ein Material zulässig?</li>
<li><strong>Kontrakte &amp; Lieferpläne</strong> (<code class="tc">ME31K</code> / <code class="tc">ME31L</code>): Rahmenverträge.</li>
</ul>
<h3>Freigabestrategie</h3>
<p>Bestellungen ab einem bestimmten Wert müssen oft von Vorgesetzten <strong>freigegeben</strong> werden (<code class="tc">ME29N</code>), bevor sie an den Lieferanten gehen.</p>
<div class="tip">Die Bestellung selbst erzeugt <strong>keine</strong> Buchung in FI! Erst Wareneingang und Rechnung sind buchhaltungsrelevant. (Eine Bestellung kann aber ein Obligo in CO erzeugen.)</div>
<p>Tabellen: <code>EBAN</code> (BANF), <code>EKKO</code> (Bestellkopf), <code>EKPO</code> (Bestellposition).</p>`,
        quiz: [
          { q: "Mit welcher Transaktion legst du eine Bestellung an?", options: ["ME51N", "ME21N", "MIGO", "MIRO"], answer: 1, explain: "ME21N = Bestellung anlegen, ME51N = Bestellanforderung." },
          { q: "Was prüft die Rechnungsprüfung beim 3-Wege-Abgleich?", options: ["Bestellung, Wareneingang und Rechnung", "Kunde, Lieferant, Bank", "Werk, Lager, Buchungskreis", "Angebot, Anfrage, Kontrakt"], answer: 0, explain: "Menge und Preis werden zwischen Bestellung, WE und Rechnung abgeglichen." },
          { q: "Erzeugt eine Bestellung eine Buchung in FI?", options: ["Ja, immer", "Nein, erst Wareneingang und Rechnung", "Nur bei Dienstleistungen", "Nur am Monatsende"], answer: 1, explain: "Die Bestellung ist noch nicht buchhaltungsrelevant." },
          { q: "Was enthält ein Einkaufsinfosatz?", options: ["Kundendaten", "Die Beziehung zwischen Material und Lieferant inkl. Preis", "Nur die Materialbezeichnung", "Die Stückliste"], answer: 1, explain: "Der Infosatz verknüpft Material und Lieferant mit Konditionen." },
          { q: "Welche Bewegungsart wird beim Wareneingang zur Bestellung verwendet?", options: ["101", "201", "261", "601"], answer: 0, explain: "101 = Wareneingang zur Bestellung." }
        ]
      },
      {
        id: "bestand",
        title: "Bestandsführung & Bewegungsarten",
        minutes: 5,
        content: `
<p>Die <strong>Bestandsführung</strong> verwaltet Mengen und Werte von Materialien. Jede Warenbewegung erzeugt einen <strong>Materialbeleg</strong> und – bei bewertetem Material – einen <strong>Buchhaltungsbeleg</strong>.</p>
<p>Die zentrale Transaktion ist <code class="tc">MIGO</code> (Warenbewegung). Die Art der Bewegung wird durch die dreistellige <strong>Bewegungsart</strong> bestimmt:</p>
<table>
<tr><th>BWA</th><th>Bedeutung</th></tr>
<tr><td>101</td><td>Wareneingang zur Bestellung / zum Fertigungsauftrag</td></tr>
<tr><td>102</td><td>Storno zu 101</td></tr>
<tr><td>122</td><td>Rücklieferung an den Lieferanten</td></tr>
<tr><td>201</td><td>Warenausgang auf Kostenstelle</td></tr>
<tr><td>261</td><td>Warenausgang auf Auftrag (z. B. Fertigungsauftrag)</td></tr>
<tr><td>301</td><td>Umbuchung Werk an Werk</td></tr>
<tr><td>311</td><td>Umlagerung Lagerort an Lagerort</td></tr>
<tr><td>551</td><td>Verschrottung</td></tr>
<tr><td>561</td><td>Initialer Bestandsaufbau (Datenübernahme)</td></tr>
<tr><td>601</td><td>Warenausgang zur Lieferung (Vertrieb)</td></tr>
</table>
<div class="tip"><strong>Merkhilfe:</strong> Die Storno-Bewegungsart ist meist die Bewegungsart <strong>+1</strong> (101 → 102, 201 → 202, 261 → 262, 601 → 602).</div>
<h3>Bestandsarten</h3>
<ul>
<li><strong>Frei verwendbar:</strong> sofort nutzbar</li>
<li><strong>Qualitätsprüfbestand:</strong> wird erst geprüft</li>
<li><strong>Gesperrter Bestand:</strong> nicht verwendbar</li>
</ul>
<h3>Wichtige Berichte</h3>
<p><code class="tc">MMBE</code> Bestandsübersicht · <code class="tc">MB52</code> Lagerbestände · <code class="tc">MB51</code> Materialbelegliste</p>
<p>In S/4HANA werden Materialbelege in der Tabelle <code>MATDOC</code> gespeichert (früher <code>MKPF</code>/<code>MSEG</code>).</p>`,
        quiz: [
          { q: "Welche Bewegungsart storniert einen Wareneingang 101?", options: ["102", "122", "201", "561"], answer: 0, explain: "Storno-BWA = Bewegungsart + 1." },
          { q: "Was bedeutet Bewegungsart 261?", options: ["Wareneingang zur Bestellung", "Warenausgang auf Auftrag", "Verschrottung", "Umlagerung"], answer: 1, explain: "261 = Entnahme für einen (Fertigungs-)Auftrag." },
          { q: "Welche Transaktion zeigt eine Bestandsübersicht eines Materials?", options: ["MMBE", "ME21N", "VA01", "FB50"], answer: 0, explain: "MMBE = Bestandsübersicht über alle Organisationsebenen." },
          { q: "Welche Bewegungsart wird beim Warenausgang zur Kundenlieferung verwendet?", options: ["101", "311", "551", "601"], answer: 3, explain: "601 = Warenausgang für Lieferung." },
          { q: "In welcher Tabelle speichert S/4HANA Materialbelege?", options: ["MSEG", "MATDOC", "MARA", "BSEG"], answer: 1, explain: "MATDOC ersetzt MKPF/MSEG als führende Tabelle." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "sd",
    title: "Vertrieb (SD)",
    icon: "🛒",
    color: "#df1278",
    level: "Fortgeschritten",
    description: "Verkaufsbelege, Order-to-Cash, Preisfindung und Belegfluss.",
    lessons: [
      {
        id: "o2c",
        title: "Order-to-Cash",
        minutes: 7,
        content: `
<p>Der <strong>Order-to-Cash (O2C)</strong>-Prozess beschreibt den Weg von der Kundenanfrage bis zum Geldeingang.</p>
<div class="flow vertical">
<span><b>1. Anfrage</b> – <code class="tc">VA11</code> (optional)<br><small>Kunde fragt nach Preis und Verfügbarkeit</small></span>
<span><b>2. Angebot</b> – <code class="tc">VA21</code> (optional)<br><small>Verbindliches Angebot an den Kunden</small></span>
<span><b>3. Kundenauftrag</b> – <code class="tc">VA01</code><br><small>Verfügbarkeitsprüfung, Preisfindung, Kreditprüfung</small></span>
<span><b>4. Auslieferung</b> – <code class="tc">VL01N</code><br><small>Kommissionierung und Verpackung</small></span>
<span><b>5. Warenausgang</b> – <code class="tc">VL02N</code> (BWA 601)<br><small>Bestand sinkt. FI: Bestandsveränderung (Aufwand) an Bestand</small></span>
<span><b>6. Faktura</b> – <code class="tc">VF01</code><br><small>Rechnung an den Kunden. FI: Debitor an Umsatzerlöse + Umsatzsteuer</small></span>
<span><b>7. Zahlungseingang</b> – <code class="tc">F-28</code><br><small>Bank an Debitor, offener Posten wird ausgeglichen</small></span>
</div>
<h3>Belegfluss</h3>
<p>Alle Belege sind miteinander verknüpft. Über den <strong>Belegfluss</strong> (in VA03 Button „Belegfluss anzeigen“) siehst du jederzeit, welche Folgebelege existieren und welchen Status sie haben.</p>
<h3>Tabellen</h3>
<table>
<tr><th>Beleg</th><th>Kopf</th><th>Position</th></tr>
<tr><td>Verkaufsbeleg (Anfrage, Angebot, Auftrag)</td><td><code>VBAK</code></td><td><code>VBAP</code></td></tr>
<tr><td>Lieferung</td><td><code>LIKP</code></td><td><code>LIPS</code></td></tr>
<tr><td>Faktura</td><td><code>VBRK</code></td><td><code>VBRP</code></td></tr>
<tr><td>Belegfluss</td><td colspan="2"><code>VBFA</code></td></tr>
</table>
<div class="tip">Kopieren statt neu erfassen: Folgebelege werden mit <strong>Bezug</strong> auf den Vorgängerbeleg angelegt – die Daten werden über die <strong>Kopiersteuerung</strong> übernommen.</div>`,
        quiz: [
          { q: "Mit welcher Transaktion legst du einen Kundenauftrag an?", options: ["VA01", "VL01N", "VF01", "ME21N"], answer: 0, explain: "VA01 = Kundenauftrag anlegen." },
          { q: "Was bucht die Faktura in FI?", options: ["Bestand an WE/RE", "Debitor an Umsatzerlöse und Umsatzsteuer", "Bank an Debitor", "Kreditor an Bank"], answer: 1, explain: "Mit der Rechnung entsteht eine Forderung gegenüber dem Kunden." },
          { q: "In welcher Tabelle steht der SD-Belegfluss?", options: ["VBFA", "VBAK", "LIKP", "BKPF"], answer: 0, explain: "VBFA = Vertriebsbelegfluss." },
          { q: "Welcher Schritt reduziert den Lagerbestand?", options: ["Kundenauftrag", "Warenausgang zur Lieferung", "Faktura", "Angebot"], answer: 1, explain: "Erst der Warenausgang (BWA 601) bucht den Bestand aus." }
        ]
      },
      {
        id: "preisfindung",
        title: "Preisfindung & Konditionstechnik",
        minutes: 6,
        content: `
<p>Die <strong>Preisfindung</strong> in SAP ermittelt automatisch Preise, Rabatte, Zuschläge, Fracht und Steuern. Dahinter steckt die flexible <strong>Konditionstechnik</strong>, die auch für Nachrichtenfindung oder Kontenfindung genutzt wird.</p>
<h3>Die Bausteine</h3>
<div class="flow vertical">
<span><b>Kalkulationsschema</b><br><small>Reihenfolge aller Konditionen, z. B. Preis → Rabatt → Fracht → Steuer. Wird über Vertriebsbereich, Kunden- und Belegschema ermittelt.</small></span>
<span><b>Konditionsart</b><br><small>z. B. PR00 bzw. PPR0 (Preis), K007 (Kundenrabatt), MWST/TTX1 (Steuer)</small></span>
<span><b>Zugriffsfolge</b><br><small>Suchstrategie: In welcher Reihenfolge wird nach Konditionssätzen gesucht? Vom Spezifischen zum Allgemeinen.</small></span>
<span><b>Konditionstabelle</b><br><small>Schlüsselkombination, z. B. Kunde/Material oder Preisliste/Material</small></span>
<span><b>Konditionssatz</b><br><small>Der konkrete Wert, z. B. „Kunde 1000, Material A: 99 €“ – gepflegt mit <code class="tc">VK11</code></small></span>
</div>
<div class="tip"><strong>Beispiel Zugriffsfolge:</strong> Erst wird ein kundenindividueller Preis gesucht. Gibt es keinen, ein Preis für die Preisliste des Kunden. Gibt es auch den nicht, der allgemeine Materialpreis.</div>
<h3>Wichtige Transaktionen</h3>
<p><code class="tc">VK11</code> Konditionssatz anlegen · <code class="tc">VK12</code> ändern · <code class="tc">VK13</code> anzeigen · <code class="tc">V/08</code> Kalkulationsschema pflegen (Customizing)</p>
<p>In S/4HANA heißt die Standardpreis-Konditionsart oft <code>PPR0</code> statt <code>PR00</code>.</p>`,
        quiz: [
          { q: "Was legt die Zugriffsfolge fest?", options: ["Die Reihenfolge der Konditionssuche", "Den Benutzerzugriff", "Die Lieferreihenfolge", "Den Zahlungsweg"], answer: 0, explain: "Die Zugriffsfolge bestimmt, in welcher Reihenfolge nach Konditionssätzen gesucht wird." },
          { q: "Mit welcher Transaktion legst du einen Konditionssatz (Preis) an?", options: ["VA01", "VK11", "V/08", "VF01"], answer: 1, explain: "VK11 = Kondition anlegen." },
          { q: "Was enthält das Kalkulationsschema?", options: ["Die Kundenadresse", "Die Reihenfolge aller Konditionen zur Preisberechnung", "Die Lieferpositionen", "Die Kostenstellen"], answer: 1, explain: "Das Schema definiert Abfolge und Berechnung der Konditionen." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "pp",
    title: "Produktion (PP)",
    icon: "🏭",
    color: "#6c7d8c",
    level: "Fortgeschritten",
    description: "Stücklisten, Arbeitspläne, Bedarfsplanung (MRP) und Fertigungsaufträge.",
    lessons: [
      {
        id: "pp-stammdaten",
        title: "Stückliste, Arbeitsplatz & Arbeitsplan",
        minutes: 5,
        content: `
<p>Für die Produktion braucht SAP drei zentrale Stammdaten zusätzlich zum Materialstamm:</p>
<h3>Stückliste (Bill of Material, BOM)</h3>
<p>Beschreibt, <strong>woraus</strong> ein Produkt besteht: Komponenten mit Menge. Ein Fahrrad besteht z. B. aus 1 Rahmen, 2 Rädern, 1 Lenker… Stücklisten können mehrstufig sein.</p>
<p><code class="tc">CS01</code> anlegen · <code class="tc">CS02</code> ändern · <code class="tc">CS03</code> anzeigen · <code class="tc">CS11</code> Stücklistenauflösung mehrstufig</p>
<h3>Arbeitsplatz (Work Center)</h3>
<p>Beschreibt, <strong>wo</strong> produziert wird: eine Maschine, Fertigungslinie oder Personengruppe mit Kapazität und Kostensätzen (verknüpft mit einer Kostenstelle). <code class="tc">CR01</code> anlegen.</p>
<h3>Arbeitsplan (Routing)</h3>
<p>Beschreibt, <strong>wie</strong> produziert wird: die Abfolge der Arbeitsvorgänge mit Vorgabezeiten (Rüstzeit, Maschinenzeit, Personalzeit) und dem jeweiligen Arbeitsplatz. <code class="tc">CA01</code> anlegen.</p>
<div class="tip"><strong>Merke:</strong> Stückliste = <em>Was?</em> · Arbeitsplatz = <em>Wo?</em> · Arbeitsplan = <em>Wie?</em><br>Zusammen bilden sie die Grundlage für die <strong>Produktkalkulation</strong> (<code class="tc">CK11N</code>) und den Fertigungsauftrag.</div>
<h3>Fertigungsversion</h3>
<p>Die Fertigungsversion verknüpft eine Stückliste mit einem Arbeitsplan für ein Material. In S/4HANA ist sie für die Bedarfsplanung verpflichtend.</p>`,
        quiz: [
          { q: "Was beschreibt eine Stückliste?", options: ["Wo produziert wird", "Woraus ein Produkt besteht", "Wie produziert wird", "Wann geliefert wird"], answer: 1, explain: "Die Stückliste listet die Komponenten mit Mengen." },
          { q: "Mit welcher Transaktion legst du einen Arbeitsplan an?", options: ["CS01", "CR01", "CA01", "CO01"], answer: 2, explain: "CA01 = Arbeitsplan anlegen, CR01 = Arbeitsplatz, CS01 = Stückliste." },
          { q: "Was ist ein Arbeitsplatz in PP?", options: ["Ein Bürostuhl", "Eine Maschine/Linie mit Kapazität und Kostensätzen", "Ein Lagerort", "Ein Benutzer"], answer: 1, explain: "Der Arbeitsplatz beschreibt den Ort der Leistungserbringung." }
        ]
      },
      {
        id: "mrp",
        title: "Bedarfsplanung (MRP) & Fertigungsauftrag",
        minutes: 6,
        content: `
<h3>Bedarfsplanung (MRP)</h3>
<p>Die <strong>Materialbedarfsplanung</strong> (Material Requirements Planning) sorgt dafür, dass die richtigen Materialien in der richtigen Menge zur richtigen Zeit verfügbar sind. Sie vergleicht <strong>Bedarfe</strong> (Kundenaufträge, Planprimärbedarfe, Sekundärbedarfe) mit <strong>Beständen und Zugängen</strong> (Bestellungen, Fertigungsaufträge).</p>
<p>Bei Unterdeckung erzeugt der MRP-Lauf automatisch <strong>Beschaffungsvorschläge</strong>:</p>
<ul>
<li><strong>Planaufträge</strong> bei Eigenfertigung</li>
<li><strong>Bestellanforderungen</strong> bei Fremdbeschaffung</li>
</ul>
<p>Transaktionen: <code class="tc">MD01N</code> MRP Live (S/4HANA) · <code class="tc">MD02</code> Einzelplanung · <code class="tc">MD04</code> Aktuelle Bedarfs-/Bestandsliste · <code class="tc">MD61</code> Planprimärbedarf pflegen</p>
<div class="tip"><code class="tc">MD04</code> ist die wichtigste Transaktion für Disponenten: Sie zeigt in Echtzeit alle Zu- und Abgänge eines Materials und die verfügbare Menge.</div>
<h3>Der Fertigungsauftrag</h3>
<div class="flow vertical">
<span><b>1. Planauftrag umsetzen</b> – <code class="tc">CO40</code> oder direkt anlegen <code class="tc">CO01</code></span>
<span><b>2. Freigabe</b> – Auftrag kann ausgeführt werden (<code class="tc">CO02</code>)</span>
<span><b>3. Materialentnahme</b> – <code class="tc">MIGO</code>, BWA 261</span>
<span><b>4. Rückmeldung</b> – <code class="tc">CO11N</code>: geleistete Zeiten und Mengen melden</span>
<span><b>5. Wareneingang</b> – <code class="tc">MIGO</code>, BWA 101: Fertigerzeugnis ins Lager</span>
<span><b>6. Abrechnung</b> – <code class="tc">KO88</code>: Abweichungen ins Controlling</span>
</div>`,
        quiz: [
          { q: "Was erzeugt MRP bei Unterdeckung eines Eigenfertigungsteils?", options: ["Eine Bestellung", "Einen Planauftrag", "Eine Faktura", "Einen Kundenauftrag"], answer: 1, explain: "Eigenfertigung → Planauftrag; Fremdbeschaffung → Bestellanforderung." },
          { q: "Welche Transaktion zeigt die aktuelle Bedarfs-/Bestandsliste?", options: ["MD04", "MMBE", "CO11N", "ME21N"], answer: 0, explain: "MD04 = Aktuelle Bedarfs-/Bestandsliste." },
          { q: "Mit welcher Transaktion meldest du einen Fertigungsauftrag zurück?", options: ["CO01", "CO11N", "KO88", "CS01"], answer: 1, explain: "CO11N = Rückmeldung zum Vorgang erfassen." },
          { q: "Welche Bewegungsart verwendet die Materialentnahme zum Fertigungsauftrag?", options: ["101", "201", "261", "601"], answer: 2, explain: "261 = Warenausgang zum Auftrag." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "s4",
    title: "SAP S/4HANA",
    icon: "🚀",
    color: "#0070f2",
    level: "Fortgeschritten",
    description: "Was ist neu? HANA, Universal Journal, Business Partner, Clean Core und Cloud.",
    lessons: [
      {
        id: "s4-neu",
        title: "Was ist neu in S/4HANA?",
        minutes: 6,
        content: `
<p><strong>SAP S/4HANA</strong> (Business Suite 4 SAP HANA) ist die aktuelle ERP-Generation. Sie ist keine einfache Weiterentwicklung von ECC, sondern ein grundlegend vereinfachtes System.</p>
<h3>SAP HANA – die In-Memory-Datenbank</h3>
<p>HANA hält Daten im <strong>Arbeitsspeicher</strong> und speichert sie <strong>spaltenorientiert</strong>. Dadurch sind Auswertungen über Millionen Datensätze in Sekunden möglich. Viele Summen- und Indextabellen (z. B. für Bestände oder Salden) wurden überflüssig – Summen werden bei Bedarf „on the fly“ berechnet.</p>
<h3>Zentrale Neuerungen</h3>
<ul>
<li><strong>Universal Journal (ACDOCA):</strong> Eine Tabelle für FI, CO, Anlagenbuchhaltung und Material Ledger.</li>
<li><strong>Business Partner:</strong> Pflicht für Kunden und Lieferanten (Transaktion <code class="tc">BP</code>).</li>
<li><strong>SAP Fiori</strong> als primäre Oberfläche.</li>
<li><strong>MRP Live</strong> (<code class="tc">MD01N</code>) mit HANA-optimierter Planung.</li>
<li><strong>Embedded Analytics:</strong> Echtzeit-Auswertungen direkt im operativen System über CDS Views.</li>
<li><strong>Material Ledger</strong> ist verpflichtend.</li>
<li><strong>Neue Kreditmanagement- und Bankkontoverwaltung</strong>.</li>
</ul>
<h3>Betriebsmodelle</h3>
<table>
<tr><th>Modell</th><th>Beschreibung</th></tr>
<tr><td>On-Premise</td><td>Im eigenen Rechenzentrum, volle Kontrolle</td></tr>
<tr><td>Private Cloud (RISE with SAP)</td><td>Von SAP/Hyperscaler betrieben, aber kundenindividuell</td></tr>
<tr><td>Public Cloud</td><td>Standardisiertes SaaS, automatische Updates, wenig Modifikation</td></tr>
</table>
<h3>Migrationswege</h3>
<ul>
<li><strong>Greenfield:</strong> Neuimplementierung, Prozesse werden neu gedacht.</li>
<li><strong>Brownfield:</strong> Systemkonvertierung des bestehenden ECC-Systems.</li>
<li><strong>Bluefield / Selective Data Transition:</strong> Mischform, ausgewählte Daten/Prozesse werden übernommen.</li>
</ul>`,
        quiz: [
          { q: "Wie speichert SAP HANA Daten?", options: ["Zeilenorientiert auf Festplatte", "Spaltenorientiert im Arbeitsspeicher", "Nur in Excel", "In XML-Dateien"], answer: 1, explain: "HANA ist eine spaltenorientierte In-Memory-Datenbank." },
          { q: "Wie heißt die zentrale Tabelle des Universal Journals?", options: ["BSEG", "ACDOCA", "COEP", "GLT0"], answer: 1, explain: "ACDOCA vereint FI, CO, AA und ML." },
          { q: "Was bedeutet „Greenfield“?", options: ["Konvertierung des bestehenden Systems", "Neuimplementierung von Grund auf", "Nur Datenübernahme", "Ein Umweltmodul"], answer: 1, explain: "Greenfield = Neuanfang; Brownfield = Konvertierung." },
          { q: "Welches Objekt ist in S/4HANA für Kunden und Lieferanten verpflichtend?", options: ["Der Business Partner", "Der Infosatz", "Die Kostenstelle", "Das Orderbuch"], answer: 0, explain: "Kunden und Lieferanten werden als Geschäftspartner (BP) geführt." }
        ]
      },
      {
        id: "s4-cleancore",
        title: "Clean Core, BTP & Erweiterungen",
        minutes: 5,
        content: `
<h3>Clean Core</h3>
<p>Früher wurde SAP oft stark <strong>modifiziert</strong> – also SAP-eigener Code verändert. Das macht Upgrades teuer und riskant. Das <strong>Clean-Core-Prinzip</strong> besagt: Der SAP-Standard bleibt unverändert, Erweiterungen erfolgen nur über <strong>freigegebene Schnittstellen (Released APIs)</strong>.</p>
<h3>Erweiterungsmodelle</h3>
<table>
<tr><th>Typ</th><th>Beschreibung</th></tr>
<tr><td>Key User Extensibility</td><td>Fachanwender fügen Felder, Logik oder Formulare per Fiori-App hinzu – ohne Programmierung</td></tr>
<tr><td>Developer Extensibility (On-Stack)</td><td>Entwicklung mit <strong>ABAP Cloud</strong> direkt im S/4HANA-System</td></tr>
<tr><td>Side-by-Side Extensibility</td><td>Eigene Apps auf der <strong>SAP Business Technology Platform (BTP)</strong>, angebunden per API</td></tr>
<tr><td>Klassische Erweiterung</td><td>User-Exits, BAdIs, Enhancements – nur On-Premise/Private Cloud, nicht „clean“</td></tr>
</table>
<h3>SAP Business Technology Platform (BTP)</h3>
<p>Die BTP ist SAPs Cloud-Plattform für Integration (Integration Suite), Datenmanagement (Datasphere), Analytics (SAP Analytics Cloud), Anwendungsentwicklung (CAP, ABAP Environment, Build) und KI-Services (z. B. SAP Joule, Generative AI Hub).</p>
<h3>Joule</h3>
<p><strong>Joule</strong> ist SAPs KI-Assistent (Copilot), der in Fiori- und Cloud-Anwendungen integriert ist und Fragen in natürlicher Sprache beantwortet oder Aktionen auslöst.</p>
<div class="tip">Faustregel: <strong>Erst Standard, dann Key-User, dann ABAP Cloud, dann BTP</strong> – klassische Modifikationen möglichst vermeiden.</div>`,
        quiz: [
          { q: "Was besagt das Clean-Core-Prinzip?", options: ["Der Server muss sauber sein", "Der SAP-Standard bleibt unverändert, Erweiterungen nur über freigegebene APIs", "Alle Daten werden gelöscht", "Nur Fiori ist erlaubt"], answer: 1, explain: "Clean Core = keine Modifikationen, upgrade-stabile Erweiterungen." },
          { q: "Wo entstehen Side-by-Side-Erweiterungen?", options: ["Im SAP GUI", "Auf der SAP BTP", "Im Mandant 000", "In Excel"], answer: 1, explain: "Side-by-Side-Apps laufen auf der Business Technology Platform." },
          { q: "Was ist Joule?", options: ["Eine Datenbank", "SAPs KI-Assistent", "Eine Transaktion", "Ein Buchungskreis"], answer: 1, explain: "Joule ist der generative KI-Copilot von SAP." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "abap",
    title: "ABAP-Entwicklung",
    icon: "💻",
    color: "#354a5f",
    level: "Profi",
    description: "Die SAP-Programmiersprache: Syntax, interne Tabellen, Data Dictionary, CDS und RAP.",
    lessons: [
      {
        id: "abap-basics",
        title: "ABAP-Grundlagen",
        minutes: 8,
        content: `
<p><strong>ABAP</strong> (Advanced Business Application Programming) ist die Programmiersprache von SAP. Fast der gesamte SAP-Standard ist in ABAP geschrieben.</p>
<h3>Werkzeuge</h3>
<p><code class="tc">SE38</code> ABAP-Editor · <code class="tc">SE80</code> Object Navigator · <code class="tc">SE24</code> Class Builder · <code class="tc">SE37</code> Function Builder · Für modernes ABAP: <strong>ABAP Development Tools (ADT) in Eclipse</strong>.</p>
<h3>Hallo Welt</h3>
<pre><code>REPORT z_hallo_welt.

WRITE 'Hallo SAP-Welt!'.</code></pre>
<div class="tip">Eigene Objekte müssen im <strong>Kundennamensraum</strong> liegen, also mit <strong>Z</strong> oder <strong>Y</strong> beginnen.</div>
<h3>Variablen &amp; Datentypen</h3>
<pre><code>DATA lv_name   TYPE string VALUE 'Anna'.
DATA lv_menge  TYPE i.               " Integer
DATA lv_betrag TYPE p DECIMALS 2.    " gepackte Zahl
DATA(lv_text) = |Hallo { lv_name }|. " Inline-Deklaration + String-Template</code></pre>
<h3>Datenbankzugriff (ABAP SQL)</h3>
<pre><code>SELECT matnr, mtart, meins
  FROM mara
  WHERE mtart = 'FERT'
  INTO TABLE @DATA(lt_materialien)
  UP TO 100 ROWS.</code></pre>
<h3>Interne Tabellen &amp; Schleifen</h3>
<pre><code>LOOP AT lt_materialien INTO DATA(ls_mat).
  WRITE: / ls_mat-matnr, ls_mat-mtart.
ENDLOOP.

READ TABLE lt_materialien INTO ls_mat WITH KEY matnr = 'FAHRRAD-01'.
IF sy-subrc = 0.
  " gefunden
ENDIF.</code></pre>
<p><code>sy-subrc</code> ist der Rückgabewert der letzten Anweisung: <strong>0 = erfolgreich</strong>.</p>
<h3>Objektorientierung</h3>
<pre><code>CLASS lcl_rechner DEFINITION.
  PUBLIC SECTION.
    METHODS addiere IMPORTING a TYPE i b TYPE i
                    RETURNING VALUE(r) TYPE i.
ENDCLASS.

CLASS lcl_rechner IMPLEMENTATION.
  METHOD addiere.
    r = a + b.
  ENDMETHOD.
ENDCLASS.</code></pre>`,
        quiz: [
          { q: "Womit müssen eigene Kundenobjekte beginnen?", options: ["A oder B", "Z oder Y", "S oder P", "Beliebig"], answer: 1, explain: "Der Kundennamensraum beginnt mit Z oder Y." },
          { q: "Was bedeutet sy-subrc = 0?", options: ["Fehler", "Die letzte Anweisung war erfolgreich", "Programmende", "Tabelle leer"], answer: 1, explain: "0 bedeutet Erfolg, Werte ≠ 0 zeigen Fehler/nicht gefunden an." },
          { q: "Mit welcher Anweisung iterierst du über eine interne Tabelle?", options: ["FOR EACH", "LOOP AT … ENDLOOP", "WHILE TABLE", "ITERATE"], answer: 1, explain: "LOOP AT itab … ENDLOOP." },
          { q: "Welche Transaktion öffnet den ABAP-Editor?", options: ["SE11", "SE38", "SU01", "SM37"], answer: 1, explain: "SE38 = ABAP-Editor; SE11 = Data Dictionary." }
        ]
      },
      {
        id: "ddic",
        title: "ABAP Data Dictionary (DDIC)",
        minutes: 5,
        content: `
<p>Das <strong>ABAP Dictionary</strong> (<code class="tc">SE11</code>) ist das zentrale Verzeichnis aller Datenbanktabellen, Datentypen und Strukturen.</p>
<h3>Das Zwei-Ebenen-Domänenkonzept</h3>
<div class="flow"><span>Tabellenfeld</span><b>→</b><span>Datenelement<br><small>semantisch: Feldbezeichner, F1-Hilfe</small></span><b>→</b><span>Domäne<br><small>technisch: Datentyp, Länge, Wertebereich</small></span></div>
<ul>
<li><strong>Domäne:</strong> Technische Eigenschaften, z. B. CHAR 10, Festwerte.</li>
<li><strong>Datenelement:</strong> Fachliche Bedeutung, Beschriftung und Dokumentation. Mehrere Datenelemente können dieselbe Domäne nutzen.</li>
</ul>
<h3>Weitere DDIC-Objekte</h3>
<table>
<tr><th>Objekt</th><th>Zweck</th></tr>
<tr><td>Transparente Tabelle</td><td>1:1 Abbild einer Datenbanktabelle</td></tr>
<tr><td>Struktur</td><td>Datentyp ohne Datenbanktabelle</td></tr>
<tr><td>Tabellentyp</td><td>Typ für interne Tabellen</td></tr>
<tr><td>View</td><td>Sicht über mehrere Tabellen (heute: CDS Views)</td></tr>
<tr><td>Suchhilfe</td><td>F4-Wertehilfe</td></tr>
<tr><td>Sperrobjekt</td><td>Verhindert gleichzeitiges Bearbeiten (Sperren in <code class="tc">SM12</code>)</td></tr>
</table>
<h3>Mandantenfeld &amp; Schlüssel</h3>
<p>Mandantenabhängige Tabellen haben als erstes Schlüsselfeld <code>MANDT</code>. ABAP SQL filtert automatisch auf den aktuellen Mandanten.</p>
<h3>Tabellen anzeigen</h3>
<p><code class="tc">SE16N</code> (Data Browser) zeigt Tabelleninhalte an. <code class="tc">SM30</code> pflegt Tabellen über einen Tabellenpflegedialog.</p>`,
        quiz: [
          { q: "Was beschreibt eine Domäne?", options: ["Die fachliche Bedeutung", "Die technischen Eigenschaften wie Datentyp und Länge", "Die Benutzerrolle", "Den Transportweg"], answer: 1, explain: "Domäne = technisch; Datenelement = semantisch." },
          { q: "Welches Feld ist erstes Schlüsselfeld mandantenabhängiger Tabellen?", options: ["MATNR", "BUKRS", "MANDT", "USNAM"], answer: 2, explain: "MANDT = Mandant." },
          { q: "Mit welcher Transaktion zeigst du Tabelleninhalte an?", options: ["SE16N", "SE38", "PFCG", "MIGO"], answer: 0, explain: "SE16N = Data Browser." }
        ]
      },
      {
        id: "cds-rap",
        title: "Modernes ABAP: CDS Views & RAP",
        minutes: 7,
        content: `
<h3>Core Data Services (CDS)</h3>
<p><strong>CDS Views</strong> sind semantisch angereicherte Datenmodelle, die direkt auf der Datenbank ausgeführt werden (<em>Code-to-Data</em>). Sie sind die Grundlage für Fiori-Apps, Analytics und APIs in S/4HANA. Erstellt werden sie in Eclipse (ADT).</p>
<pre><code>@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Fertigerzeugnisse'
define view entity ZI_Fertigmaterial
  as select from mara
  association [0..*] to makt as _Text
    on $projection.Material = _Text.matnr
{
  key matnr as Material,
      mtart as Materialart,
      meins as Basismengeneinheit,
      _Text
}
where mtart = 'FERT'</code></pre>
<ul>
<li><strong>Annotationen</strong> (<code>@…</code>) steuern UI, Analytics, Berechtigungen.</li>
<li><strong>Assoziationen</strong> sind „Joins on demand“.</li>
<li><strong>VDM</strong> (Virtual Data Model): SAP liefert Interface-Views (<code>I_…</code>) und Consumption-Views (<code>C_…</code>).</li>
</ul>
<h3>ABAP RESTful Application Programming Model (RAP)</h3>
<p><strong>RAP</strong> ist das moderne Programmiermodell für Fiori-Apps und Web-APIs:</p>
<div class="flow vertical">
<span><b>CDS-Datenmodell</b> – Business Objects definieren</span>
<span><b>Behavior Definition</b> – Was ist erlaubt? (create, update, delete, Actions, Validations)</span>
<span><b>Behavior Implementation</b> – ABAP-Klasse mit der Logik</span>
<span><b>Service Definition &amp; Binding</b> – Veröffentlichung als OData V4 Service</span>
<span><b>Fiori Elements</b> – UI wird aus Annotationen generiert</span>
</div>
<h3>ABAP Cloud</h3>
<p>Ein Entwicklungsmodell mit eingeschränktem Sprachumfang und nur <strong>freigegebenen APIs</strong> – Voraussetzung für Clean Core und die Public Cloud. Klassische Anweisungen wie <code>WRITE</code> oder direkte Zugriffe auf SAP-Tabellen sind dort nicht erlaubt.</p>`,
        quiz: [
          { q: "Was bedeutet „Code-to-Data“?", options: ["Code wird ausgedruckt", "Logik wird in der Datenbank ausgeführt statt Daten zum Anwendungsserver zu laden", "Daten werden in Code umgewandelt", "Nur für Excel"], answer: 1, explain: "CDS-Views werden auf der HANA-Datenbank ausgeführt." },
          { q: "Wofür steht RAP?", options: ["Rapid ABAP Programming", "ABAP RESTful Application Programming Model", "Remote Access Protocol", "Report and Print"], answer: 1, explain: "RAP = ABAP RESTful Application Programming Model." },
          { q: "Was legt die Behavior Definition in RAP fest?", options: ["Die Datenbankgröße", "Welche Operationen ein Business Object erlaubt", "Die Benutzerfarben", "Die Transportroute"], answer: 1, explain: "Sie definiert Operationen, Actions, Validations und Determinations." },
          { q: "Was ist in ABAP Cloud nicht erlaubt?", options: ["Klassen", "Direkte Zugriffe auf nicht freigegebene SAP-Objekte", "CDS Views", "Methoden"], answer: 1, explain: "ABAP Cloud erlaubt nur Released APIs." }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "basis",
    title: "Basis & Berechtigungen",
    icon: "🔐",
    color: "#bb0000",
    level: "Profi",
    description: "Benutzerverwaltung, Rollen, Transporte, Jobs und Systemüberwachung.",
    lessons: [
      {
        id: "berechtigungen",
        title: "Benutzer, Rollen & Berechtigungen",
        minutes: 6,
        content: `
<p>Die <strong>SAP Basis</strong> ist für den technischen Betrieb zuständig. Ein Kernthema ist das <strong>Berechtigungskonzept</strong>: Jeder Benutzer darf nur das tun, was er für seine Arbeit braucht (<em>Need-to-know / Least Privilege</em>).</p>
<h3>Benutzerverwaltung</h3>
<p><code class="tc">SU01</code> Benutzer anlegen/pflegen/sperren · <code class="tc">SU10</code> Massenpflege · <code class="tc">SU3</code> Eigene Daten</p>
<p>Benutzertypen: <strong>Dialog</strong> (normaler Anwender), <strong>System</strong> (Hintergrundprozesse, RFC), <strong>Kommunikation</strong> (externe RFC), <strong>Service</strong>, <strong>Referenz</strong>.</p>
<h3>Das Berechtigungsmodell</h3>
<div class="flow"><span>Benutzer</span><b>←</b><span>Rolle<br><small>PFCG</small></span><b>←</b><span>Profil</span><b>←</b><span>Berechtigung</span><b>←</b><span>Berechtigungsobjekt<br><small>mit Feldern</small></span></div>
<ul>
<li><strong>Berechtigungsobjekt:</strong> z. B. <code>S_TCODE</code> (Transaktionsstart) oder <code>F_BKPF_BUK</code> (Buchungskreis in FI) mit Feldern wie <code>ACTVT</code> (Aktivität: 01 Anlegen, 02 Ändern, 03 Anzeigen).</li>
<li><strong>Rolle:</strong> Wird mit <code class="tc">PFCG</code> gepflegt, enthält Menü, Berechtigungen und generiert ein Profil.</li>
<li><strong>Sammelrolle:</strong> Bündelt mehrere Einzelrollen.</li>
</ul>
<div class="tip"><strong>Fehlende Berechtigung?</strong> Direkt danach <code class="tc">SU53</code> aufrufen – zeigt die zuletzt fehlgeschlagene Berechtigungsprüfung. Für tiefere Analysen gibt es den Berechtigungstrace <code class="tc">STAUTHTRACE</code>.</div>
<h3>Kritische Berechtigungen</h3>
<p>Das Profil <code>SAP_ALL</code> enthält alle Berechtigungen und darf im Produktivsystem nur im Notfall vergeben werden. Ebenso kritisch: Debugging mit Änderungsrechten, Tabellenpflege und Benutzerverwaltung.</p>
<h3>Funktionstrennung (SoD)</h3>
<p><strong>Segregation of Duties:</strong> Kritische Kombinationen (z. B. Lieferant anlegen <em>und</em> Zahlungen freigeben) dürfen nicht bei einer Person liegen. Tools wie SAP GRC prüfen das.</p>`,
        quiz: [
          { q: "Mit welcher Transaktion pflegst du Rollen?", options: ["SU01", "PFCG", "SU53", "SM37"], answer: 1, explain: "PFCG = Profilgenerator / Rollenpflege." },
          { q: "Welche Transaktion zeigt die letzte fehlgeschlagene Berechtigungsprüfung?", options: ["SU53", "SU01", "ST22", "SE11"], answer: 0, explain: "SU53 unmittelbar nach der Fehlermeldung aufrufen." },
          { q: "Was steuert das Feld ACTVT in einem Berechtigungsobjekt?", options: ["Die Uhrzeit", "Die erlaubte Aktivität (Anlegen, Ändern, Anzeigen…)", "Den Mandanten", "Die Sprache"], answer: 1, explain: "ACTVT = Aktivität, z. B. 01/02/03." },
          { q: "Was bedeutet Segregation of Duties?", options: ["Benutzer teilen sich ein Passwort", "Kritische Tätigkeitskombinationen werden auf verschiedene Personen verteilt", "Jeder darf alles", "Systeme werden getrennt"], answer: 1, explain: "Funktionstrennung verhindert Betrug und Fehler." }
        ]
      },
      {
        id: "monitoring",
        title: "Transporte, Jobs & Monitoring",
        minutes: 5,
        content: `
<h3>Transportwesen</h3>
<p>Änderungen aus Customizing und Entwicklung werden in <strong>Transportaufträgen</strong> gesammelt:</p>
<ul>
<li><strong>Customizing-Auftrag:</strong> mandantenabhängige Einstellungen</li>
<li><strong>Workbench-Auftrag:</strong> mandantenübergreifende Objekte (Programme, Tabellen)</li>
</ul>
<p><code class="tc">SE09</code> / <code class="tc">SE10</code> Transport Organizer · <code class="tc">STMS</code> Transport Management System (Import in Folgesysteme)</p>
<h3>Hintergrundjobs</h3>
<p>Lang laufende Programme (z. B. Zahllauf, MRP, Abrechnungen) laufen als <strong>Hintergrundjobs</strong>. <code class="tc">SM36</code> Job einplanen · <code class="tc">SM37</code> Jobübersicht (Status: geplant, freigegeben, aktiv, beendet, abgebrochen)</p>
<h3>Monitoring-Transaktionen</h3>
<table>
<tr><th>T-Code</th><th>Zweck</th></tr>
<tr><td><code class="tc">SM50</code></td><td>Workprozess-Übersicht des Anwendungsservers</td></tr>
<tr><td><code class="tc">SM66</code></td><td>Systemweite Workprozess-Übersicht</td></tr>
<tr><td><code class="tc">SM21</code></td><td>Systemlog</td></tr>
<tr><td><code class="tc">ST22</code></td><td>ABAP-Laufzeitfehler (Dumps) analysieren</td></tr>
<tr><td><code class="tc">SM12</code></td><td>Sperreinträge anzeigen/löschen</td></tr>
<tr><td><code class="tc">SM13</code></td><td>Verbuchungsaufträge (Update-Fehler)</td></tr>
<tr><td><code class="tc">SM04</code></td><td>Angemeldete Benutzer</td></tr>
<tr><td><code class="tc">ST05</code></td><td>SQL-Trace (Performance)</td></tr>
<tr><td><code class="tc">SM59</code></td><td>RFC-Verbindungen</td></tr>
</table>
<h3>Workprozesse</h3>
<p>Ein SAP-Anwendungsserver hat verschiedene Workprozesstypen: <strong>Dialog (DIA), Hintergrund (BTC), Verbuchung (UPD/UP2), Sperre (ENQ), Spool (SPO)</strong>.</p>
<div class="tip">Wenn ein Anwender „Dump“ sagt: <code class="tc">ST22</code>. Wenn ein Datensatz „gesperrt“ ist: <code class="tc">SM12</code>. Wenn ein Job hängt: <code class="tc">SM37</code>.</div>`,
        quiz: [
          { q: "Wo analysierst du ABAP-Laufzeitfehler (Dumps)?", options: ["SM37", "ST22", "SM12", "SU01"], answer: 1, explain: "ST22 = ABAP-Dumpanalyse." },
          { q: "Welche Transaktion zeigt die Übersicht der Hintergrundjobs?", options: ["SM36", "SM37", "SM50", "STMS"], answer: 1, explain: "SM37 = Jobübersicht; SM36 = Job definieren." },
          { q: "Wo kannst du Sperreinträge anzeigen?", options: ["SM12", "SM21", "SE10", "SU53"], answer: 0, explain: "SM12 = Sperreinträge." },
          { q: "Welcher Transportauftragstyp enthält Programme und Tabellen?", options: ["Customizing-Auftrag", "Workbench-Auftrag", "Kopierauftrag", "Mandantenauftrag"], answer: 1, explain: "Workbench-Aufträge enthalten mandantenübergreifende Entwicklungsobjekte." }
        ]
      }
    ]
  }
];
