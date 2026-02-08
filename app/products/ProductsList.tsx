"use client";

import { type SavingsAccount } from "../types/types";
import { useFilteredAccounts } from "../hooks/useFilteredAccounts";
import { Filters } from "./Filters/Filters";
import { AccountList } from "./AccountList/AccountList";

export function ProductsList({ accounts }: { accounts: SavingsAccount[] }) {
  const {
    nameInput,
    typeInput,
    setNameInput,
    setTypeInput,
    filtered,
  } = useFilteredAccounts(accounts);

  return (
    <div className="space-y-6">
      <Filters
        nameValue={nameInput}
        typeValue={typeInput}
        onNameChange={setNameInput}
        onTypeChange={setTypeInput}
      />
      <AccountList accounts={filtered} />
    </div>
  );
}
