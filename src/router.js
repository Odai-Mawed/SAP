import { useEffect, useState } from "react";

/**
 * Minimaler Hash-Router. Routen sind einfache Namen aus Buchstaben, Ziffern und
 * Bindestrichen, Parameter werden mit "--" getrennt:
 * "#lektion--fi--hauptbuch" → ["lektion", "fi", "hauptbuch"]
 */
function parse() {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h || h === "start") return [];
  return h.split(/--|\//).filter(Boolean).map(decodeURIComponent);
}

export function useRoute() {
  const [parts, setParts] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setParts(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return parts;
}
