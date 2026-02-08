"use client";

export type FiltersProps = {
  nameValue: string;
  typeValue: string;
  onNameChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export function Filters({
  nameValue,
  typeValue,
  onNameChange,
  onTypeChange,
}: FiltersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">

      <div>
        <label
          htmlFor="filter-name"
          className="mb-1 block text-sm font-medium text-neutral-600"
        >
          Filtrar por nombre
        </label>
        <input
          id="filter-name"
          type="text"
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ej: Ahorro Joven"
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="filter-type"
          className="mb-1 block text-sm font-medium text-neutral-600"
        >
          Filtrar por tipo
        </label>
        <input
          id="filter-type"
          type="text"
          value={typeValue}
          onChange={(e) => onTypeChange(e.target.value)}
          placeholder="Ej: programado, nómina"
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
    </div>
  );
}
