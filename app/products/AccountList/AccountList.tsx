"use client";

import { type SavingsAccount } from "../../types/types";

export function AccountList({ accounts }: { accounts: SavingsAccount[] }) {
  return (
    <>
      <p className="text-sm text-neutral-500">
        {accounts.length} cuenta{accounts.length !== 1 ? "s" : ""} encontrada
        {accounts.length !== 1 ? "s" : ""}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <li
            key={account.id}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-semibold text-neutral-900">{account.nombre}</h3>
            <p className="mt-1 text-sm font-medium text-blue-600">{account.tipo}</p>
            <p className="mt-2 text-sm text-neutral-600">{account.descripcion}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-neutral-100 px-2 py-1 text-neutral-700">
                Tasa: {account.tasaAnual}
              </span>
              <span className="rounded bg-neutral-100 px-2 py-1 text-neutral-700">
                Mín: ${account.montoMinimo}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {accounts.length === 0 && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 py-6 text-center text-neutral-600">
          No se encontraron cuentas con los filtros aplicados.
        </p>
      )}
    </>
  );
}
