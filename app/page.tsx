import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">

        <h1 className="text-3xl font-bold text-neutral-900">
          Banco App
        </h1>

        <p className="mt-2 text-neutral-600">
          Explora productos de ahorro, simula tu ahorro o inicia tu solicitud de cuenta.
        </p>

        <nav className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/products"
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <h2 className="font-semibold text-neutral-900">Productos</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Listado de cuentas de ahorro.
            </p>
          </Link>
          <Link
            href="/simulator"
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <h2 className="font-semibold text-neutral-900">Simulador</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Calcula el interés estimado.
            </p>
          </Link>
          <Link
            href="/onboarding"
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <h2 className="font-semibold text-neutral-900">Pide tu cuenta</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Regístrate para obtener tu cuenta.
            </p>
          </Link>
        </nav>

      </main>
      
    </div>
  );
}
