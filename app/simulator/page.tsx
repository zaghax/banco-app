"use client";

import { useState } from "react";
import FormInput from "../utils/FormInput";
import { FormErrorsSimulator } from "../types/types";

/**
 * Fórmula de interés utilizada (documentada):
 *
 * 1. Tasa mensual: r = tasaAnual / 12 (ej: 5% anual → r ≈ 0.004167).
 * 2. Valor futuro del monto inicial: VF0 = montoInicial * (1 + r)^meses
 * 3. Valor futuro de la serie de aportes mensuales (anualidad vencida):
 *    VF_aportes = aporteMensual * (((1 + r)^meses - 1) / r)
 * 4. Monto total estimado: total = VF0 + VF_aportes
 * 5. Interés estimado: interes = total - montoInicial - (aporteMensual * meses)
 *
 * Así se estima el interés compuesto sobre el capital inicial y sobre cada aporte
 * según el tiempo que permanece en la cuenta.
 */
const TASA_ANUAL_DEFAULT = 0.05; // 5% anual

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/\D/g, "");
  return parseInt(cleaned || "0", 10);
}

function formatInputAsCurrency(value: string): string {
  const num = parseCurrencyInput(value);
  if (num === 0) return "";
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function calculateInterest(
  montoInicial: number,
  aporteMensual: number,
  meses: number,
  tasaAnual: number = TASA_ANUAL_DEFAULT
): { total: number; interes: number } {
  if (meses <= 0) return { total: montoInicial, interes: 0 };
  const r = tasaAnual / 12;
  const vfInicial = montoInicial * Math.pow(1 + r, meses);
  const vfAportes =
    aporteMensual > 0 && r > 0
      ? aporteMensual * (Math.pow(1 + r, meses) - 1) / r
      : aporteMensual * meses;
  const total = vfInicial + vfAportes;
  const interes = total - montoInicial - aporteMensual * meses;
  return { total, interes };
}

export default function SimulatorPage() {

  const [montoInicialStr, setMontoInicialStr] = useState("");
  const [aporteMensualStr, setAporteMensualStr] = useState("");
  const [mesesStr, setMesesStr] = useState("");
  const [errors, setErrors] = useState<FormErrorsSimulator>({});
  const [result, setResult] = useState<{ total: number; interes: number } | null>(null);

  function validate(): boolean {
    const e: FormErrorsSimulator = {};
    const montoInicial = parseCurrencyInput(montoInicialStr);
    const aporteMensual = parseCurrencyInput(aporteMensualStr);
    const meses = parseInt(mesesStr.replace(/\D/g, "") || "0", 10);

    if (montoInicial <= 0 && aporteMensual <= 0) {
      e.montoInicial = "Indica un monto inicial o un aporte mensual.";
      e.aporteMensual = "Indica un monto inicial o un aporte mensual.";
    }
    if (montoInicial < 0) e.montoInicial = "El monto inicial no puede ser negativo.";
    if (aporteMensual < 0) e.aporteMensual = "El aporte mensual no puede ser negativo.";
    if (meses <= 0) e.meses = "Indica un número de meses válido (mayor a 0).";
    if (meses > 600) e.meses = "El número de meses no puede superar 600 (50 años).";

    setErrors(e);
    setResult(null);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const montoInicial = parseCurrencyInput(montoInicialStr);
    const aporteMensual = parseCurrencyInput(aporteMensualStr);
    const meses = parseInt(mesesStr.replace(/\D/g, "") || "0", 10);

    const res = calculateInterest(montoInicial, aporteMensual, meses);
    setResult(res);
  }

  return (
    <div className="min-h-screen mx-auto max-w-3xl">
    
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Simulador de ahorro
      </h1>

      <p className="mt-1 text-neutral-600">
        Calcula el interés estimado con monto inicial, aporte mensual y plazo. Tasa de referencia 5% anual.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">

        <FormInput
          id="monto-inicial"
          label="Monto inicial"
          value={montoInicialStr}
          onChange={(value) => setMontoInicialStr(formatInputAsCurrency(value))}
          placeholder="0"
          error={errors.montoInicial}
        />

        <FormInput
          id="aporte-mensual"
          label="Aporte mensual"
          value={aporteMensualStr}
          onChange={(value) => setAporteMensualStr(formatInputAsCurrency(value))}
          placeholder="0"
          error={errors.aporteMensual}
        />  

        <FormInput
          id="meses"
          label="Número de meses"
          value={mesesStr}
          onChange={(value) => setMesesStr(value.replace(/\D/g, "").slice(0, 4))}
          placeholder="12"
          error={errors.meses}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calcular
        </button>

      </form>

      {result !== null && (
        <section
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6"
          aria-live="polite"
        >

          <h2 className="font-semibold text-neutral-900">Resultado estimado</h2>

          <p className="mt-2 text-neutral-700">
            <strong>Monto total estimado:</strong> {formatCurrency(result.total)}
          </p>

          <p className="mt-1 text-neutral-700">
            <strong>Interés estimado:</strong> {formatCurrency(Math.max(0, result.interes))}
          </p>

          <p className="mt-3 text-sm text-neutral-600">
            Cálculo con tasa anual del 5%, capitalización mensual.
          </p>

        </section>
      )}

    </div>
  );
}
