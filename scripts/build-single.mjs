// Packt den Vite-Build (dist/) in eine einzige, eigenständige HTML-Datei:
// dist-single/sap-lernpfad.html – ideal zum Teilen oder Öffnen ohne Server.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";

const assets = readdirSync("dist/assets");
const css = readFileSync(`dist/assets/${assets.find((f) => f.endsWith(".css"))}`, "utf8");
const js = readFileSync(`dist/assets/${assets.find((f) => f.endsWith(".js"))}`, "utf8").replace(/<\/script/gi, "<\\/script");

const html = `<title>SAP Lernpfad</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Interaktive Lern-App für SAP: Grundlagen, Module, Transaktionen, Prozesse und ABAP.">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;

mkdirSync("dist-single", { recursive: true });
writeFileSync("dist-single/sap-lernpfad.html", html);
console.log(`dist-single/sap-lernpfad.html (${Math.round(html.length / 1024)} KB)`);
