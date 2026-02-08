import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-neutral-600 hover:text-neutral-900">
            Inicio
          </Link>
          <Link href="/products" className="text-neutral-600 hover:text-neutral-900">
            Productos
          </Link>
          <Link href="/simulator" className="text-neutral-600 hover:text-neutral-900">
              Simulador
            </Link>
          <Link href="/onboarding" className="text-neutral-600 hover:text-neutral-900">
            Onboarding
          </Link>
        </nav>
      </div>
    </header>
  )
}