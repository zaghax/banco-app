"use client";

import { type SavingsAccount } from "../types/types";

/** Normaliza texto: quita tildes y convierte a minúsculas para búsqueda. */
export function normalizeForSearch(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterAccounts(
  accounts: SavingsAccount[],
  searchName: string,
  searchType: string
): SavingsAccount[] {
  const name = normalizeForSearch(searchName);
  const type = normalizeForSearch(searchType);
  return accounts.filter((a) => {
    const matchName = !name || normalizeForSearch(a.nombre).includes(name);
    const matchType = !type || normalizeForSearch(a.tipo).includes(type);
    return matchName && matchType;
  });
}
