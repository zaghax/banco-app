"use client";

import { useState } from "react";
import FormInput from "../utils/FormInput";
import { FormErrors } from "../types/types";
import Image from "next/image";

const RECAPTCHA_VALID_TOKEN = "OK";

export default function OnboardingPage() {

  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successCode, setSuccessCode] = useState<string | null>(null);

  function validate(): boolean {
    const e: FormErrors = {};

    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!documento.trim()) e.documento = "El documento es obligatorio.";
    if (documento.trim().length > 0 && documento.trim().length < 5) {
      e.documento = "El documento debe tener al menos 5 caracteres.";
    }
    if (!correo.trim()) e.correo = "El correo es obligatorio.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo.trim() && !emailRegex.test(correo.trim())) {
      e.correo = "Indica un correo electrónico válido.";
    }
    if (recaptchaToken.trim() !== RECAPTCHA_VALID_TOKEN) {
      e.recaptcha = "Debes completar la verificación (reCAPTCHA).";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessCode(null);
    if (!validate()) return;

    const code = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `SOL-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    setSuccessCode(code);
  }

  function handleReset() {
    setSuccessCode(null);
    setNombre("");
    setDocumento("");
    setCorreo("");
    setRecaptchaToken("");
    setErrors({});
  }

  return (

    <>
    <Image src="/banner-calculadora-otros-objetivos-v1.JPG" alt="Banner" width={1000} height={0} style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}  />
    <div className="min-h-screen mx-auto max-w-3xl">

      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Solicitud de cuenta
      </h1>

      <p className="mt-1 text-neutral-600">
        Completa el formulario. 
      </p>

      {successCode ? (
        <section
          className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center"
          role="status"
          aria-live="polite"
        >

          <h2 className="text-lg font-semibold text-green-800">Solicitud enviada correctamente</h2>
          
          <p className="mt-2 text-green-700">
            Tu código de solicitud es:
          </p>

          <p className="mt-2 font-mono text-xl font-bold text-green-900">
            {successCode}
          </p>

          <p className="mt-3 text-sm text-green-700">
            Guarda este código para consultar el estado de tu solicitud.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Enviar otra solicitud
          </button>

        </section>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          
          <FormInput
            id="nombre"
            label="Nombre completo"
            value={nombre}
            onChange={(value) => setNombre(value)}
            placeholder="Ej: Juan Pérez"
            error={errors.nombre}
          />

          <FormInput
            id="documento"
            label="Número de documento"
            value={documento}
            onChange={(value) => setDocumento(value)}
            placeholder="Ej: 12345678"
            error={errors.documento}
          />

          <FormInput
            id="correo"
            label="Correo electrónico"
            value={correo}
            onChange={(value) => setCorreo(value)}
            placeholder="correo@ejemplo.com"
            error={errors.correo}
          />

          <div className="relative">

            <label htmlFor="recaptcha-hidden" className="sr-only">
              Verificación reCAPTCHA
            </label>

            <input
              id="recaptcha-hidden"
              type="text"
              name="recaptcha"
              value={recaptchaToken}
              onChange={(e) => setRecaptchaToken(e.target.value)}
              autoComplete="off"
              className="absolute opacity-0 pointer-events-none w-0 h-0"
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRecaptchaToken(RECAPTCHA_VALID_TOKEN)}
                className="rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200"
              >
                Simular reCAPTCHA (OK)
              </button>
            </div>

            {errors.recaptcha && (
              <div className="mt-2 rounded-lg border border-red-300 bg-red-50 p-3" role="alert">
                <p className="text-sm font-medium text-red-800">
                  Error de verificación
                </p>
                <p className="mt-1 text-sm text-red-700">
                  {errors.recaptcha}
                </p>
              </div>
            )}

          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar solicitud
          </button>

        </form>
      )}

    </div>
    </>
  );
}
