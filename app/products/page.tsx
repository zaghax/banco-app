import { readFile } from "fs/promises";
import path from "path";
import { ProductsList } from "./ProductsList";
import { type SavingsAccount } from "../types/types";
import Image from "next/image";

// ISR: revalidar esta página cada 60 segundos
export const revalidate = 60;

async function getAccounts(): Promise<SavingsAccount[]> {
  const filePath = path.join(process.cwd(), "data", "accounts.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data) as SavingsAccount[];
}

export default async function ProductsPage() {
  const accounts = await getAccounts();

  return (
    <div className="min-h-screen">

      <Image src="/banner-lineas-de-ahorro.jpg" alt="Banner" width={1000} height={0} style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}  />

      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Lineas de ahorro
      </h1>

      <p className="mt-1 text-neutral-600">
        Explora nuestras opciones y filtra por nombre o tipo. La búsqueda tiene debounce de 300 ms.
      </p>

      <div className="mt-8">
        <ProductsList accounts={accounts} />
      </div>
     
    </div>
  );
}
