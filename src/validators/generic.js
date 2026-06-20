export function ensureEstablishmentOwnership(establishment) {
  if (!establishment) {
    throw new Error("Invalid establishment for this user");
  }
}
