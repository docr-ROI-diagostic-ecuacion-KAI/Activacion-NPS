import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const logoUrl = 'https://docroi.marketing/wp-content/uploads/2024/12/Logo_Doctor_ROI.jpg';
const docRoiHomeUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';
const workflowUrl = `${import.meta.env.BASE_URL}doc_roi_pildora_nps_n8n_workflow.json`;
const tabs = ['Bienvenida', 'Encuesta', 'Publica', 'n8n', 'Creatividades', 'Activos', 'Personalización', 'Analytics', 'Siguiente paso'];
const tabIds = tabs.map((tab) => tab.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '-'));

function copy(text) {
  navigator.clipboard.writeText(text);
}

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Panel({ title, children }) {
  return <article className="panel">{title && <h2>{title}</h2>}{children}</article>;
}

function Hero({ eyebrow, title, children }) {
  return <div className="hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="lead">{children}</div></div>;
}

function Workbench({ title, text, filename }) {
  const [done, setDone] = useState(false);
  return <Panel title={title}><textarea className="workbench" value={text} readOnly /><div className="button-row"><button onClick={() => { copy(text); setDone(true); setTimeout(() => setDone(false), 1400); }}>{done ? 'Copiado' : 'Copiar'}</button><button className="secondary" onClick={() => download(filename, text)}>Descargar .txt</button></div></Panel>;
}

function App() {
  const [active, setActive] = useState('bienvenida');
  function goToSection(sectionId) {
    setActive(sectionId);
    window.requestAnimationFrame(() => document.getElementById('doc-roi-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  const navStyle = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' };
  const linkStyle = { width: 'auto', minHeight: 40, color: '#f6f7f9', background: 'transparent', borderColor: 'rgba(246,247,249,.22)', whiteSpace: 'nowrap' };
  const ctaStyle = { width: 'auto', minHeight: 40, color: '#0b0f19', background: '#fff', borderColor: 'rgba(246,247,249,.85)', whiteSpace: 'nowrap' };
  return <div className="app-shell"><header className="topbar"><a className="brand" href={docRoiHomeUrl} aria-label="Ir al Botiquín DOC ROI"><img src={logoUrl} alt="DOC ROI" /><div><strong>Connection XX</strong><span>Automatiza tu NPS con IA</span></div></a><nav style={navStyle} aria-label="Navegación principal DOC ROI"><button type="button" style={linkStyle} onClick={() => goToSection('bienvenida')}>Método</button><button type="button" style={linkStyle} onClick={() => goToSection('n8n')}>Recursos</button><button type="button" style={ctaStyle} onClick={() => goToSection('encuesta')}>Abrir herramienta</button></nav></header><main className="layout"><nav className="tabs">{tabs.map((tab, i) => <button key={tab} className={active === tabIds[i] ? 'active' : ''} onClick={() => setActive(tabIds[i])}>{tab}</button>)}</nav><section className="content" id="doc-roi-content"><Page id={active} /></section></main></div>;
}

function Page({ id }) {
  if (id === 'bienvenida') return <Welcome />;
  if (id === 'encuesta') return <Survey />;
  if (id === 'publica') return <Publish />;
  if (id === 'n8n') return <Automation />;
  if (id === 'creatividades') return <Creatives />;
  if (id === 'activos') return <Assets />;
  if (id === 'personalizacion') return <Personalization />;
  if (id === 'analytics') return <Analytics />;
  return <NextStep />;
}

function Welcome() {
  return <><Hero eyebrow="Píldora formativa Doc ROI" title="Convierte la voz del cliente en acción automatizada"><p>El NPS no sirve solo para medir satisfacción. Sirve para convertir una señal del cliente en una acción: guardar el dato, segmentar, personalizar y activar una respuesta.</p></Hero><div className="grid two"><Panel title="Qué vas a aprender"><ul><li>NPS, promotores, pasivos y detractores.</li><li>Automatización con n8n y JSON importable.</li><li>Google Sheets como base operativa.</li><li>IA generativa para creatividades por segmento.</li><li>Emails personalizados y analytics básico.</li></ul></Panel><Panel title="Circuito"><div className="flow"><span>Encuesta</span><span>Webhook</span><span>Clasificación</span><span>Sheets</span><span>Email</span><span>Analytics</span></div><p>La lógica se prepara para evolucionar hacia RFM dinámico.</p></Panel></div></>;
}

function Survey() {
  const [vars, setVars] = useState({ empresa: 'Doc ROI Dental', producto: 'programa de fidelización', sector: 'salud dental premium', objetivo: 'detectar satisfacción y fricciones', tono: 'clínico, cercano y ejecutivo', campos: 'nombre, email, puntuación, causa raíz, comentario y consentimiento' });
  const prompt = `Actúa como especialista en investigación de cliente y UX formativa. Diseña una encuesta NPS para ${vars.empresa}, empresa del sector ${vars.sector}. Producto: ${vars.producto}. Objetivo: ${vars.objetivo}. Tono: ${vars.tono}. Campos obligatorios: ${vars.campos}. Incluye pregunta NPS de 0 a 10, causa raíz, pregunta abierta, privacidad, agradecimiento segmentado y estructura HTML responsive para WordPress, GitHub Pages o Vercel.`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Encuesta NPS - ${vars.empresa}</title></head><body><main><h1>Ayúdanos a mejorar ${vars.producto}</h1><form method="post" action="TU_WEBHOOK_N8N"><input name="name" placeholder="Nombre" required><input name="email" type="email" placeholder="Email" required><label>¿Qué probabilidad hay de que recomiendes ${vars.empresa}?</label><input name="score" type="number" min="0" max="10" required><select name="root_cause"><option>producto</option><option>precio</option><option>soporte</option><option>entrega</option><option>expectativas</option></select><textarea name="comment" placeholder="Cuéntanos el motivo"></textarea><button>Enviar valoración</button></form></main></body></html>`;
  return <><Hero eyebrow="Diseña tu encuesta NPS" title="Una pregunta sencilla, una arquitectura accionable"><p>Promotores: 9-10. Pasivos: 7-8. Detractores: 0-6. El valor aparece cuando cada segmento dispara una acción.</p></Hero><Panel title="Variables editables"><div className="form-grid">{Object.entries(vars).map(([k, v]) => <label key={k}><span>{k}</span><input value={v} onChange={(e) => setVars({ ...vars, [k]: e.target.value })} /></label>)}</div></Panel><Panel title="Errores frecuentes"><ul><li>Preguntar demasiado.</li><li>No capturar causa raíz.</li><li>Medir sin automatizar la respuesta.</li><li>No conectar con Google Sheets.</li></ul></Panel><Workbench title="Prompt maestro" text={prompt} filename="prompt_maestro_encuesta_nps.txt" /><Workbench title="HTML de encuesta" text={html} filename="encuesta_nps.html" /></>;
}

function Publish() {
  return <><Hero eyebrow="Publica tu encuesta" title="Tres rutas para poner el formulario en producción"><p>El objetivo es publicar un formulario estable que envíe respuestas al webhook de n8n.</p></Hero><div className="grid three"><Panel title="WordPress"><ol><li>Nueva página.</li><li>Bloque HTML.</li><li>Pegar formulario.</li><li>Sustituir webhook.</li></ol></Panel><Panel title="GitHub + Vercel"><ol><li>Repositorio.</li><li>Conectar Vercel.</li><li>Dominio.</li><li>Prueba interna.</li></ol></Panel><Panel title="Landing simple"><ol><li>Copiar HTML.</li><li>Reducir distracciones.</li><li>Medir envíos.</li></ol></Panel></div><div className="video-placeholder">Vídeo técnico pendiente: publicar encuesta NPS</div></>;
}

function Automation() {
  const nodes = ['Webhook captura encuesta', 'Código clasifica NPS', 'Google Sheets guarda respuesta', 'Google Sheets busca creatividad', 'Código compone email', 'Switch separa promotor/pasivo/detractor', 'Gmail envía email personalizado', 'Google Sheets registra envío', 'Respond confirma recepción'];
  return <><Hero eyebrow="Automatiza la captura con n8n" title="Del formulario a la acción sin backend propio"><p>n8n usa nodos. Un webhook recibe datos, un JSON describe el flujo y Google Sheets actúa como base operativa.</p></Hero><Panel title="Workflow base"><p>Importa el JSON, configura Google Sheets y Gmail, sustituye IDs y publica el webhook.</p><div className="button-row"><a className="button" href={workflowUrl} download>Descargar workflow n8n</a><button className="secondary" onClick={async () => copy(await (await fetch(workflowUrl)).text())}>Copiar JSON</button></div></Panel><Panel title="Nodo a nodo"><div className="node-list">{nodes.map((n, i) => <div key={n}><span>{String(i + 1).padStart(2, '0')}</span><strong>{n}</strong></div>)}</div></Panel></>;
}

function Creatives() {
  const [segment, setSegment] = useState('Promotor');
  const [fields, setFields] = useState({ buyer: 'Director de marketing de clínica premium', producto: 'Servicio principal', logo: 'URL del logo', canal: 'Email + landing', objetivo: 'Activar siguiente acción', tono: 'clínico, sobrio y ejecutivo', formato: 'Creatividad para email', cta: 'Ver siguiente paso', restricciones: 'Sin cartoon, limpio, premium', destino: 'https://empresa.com' });
  const extras = segment === 'Promotor' ? 'Puede convertirse en recomendador. Trabaja Producto, Precio, Distribución / Place y Promoción: versión premium, bundle, descuento por recomendación, testimonio, referido y caso de éxito.' : segment === 'Pasivo' ? 'Suele indicar propuesta de valor débil. Explora beneficio no claro, objeción e incentivo. Acciones: refuerzo de valor, prueba guiada, demostración y contenido educativo.' : 'Es fuente de mejora. Clasifica causa raíz: experiencia cliente, actitud comercial, precio, producto, entrega, soporte, comunicación o expectativas incumplidas. Acciones: disculpa, recuperación, compensación, llamada humana y resolución prioritaria.';
  const prompt = useMemo(() => `Actúa como estratega creativo de marketing relacional. Segmento NPS: ${segment}. Buyer persona: ${fields.buyer}. Ficha de producto: ${fields.producto}. Logo: ${fields.logo}. Canal: ${fields.canal}. Objetivo: ${fields.objetivo}. Tono: ${fields.tono}. Formato: ${fields.formato}. CTA: ${fields.cta}. Restricciones visuales: ${fields.restricciones}. Enlace destino: ${fields.destino}. ${extras} Genera asunto, texto introductorio, prompt de imagen, CTA y versión breve para Google Sheets.`, [segment, fields, extras]);
  return <><Hero eyebrow="Creatividades IA por segmento" title="La misma nota NPS no debe recibir la misma respuesta"><p>Promotor recomienda, pasivo necesita valor más claro y detractor exige recuperación operativa.</p></Hero><div className="segmented">{['Promotor', 'Pasivo', 'Detractor'].map((s) => <button key={s} className={segment === s ? 'active' : ''} onClick={() => setSegment(s)}>{s}</button>)}</div><Panel title={`${segment} · prompt personalizable`}><p>{extras}</p><div className="form-grid">{Object.entries(fields).map(([k, v]) => <label key={k}><span>{k}</span><input value={v} onChange={(e) => setFields({ ...fields, [k]: e.target.value })} /></label>)}</div></Panel><Workbench title="Prompt final" text={prompt} filename={`prompt_${segment.toLowerCase()}_nps.txt`} /></>;
}

function Assets() {
  const headers = ['lookup_key', 'nps_segment', 'root_cause', 'subject', 'body_intro', 'image_url', 'landing_url', 'action_text', 'cta'];
  const rows = ['promotor_recomendacion', 'pasivo_propuesta_valor', 'detractor_precio', 'detractor_entrega', 'detractor_soporte', 'detractor_experiencia_comercial'];
  return <><Hero eyebrow="Carga de activos" title="Google Sheets como biblioteca de creatividades"><p>Guarda creatividades y copies en una hoja accesible para que n8n pueda buscar la pieza correcta por segmento y causa raíz.</p></Hero><Panel title="Columnas recomendadas"><div className="tag-list">{headers.map((h) => <span key={h}>{h}</span>)}</div></Panel><Panel title="Ejemplos de lookup_key"><div className="tag-list">{rows.map((r) => <span key={r}>{r}</span>)}</div><p>Las imágenes deben tener URL pública o compartible.</p></Panel></>;
}

function Personalization() {
  return <><Hero eyebrow="Personalización automática" title="Formulario → Webhook → Clasificación → Sheets → Creatividad → Email"><p>No se envían correos reales desde esta app. n8n los enviará cuando el workflow esté activo.</p></Hero><div className="grid three"><Panel title="Email promotor"><p className="subject">¿Nos ayudas a recomendar esta experiencia?</p><p>Gracias por tu valoración. Hemos preparado un acceso para que puedas recomendar el servicio.</p></Panel><Panel title="Email pasivo"><p className="subject">Queremos que el valor quede más claro</p><p>Te dejamos una guía breve con beneficios que quizá no explicamos bien.</p></Panel><Panel title="Email detractor"><p className="subject">Queremos revisar lo ocurrido contigo</p><p>Tu respuesta pasa a revisión prioritaria para entender y resolver el problema.</p></Panel></div></>;
}

function Analytics() {
  return <><Hero eyebrow="Analytics básico" title="Medir menos, decidir mejor"><p>Dashboard recomendado: NPS medio, % promotores, % pasivos, % detractores, volumen, causas raíz, tasa de envíos y evolución temporal.</p></Hero><div className="metric-grid">{['NPS medio', '% promotores', '% pasivos', '% detractores', 'Volumen', 'Causas raíz', 'Tasa de envíos', 'Evolución temporal'].map((m) => <div key={m}>{m}</div>)}</div><Panel title="Looker Studio"><p>Conecta Google Sheets como fuente y crea filtros por periodo, segmento y causa raíz.</p></Panel></>;
}

function NextStep() {
  return <><Hero eyebrow="Siguiente paso" title="Ya has medido satisfacción. Ahora conecta NPS con RFM dinámico."><p>NPS dice cómo se siente el cliente. RFM dice cuánto valor genera, cuándo compra y con qué frecuencia. La unión NPS + RFM abre inteligencia comercial real.</p></Hero><div className="grid two"><Panel title="NPS"><p>Percepción, riesgo emocional, recomendación y fricción.</p></Panel><Panel title="RFM"><p>Recencia, frecuencia y valor monetario para priorizar acciones.</p></Panel></div></>;
}

createRoot(document.getElementById('root')).render(<App />);
