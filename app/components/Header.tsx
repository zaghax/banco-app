import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white flex justify-between items-center">

        <Link href="/" className="text-neutral-600 hover:text-neutral-900 flex items-center gap-2">
          <Image src="/bank-logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-neutral-900">Banco App</h1>
        </Link>
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

    </header>
  )
}