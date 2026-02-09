import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <nav className="flex items-center gap-6 text-sm">
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
          <p className="text-sm text-neutral-500">
            © {currentYear} Banco App. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
