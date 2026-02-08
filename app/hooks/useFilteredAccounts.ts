"use client";

import { useState } from "react";
import { useDebouncedValue } from "./useDebounce";
import { filterAccounts } from "../products/filterLogic";
import { type SavingsAccount } from "../types/types";

const DEBOUNCE_MS = 300;

export function useFilteredAccounts(accounts: SavingsAccount[]) {
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [debouncedName] = useDebouncedValue(nameInput, DEBOUNCE_MS);
  const [debouncedType] = useDebouncedValue(typeInput, DEBOUNCE_MS);
  const filtered = filterAccounts(accounts, debouncedName, debouncedType);

  return {
    nameInput,
    typeInput,
    setNameInput,
    setTypeInput,
    filtered,
  };
}
