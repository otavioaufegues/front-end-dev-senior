export function truncate(text: string, max = 120): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export function formatLastActivity(iso: string | null): string {
  if (!iso) return "Sem atividade recente";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Data inválida";
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}
