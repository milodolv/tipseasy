/** Affiche un montant stocké en centimes (ex. 500 → « 5 € »). */
export function formatEurosFromCents(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Saisie utilisateur en euros → centimes entiers. */
export function eurosInputToCents(value: string): number | null {
  const normalized = value.replace(",", ".").trim();
  if (!normalized) return null;
  const euros = Number.parseFloat(normalized);
  if (!Number.isFinite(euros) || euros < 0) return null;
  return Math.round(euros * 100);
}