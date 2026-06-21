# Connection XX · Automatiza tu NPS con IA

Aplicación formativa estática para Doc ROI construida con React + Vite.

## Qué incluye

- Píldora completa en castellano sobre NPS, n8n, Google Sheets, Gmail, creatividades IA y analytics básico.
- Navegación por pestañas y subpestañas para promotor, pasivo y detractor.
- Prompt maestro para crear una encuesta NPS.
- Generador de estructura HTML de encuesta.
- Prompts personalizables por segmento NPS.
- Botones para copiar al portapapeles y descargar prompts en `.txt`.
- Workflow base n8n descargable desde `public/doc_roi_pildora_nps_n8n_workflow.json`.
- Diseño responsive, mobile-first y preparado para Vercel.

## Instalación

```bash
npm install
npm run dev
```

La app quedará disponible en la URL local que muestre Vite.

## Compilación

```bash
npm run build
```

El resultado de producción se genera en `dist/`.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, crea un nuevo proyecto desde ese repositorio.
3. Mantén la configuración por defecto:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Despliega.

## n8n

El archivo `public/doc_roi_pildora_nps_n8n_workflow.json` es un workflow base de formación. Antes de activarlo en producción:

- Sustituye los IDs de Google Sheets.
- Configura credenciales de Google Sheets y Gmail.
- Publica el webhook de producción.
- Haz una prueba interna antes de enviarlo a clientes reales.
