"use client";

import { useState, useEffect } from "react";
import { type SavingsAccount } from "../types/types";

export const useGetAccounts = () => {
  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('../../data/accounts.json');
      const jsonData = await response.json();
      setAccounts(jsonData);
    }

    fetchData();
  }, []);

  return accounts;
}
