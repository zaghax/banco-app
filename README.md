# Banco App

Aplicación Next.js con listado de productos de ahorro, simulador de interés y formulario de onboarding.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Desde la página de inicio puedes ir a:

- **/products** – Listado de cuentas de ahorro
- **/simulator** – Simulador de ahorro con cálculo de interés
- **/onboarding** – Solicitud de cuenta con reCAPTCHA simulado

---

## 1. Página /products (listado y filtros)

- **Datos:** listado de cuentas de ahorro definido en `data/accounts.json`.
- **Filtros:** por nombre y por tipo, con **búsqueda en tiempo real y debounce de 300 ms** para no disparar filtrado en cada tecla.
- **Renderizado: ISR (Incremental Static Regeneration).**

### Por qué ISR en /products

Se eligió **ISR** en lugar de SSR puro por:

1. **Contenido semi-estático:** el catálogo de productos no cambia en cada request; un JSON local se actualiza poco.
2. **Rendimiento:** la página se sirve como estática y se revalida en segundo plano cada `revalidate` segundos (60 s en este proyecto), reduciendo carga en el servidor y mejorando tiempos de respuesta.
3. **Escalabilidad:** en producción, si el origen de datos fuera una API o CMS, ISR permite cachear la respuesta y revalidar periódicamente sin tener que generar la página en cada visita (como en SSR con `dynamic`).

En resumen: ISR da un buen equilibrio entre “siempre fresco” y “rápido y cacheable” para un listado que no requiere datos en tiempo real por request. Si se necesitara contenido distinto por usuario o por cada carga, tendría más sentido usar SSR.

---

## 2. Página /simulator (formulario y cálculo de interés)

- **Campos:** monto inicial, aporte mensual y número de meses.
- **Validaciones:** monto inicial o aporte obligatorios, meses > 0 y límite razonable (ej. 600), formato de moneda.
- **Formato de moneda:** entrada/salida en formato local (ej. COP) y mensajes de error claros.

### Lógica del interés (fórmula documentada en código)

Se usa **interés compuesto** con capitalización mensual:

1. **Tasa mensual:** `r = tasaAnual / 12` (ej. 5% anual → r ≈ 0,004167).
2. **Valor futuro del monto inicial:**  
   `VF0 = montoInicial × (1 + r)^meses`
3. **Valor futuro de los aportes mensuales (anualidad vencida):**  
   `VF_aportes = aporteMensual × ((1 + r)^meses - 1) / r`
4. **Monto total estimado:**  
   `total = VF0 + VF_aportes`
5. **Interés estimado:**  
   `interes = total - montoInicial - (aporteMensual × meses)`

La tasa de referencia por defecto es 5% anual y está definida en el código del simulador.

---

## 3. Página /onboarding (formulario y reCAPTCHA simulado)

- **Campos:** nombre, documento, correo y un **campo oculto** para el token de reCAPTCHA.
- **reCAPTCHA simulado:** en esta demo no se usa el widget real. El token se considera válido solo si el valor del campo oculto es exactamente `"OK"`. Para probar, se incluye un botón “Simular reCAPTCHA (OK)” que escribe ese valor en el campo oculto.
- **Validación:** si el token no es `"OK"`, se muestra un **error visual** (mensaje y bloque de error) y no se envía la solicitud.
- **Envío correcto:** al validar todo (incluido reCAPTCHA), se muestra un mensaje de **éxito** con un **código de solicitud** generado (UUID vía `crypto.randomUUID()` o, si no existe, un código alternativo tipo `SOL-{timestamp}-{random}`).

En producción, el campo oculto se rellenaría con el token que devuelve el widget real de reCAPTCHA y la validación se haría en backend.

---

## Estructura relevante

```
app/
  page.tsx              # Inicio con enlaces
  products/
    page.tsx            # Página ISR que lee data/accounts.json
    ProductsList.tsx    # Cliente: listado + filtros con debounce
    useDebounce.ts      # Hook de debounce
  simulator/
    page.tsx            # Formulario + cálculo de interés
  onboarding/
    page.tsx            # Formulario + reCAPTCHA simulado + código UUID
data/
  accounts.json         # Cuentas de ahorro (mock)
```

---

## Tecnologías

- [Next.js](https://nextjs.org) (App Router)
- React 19
- TypeScript
- Tailwind CSS
