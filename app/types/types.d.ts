export type SavingsAccount = {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  tasaAnual: string;
  montoMinimo: number;
};

export type FormErrors = {
  nombre?: string;
  documento?: string;
  correo?: string;
  recaptcha?: string;
};

export type FormErrorsSimulator = {
  montoInicial?: string;
  aporteMensual?: string;
  meses?: string;
};