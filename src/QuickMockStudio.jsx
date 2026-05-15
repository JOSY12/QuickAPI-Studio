import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Plus,
  Trash2,
  Copy,
  Play,
  Check,
  ChevronDown,
  Loader2,
  Pencil,
  Save,
  Zap,
  Globe,
  FolderOpen,
  Code2,
  Eye,
  AlertCircle,
  CheckCircle2,
  Database,
  Settings,
  Sun,
  Moon,
  ChevronRight,
  Hash,
  Clock,
  AlertTriangle
} from 'lucide-react'

// ─── i18n ─────────────────────────────────────────────────────────────────────

const T = {
  en: {
    tagline: 'Build · Test · Ship',
    local: 'LOCAL',
    profiles: 'Profiles',
    noProfiles: 'No profiles yet.\nCreate one to start.',
    addRequest: 'Add request',
    config: 'Config',
    selectProfile: 'Select or create a profile to start',
    requestName: 'Request Name',
    requestNamePlaceholder: 'My request',
    httpMethod: 'Method',
    baseUrl: 'Base URL',
    baseUrlPlaceholder: 'https://api.example.com',
    path: 'Path',
    pathPlaceholder: '/users/1',
    headers: 'Request Headers',
    addHeader: 'Add header',
    requestBody: 'Request Body',
    bodyOptional: 'Body is optional for this method',
    saveRequest: 'Save Request',
    saved: 'Saved!',
    responseBody: 'Response',
    validJson: 'VALID JSON',
    invalidJson: 'INVALID JSON',
    format: 'Format',
    preview: 'Response',
    send: 'Send Request',
    sending: 'Sending...',
    fixJson: 'Fix JSON errors before sending',
    waitingResponse: 'Waiting for response...',
    pressRun: 'Configure a request and press Send',
    selectProfileToStart: 'Select a profile to get started',
    responseHeaders: 'Response Headers',
    copied: 'Copied!',
    copy: 'Copy',
    copyResponse: 'Copy Response',
    newProfile: 'New Profile',
    rename: 'Rename',
    delete: 'Delete',
    switchLight: 'Light mode',
    switchDark: 'Dark mode',
    status: 'Status',
    time: 'Time',
    size: 'Size',
    error: 'Request failed',
    corsNote:
      'CORS error — the server blocked this request from the browser. Try enabling CORS on the server or use a proxy.',
    noResponse: 'No response yet',
    keyPlaceholder: 'Header-Name',
    valuePlaceholder: 'value',
    delay: 'Send Delay',
    pretty: 'Pretty',
    raw: 'Raw'
  },
  es: {
    tagline: 'Construye · Prueba · Lanza',
    local: 'LOCAL',
    profiles: 'Perfiles',
    noProfiles: 'Sin perfiles aún.\nCrea uno para empezar.',
    addRequest: 'Agregar petición',
    config: 'Configuración',
    selectProfile: 'Selecciona o crea un perfil para comenzar',
    requestName: 'Nombre de la Petición',
    requestNamePlaceholder: 'Mi petición',
    httpMethod: 'Método',
    baseUrl: 'URL Base',
    baseUrlPlaceholder: 'https://api.ejemplo.com',
    path: 'Ruta',
    pathPlaceholder: '/usuarios/1',
    headers: 'Cabeceras de Petición',
    addHeader: 'Agregar cabecera',
    requestBody: 'Cuerpo de la Petición',
    bodyOptional: 'El cuerpo es opcional para este método',
    saveRequest: 'Guardar Petición',
    saved: '¡Guardado!',
    responseBody: 'Respuesta',
    validJson: 'JSON VÁLIDO',
    invalidJson: 'JSON INVÁLIDO',
    format: 'Formatear',
    preview: 'Respuesta',
    send: 'Enviar Petición',
    sending: 'Enviando...',
    fixJson: 'Corrige los errores JSON antes de enviar',
    waitingResponse: 'Esperando respuesta...',
    pressRun: 'Configura una petición y presiona Enviar',
    selectProfileToStart: 'Selecciona un perfil para comenzar',
    responseHeaders: 'Cabeceras de Respuesta',
    copied: '¡Copiado!',
    copy: 'Copiar',
    copyResponse: 'Copiar Respuesta',
    newProfile: 'Nuevo Perfil',
    rename: 'Renombrar',
    delete: 'Eliminar',
    switchLight: 'Modo claro',
    switchDark: 'Modo oscuro',
    status: 'Estado',
    time: 'Tiempo',
    size: 'Tamaño',
    error: 'Petición fallida',
    corsNote:
      'Error CORS — el servidor bloqueó esta petición desde el navegador. Habilita CORS en el servidor o usa un proxy.',
    noResponse: 'Sin respuesta aún',
    keyPlaceholder: 'Nombre-Cabecera',
    valuePlaceholder: 'valor',
    delay: 'Retardo de Envío',
    pretty: 'Formateado',
    raw: 'Sin formato'
  }
}

// ─── Theme ────────────────────────────────────────────────────────────────────

const THEME = {
  dark: {
    bg: '#0e0e0e',
    bgAlt: '#0c0c0c',
    bgPanel: '#0f0f0f',
    bgInput: '#1a1a1a',
    bgCode: '#141414',
    bgLineNum: '#111111',
    border: '#222222',
    border2: '#252525',
    border3: '#2e2e2e',
    border4: '#383838',
    textPrimary: '#f0f0f0',
    textSec: '#d8d8d8',
    textMuted: '#b0b0b0',
    textDim: '#f0f0f0',
    textDimmer: '#6a6a6a',
    textDimmest: '#505050',
    jsonText: '#e0e0e0',
    jsonResult: '#7fd6a0',
    hoverBg: 'rgba(255,255,255,0.06)',
    hoverBg2: 'rgba(255,255,255,0.1)',
    dropdownBg: '#1a1a1a'
  },
  light: {
    bg: '#f0f0f2',
    bgAlt: '#e8e8ea',
    bgPanel: '#f5f5f7',
    bgInput: '#ffffff',
    bgCode: '#f8f8fa',
    bgLineNum: '#e0e0e2',
    border: '#d4d4d6',
    border2: '#cacaca',
    border3: '#bcbcbe',
    border4: '#ababac',
    textPrimary: '#0a0a0a',
    textSec: '#1c1c1c',
    textMuted: '#3a3a3a',
    textDim: '#0a0a0a',
    textDimmer: '#777777',
    textDimmest: '#999999',
    jsonText: '#12121e',
    jsonResult: '#145c35',
    hoverBg: 'rgba(0,0,0,0.05)',
    hoverBg2: 'rgba(0,0,0,0.09)',
    dropdownBg: '#ffffff'
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS'
]
const METHOD_COLORS = {
  GET: {
    tw: 'text-emerald-500',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30'
  },
  POST: {
    tw: 'text-blue-500',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30'
  },
  PUT: {
    tw: 'text-amber-500',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30'
  },
  PATCH: {
    tw: 'text-purple-500',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/30'
  },
  DELETE: {
    tw: 'text-red-500',
    bg: 'bg-red-500/15',
    border: 'border-red-500/30'
  },
  HEAD: {
    tw: 'text-cyan-500',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/30'
  },
  OPTIONS: {
    tw: 'text-pink-500',
    bg: 'bg-pink-500/15',
    border: 'border-pink-500/30'
  }
}

const STATUS_COLORS = {
  ok: 'text-emerald-500',
  redirect: 'text-amber-500',
  client: 'text-orange-500',
  server: 'text-red-500',
  unknown: 'text-gray-400'
}

function statusColor(code) {
  if (!code) return STATUS_COLORS.unknown
  if (code < 300) return STATUS_COLORS.ok
  if (code < 400) return STATUS_COLORS.redirect
  if (code < 500) return STATUS_COLORS.client
  return STATUS_COLORS.server
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

const NO_BODY_METHODS = [] // body is always optional regardless of method

const DEFAULT_JSON = `{
  "key": "value"
}`

// ─── useLocalStorage ──────────────────────────────────────────────────────────

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try {
      const i = localStorage.getItem(key)
      return i ? JSON.parse(i) : init
    } catch {
      return init
    }
  })
  const set = useCallback(
    (v) => {
      try {
        const nv = v instanceof Function ? v(val) : v
        setVal(nv)
        localStorage.setItem(key, JSON.stringify(nv))
      } catch (e) {
        console.error(e)
      }
    },
    [key, val]
  )
  return [val, set]
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const genId = () => Math.random().toString(36).substring(2, 10)
const isValidUrl = (s) => {
  try {
    new URL(s)
    return true
  } catch {
    return false
  }
}
const tryJson = (s) => {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
const prettyJson = (s) => {
  try {
    return JSON.stringify(JSON.parse(s), null, 2)
  } catch {
    return s
  }
}
const isJson = (s) => {
  try {
    JSON.parse(s)
    return true
  } catch {
    return false
  }
}

function buildFullUrl(base, path) {
  if (!base) return path || ''
  const b = base.replace(/\/$/, '')
  const p = path ? (path.startsWith('/') ? path : '/' + path) : ''
  return b + p
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MethodBadge({ method }) {
  const c = METHOD_COLORS[method] || METHOD_COLORS.GET
  return (
    <span
      className={`font-mono font-bold tracking-widest border rounded text-[10px] px-1.5 py-0.5 ${c.bg} ${c.tw} ${c.border}`}
    >
      {method}
    </span>
  )
}

function MethodSelector({ value, onChange, th }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const c = METHOD_COLORS[value] || METHOD_COLORS.GET
  return (
    <div ref={ref} className='relative shrink-0'>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${c.bg} ${c.border} ${c.tw} font-mono font-bold text-xs tracking-widest hover:brightness-110 transition-all`}
        style={{ minWidth: '7.5rem' }}
      >
        {value}
        <ChevronDown
          size={11}
          className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          className='absolute top-full mt-1 left-0 z-50 rounded-lg shadow-2xl overflow-hidden'
          style={{
            background: th.dropdownBg,
            border: `1px solid ${th.border4}`,
            minWidth: '7.5rem'
          }}
        >
          {HTTP_METHODS.map((m) => {
            const mc = METHOD_COLORS[m]
            return (
              <button
                key={m}
                onClick={() => {
                  onChange(m)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2 font-mono font-bold text-xs tracking-widest ${mc.tw} transition-colors`}
                style={{
                  background: value === m ? th.hoverBg2 : 'transparent'
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = th.hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    value === m ? th.hoverBg2 : 'transparent')
                }
              >
                {m}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CopyButton({ text, label, labelDone, th }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${copied ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' : ''}`}
      style={
        !copied
          ? {
              background: th.hoverBg,
              color: th.textMuted,
              borderColor: th.border4
            }
          : {}
      }
    >
      {copied ? (
        <>
          <Check size={12} /> {labelDone}
        </>
      ) : (
        <>
          <Copy size={12} /> {label}
        </>
      )}
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function QuickAPIStudio() {
  const [profiles, setProfiles] = useLocalStorage('qa_profiles', [])
  const [activeProfileId, setActiveProfileId] = useLocalStorage(
    'qa_active_profile',
    null
  )
  const [activeRequestId, setActiveRequestId] = useLocalStorage(
    'qa_active_request',
    null
  )
  const [isDark, setIsDark] = useLocalStorage('qa_dark', true)
  const [lang, setLang] = useLocalStorage('qa_lang', 'en')

  const t = T[lang] || T.en
  const th = isDark ? THEME.dark : THEME.light

  const [editingProfileId, setEditingProfileId] = useState(null)
  const [editingProfileName, setEditingProfileName] = useState('')

  // Request editor
  const [method, setMethod] = useState('GET')
  const [baseUrl, setBaseUrl] = useState('https://jsonplaceholder.typicode.com')
  const [path, setPath] = useState('/posts/1')
  const [reqHeaders, setReqHeaders] = useState([
    { id: genId(), key: '', value: '', enabled: true }
  ])
  const [jsonBody, setJsonBody] = useState(DEFAULT_JSON)
  const [requestName, setRequestName] = useState('')

  const [delay, setDelay] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [response, setResponse] = useState(null) // { status, statusText, headers, body, time, size, error, isCors }
  const [responseView, setResponseView] = useState('pretty') // pretty | raw

  // UI
  const [isSaved, setIsSaved] = useState(false)

  const needsBody = !NO_BODY_METHODS.includes(method)
  const isJsonValid = isJson(jsonBody)
  const fullUrl = buildFullUrl(baseUrl, path)
  // Body is always optional - only block if there IS a body and it's invalid JSON
  const canSend = isValidUrl(fullUrl) && (jsonBody.trim() === '' || isJsonValid)

  const activeProfile = profiles.find((p) => p.id === activeProfileId)
  const activeRequest = activeProfile?.requests?.find(
    (r) => r.id === activeRequestId
  )

  useEffect(() => {
    if (activeRequest) {
      setMethod(activeRequest.method)
      setBaseUrl(activeRequest.baseUrl || '')
      setPath(activeRequest.path || '')
      setReqHeaders(
        activeRequest.headers?.length
          ? activeRequest.headers
          : [{ id: genId(), key: '', value: '', enabled: true }]
      )
      setJsonBody(activeRequest.body || DEFAULT_JSON)
      setRequestName(activeRequest.name)
      setResponse(null)
    }
  }, [activeRequestId, activeProfileId])

  // ── Profile ops ──────────────────────────────────────────────────────────
  function createProfile() {
    const id = genId()
    setProfiles((prev) => [
      ...prev,
      { id, name: `Profile ${prev.length + 1}`, requests: [] }
    ])
    setActiveProfileId(id)
    setActiveRequestId(null)
    setResponse(null)
  }
  function deleteProfile(id) {
    setProfiles((prev) => prev.filter((p) => p.id !== id))
    if (activeProfileId === id) {
      const rem = profiles.filter((p) => p.id !== id)
      setActiveProfileId(rem[0]?.id || null)
      setActiveRequestId(null)
    }
  }
  function startRename(p) {
    setEditingProfileId(p.id)
    setEditingProfileName(p.name)
  }
  function commitRename() {
    if (!editingProfileName.trim()) return
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === editingProfileId
          ? { ...p, name: editingProfileName.trim() }
          : p
      )
    )
    setEditingProfileId(null)
  }

  // ── Request ops ──────────────────────────────────────────────────────────
  function createRequest() {
    if (!activeProfileId) return
    const id = genId()
    const req = {
      id,
      name: 'New Request',
      method: 'GET',
      baseUrl: '',
      path: '/',
      headers: [],
      body: ''
    }
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfileId ? { ...p, requests: [...p.requests, req] } : p
      )
    )
    setActiveRequestId(id)
  }
  function saveRequest() {
    if (!activeProfileId) return
    const reqData = {
      id: activeRequestId || genId(),
      name: requestName || 'Request',
      method,
      baseUrl,
      path,
      headers: reqHeaders.filter((h) => h.key.trim()),
      body: jsonBody
    }
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p
        const exists = p.requests.find((r) => r.id === reqData.id)
        return {
          ...p,
          requests: exists
            ? p.requests.map((r) => (r.id === reqData.id ? reqData : r))
            : [...p.requests, reqData]
        }
      })
    )
    setActiveRequestId(reqData.id)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }
  function deleteRequest(reqId) {
    if (!activeProfileId) return
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfileId
          ? { ...p, requests: p.requests.filter((r) => r.id !== reqId) }
          : p
      )
    )
    if (activeRequestId === reqId) {
      const rem = activeProfile?.requests?.filter((r) => r.id !== reqId) || []
      setActiveRequestId(rem[0]?.id || null)
    }
  }

  // ── Headers editor ────────────────────────────────────────────────────────
  function addHeader() {
    setReqHeaders((prev) => [
      ...prev,
      { id: genId(), key: '', value: '', enabled: true }
    ])
  }
  function updateHeader(id, field, val) {
    setReqHeaders((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: val } : h))
    )
  }
  function removeHeader(id) {
    setReqHeaders((prev) => prev.filter((h) => h.id !== id))
  }

  // ── Send real request ─────────────────────────────────────────────────────
  async function sendRequest() {
    if (!canSend) return
    setIsSending(true)
    setResponse(null)

    const start = Date.now()

    // Apply configured delay before sending
    if (delay > 0) await new Promise((r) => setTimeout(r, delay))
    const headers = {}

    // Add custom headers
    reqHeaders.forEach((h) => {
      if (h.enabled && h.key.trim()) headers[h.key.trim()] = h.value
    })

    // Auto content-type when body has content
    if (
      jsonBody.trim() &&
      !headers['Content-Type'] &&
      !headers['content-type']
    ) {
      if (isJsonValid) headers['Content-Type'] = 'application/json'
    }

    const fetchOpts = { method, headers }
    if (jsonBody.trim()) {
      fetchOpts.body = jsonBody
    }

    try {
      const res = await fetch(fullUrl, fetchOpts)
      const elapsed = Date.now() - start
      const rawText = await res.text()
      const size = new TextEncoder().encode(rawText).length

      const resHeaders = {}
      res.headers.forEach((v, k) => {
        resHeaders[k] = v
      })

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: resHeaders,
        body: rawText,
        time: elapsed,
        size,
        error: null,
        isCors: false
      })
    } catch (err) {
      const elapsed = Date.now() - start
      const isCors =
        err.message?.toLowerCase().includes('failed to fetch') ||
        err.message?.toLowerCase().includes('cors') ||
        err.message?.toLowerCase().includes('network')
      setResponse({
        status: null,
        statusText: null,
        headers: {},
        body: null,
        time: elapsed,
        size: 0,
        error: err.message || t.error,
        isCors
      })
    } finally {
      setIsSending(false)
    }
  }

  // ── Keyboard shortcut Ctrl+Enter ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') sendRequest()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  // ── Render helpers ────────────────────────────────────────────────────────
  const prettyBody = (() => {
    if (!response?.body) return ''
    if (responseView === 'pretty') {
      const ct = response.headers?.['content-type'] || ''
      if (ct.includes('json') || isJson(response.body))
        return prettyJson(response.body)
    }
    return response.body
  })()

  const inputStyle = {
    background: th.bgInput,
    border: `1px solid ${th.border3}`,
    color: th.textPrimary
  }
  const labelStyle = { color: th.textDim }
  const colHdrStyle = { borderBottom: `1px solid ${th.border}` }

  return (
    <div
      style={{
        background: th.bg,
        color: th.textPrimary,
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${th.border4}; border-radius: 2px; }
        textarea { resize: none; }
        @keyframes qa-spin { to { transform: rotate(360deg); } }
        .qa-spin { animation: qa-spin 0.7s linear infinite; }
        @keyframes qa-pdot { 0%,100%{opacity:1}50%{opacity:.3} }
        .qa-pdot { animation: qa-pdot 1s infinite; }
        .qa-hover:hover { background: ${th.hoverBg} !important; }
        .qa-tr { transition: background 0.2s, color 0.2s, border-color 0.2s; }
        .latency-slider {
          -webkit-appearance: none; appearance: none; height: 4px;
          background: linear-gradient(to right, #3b82f6 0%, #3b82f6 var(--prog, 0%), ${th.border4} var(--prog, 0%), ${th.border4} 100%);
          border-radius: 2px; outline: none; width: 100%;
        }
        .latency-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
          background: #3b82f6; cursor: pointer; border: 2px solid ${th.bg}; box-shadow: 0 0 0 2px #3b82f633;
        }
        .latency-slider::-moz-range-thumb {
          width: 14px; height: 14px; border-radius: 50%; background: #3b82f6;
          cursor: pointer; border: 2px solid ${th.bg};
        }
        input:focus, textarea:focus { outline: none; border-color: rgba(59,130,246,0.5) !important; }
      `}</style>

      {/* ── Header ── */}
      <header
        className='qa-tr sticky top-0 z-40 flex items-center gap-4 px-5 py-3'
        style={{ background: th.bg, borderBottom: `1px solid ${th.border}` }}
      >
        <div className='flex items-center gap-2'>
          <div
            className='w-7 h-7 rounded-lg flex items-center justify-center'
            style={{
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.3)'
            }}
          >
            <Zap size={14} className='text-blue-500' />
          </div>
          <span className='text-sm font-bold tracking-tight'>
            Quick<span className='text-blue-500'>API</span> Studio
          </span>
        </div>
        <div className='h-4 w-px' style={{ background: th.border4 }} />
        <span
          className='text-[11px] tracking-widest uppercase hidden sm:block'
          style={{ color: th.textDimmer }}
        >
          {t.tagline}
        </span>

        <div className='ml-auto flex items-center gap-2'>
          <div
            className='flex items-center gap-1.5 px-2.5 py-1 rounded-full'
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 qa-pdot' />
            <span className='text-[10px] text-emerald-500 tracking-widest'>
              {t.local}
            </span>
          </div>
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'es' : 'en'))}
            className='qa-hover flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold tracking-widest transition-all'
            style={{ border: `1px solid ${th.border3}`, color: th.textMuted }}
          >
            <Globe size={11} /> {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setIsDark((d) => !d)}
            className='qa-hover flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all'
            style={{ border: `1px solid ${th.border3}`, color: th.textMuted }}
            title={isDark ? t.switchLight : t.switchDark}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </header>

      <div
        className='flex flex-1 overflow-hidden'
        style={{ height: 'calc(100vh - 49px)' }}
      >
        {/* ── Col 1: Profiles + Requests ── */}
        <aside
          className='qa-tr w-56 flex flex-col shrink-0 overflow-hidden'
          style={{
            background: th.bgAlt,
            borderRight: `1px solid ${th.border}`
          }}
        >
          <div
            className='px-3 py-3 flex items-center justify-between'
            style={colHdrStyle}
          >
            <div className='flex items-center gap-1.5'>
              <Database size={11} style={labelStyle} />
              <span
                className='text-[10px] font-bold tracking-widest uppercase'
                style={labelStyle}
              >
                {t.profiles}
              </span>
            </div>
            <button
              onClick={createProfile}
              className='w-6 h-6 rounded-md flex items-center justify-center text-blue-500'
              style={{
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.25)'
              }}
              title={t.newProfile}
            >
              <Plus size={11} />
            </button>
          </div>

          <div className='flex-1 overflow-y-auto py-2 px-2 space-y-0.5'>
            {profiles.length === 0 && (
              <div className='text-center py-8 px-3'>
                <FolderOpen
                  size={24}
                  className='mx-auto mb-2'
                  style={{ color: th.textDimmest }}
                />
                <p
                  className='text-[10px] leading-relaxed whitespace-pre-line'
                  style={{ color: th.textDimmer }}
                >
                  {t.noProfiles}
                </p>
              </div>
            )}
            {profiles.map((profile) => {
              const isActive = activeProfileId === profile.id
              return (
                <div key={profile.id}>
                  <div
                    className='group rounded-lg flex items-center gap-2 px-2 py-2 cursor-pointer transition-all'
                    style={{
                      background: isActive
                        ? 'rgba(59,130,246,0.08)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(59,130,246,0.2)'
                        : '1px solid transparent'
                    }}
                    onClick={() => {
                      setActiveProfileId(profile.id)
                      setActiveRequestId(null)
                    }}
                  >
                    {editingProfileId === profile.id ? (
                      <input
                        autoFocus
                        value={editingProfileName}
                        onChange={(e) => setEditingProfileName(e.target.value)}
                        onBlur={commitRename}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitRename()
                          if (e.key === 'Escape') setEditingProfileId(null)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='flex-1 rounded px-1.5 py-0.5 text-xs min-w-0'
                        style={{
                          background: th.bgInput,
                          border: '1px solid rgba(59,130,246,0.5)',
                          color: th.textPrimary
                        }}
                      />
                    ) : (
                      <>
                        <div
                          className='w-2 h-2 rounded-full shrink-0'
                          style={{
                            background: isActive ? '#3b82f6' : th.border4
                          }}
                        />
                        <span
                          className='text-xs truncate flex-1'
                          style={{ color: th.textSec }}
                        >
                          {profile.name}
                        </span>
                        <div className='hidden group-hover:flex items-center gap-1'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startRename(profile)
                            }}
                            className='p-0.5'
                            style={labelStyle}
                            title={t.rename}
                          >
                            <Pencil size={10} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteProfile(profile.id)
                            }}
                            className='p-0.5 text-red-500'
                            title={t.delete}
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {isActive && (
                    <div className='ml-4 mt-0.5 space-y-0.5'>
                      {profile.requests?.map((req) => {
                        const mc =
                          METHOD_COLORS[req.method] || METHOD_COLORS.GET
                        const isReqActive = activeRequestId === req.id
                        return (
                          <div
                            key={req.id}
                            className='group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all'
                            style={{
                              background: isReqActive
                                ? th.hoverBg2
                                : 'transparent',
                              border: isReqActive
                                ? `1px solid ${th.border3}`
                                : '1px solid transparent'
                            }}
                            onClick={() => setActiveRequestId(req.id)}
                          >
                            <span
                              className={`text-[9px] font-bold font-mono ${mc.tw} w-10 shrink-0`}
                            >
                              {req.method}
                            </span>
                            <span
                              className='text-[10px] truncate flex-1'
                              style={{ color: th.textMuted }}
                            >
                              {req.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteRequest(req.id)
                              }}
                              className='hidden group-hover:flex text-red-500'
                              title={t.delete}
                            >
                              <Trash2 size={9} />
                            </button>
                          </div>
                        )
                      })}
                      <button
                        onClick={createRequest}
                        className='qa-hover w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] transition-all'
                        style={{
                          color: th.textDim,
                          border: `1px dashed ${th.border3}`
                        }}
                      >
                        <Plus size={9} /> {t.addRequest}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>

        {/* ── Col 2: Config ── */}
        <div
          className='qa-tr w-72 flex flex-col shrink-0 overflow-hidden'
          style={{
            background: th.bgPanel,
            borderRight: `1px solid ${th.border}`
          }}
        >
          <div
            className='px-4 py-3 flex items-center gap-1.5'
            style={colHdrStyle}
          >
            <Settings size={11} style={labelStyle} />
            <span
              className='text-[10px] font-bold tracking-widest uppercase'
              style={labelStyle}
            >
              {t.config}
            </span>
          </div>

          {!activeProfileId ? (
            <div className='flex-1 flex items-center justify-center p-6 text-center'>
              <div>
                <FolderOpen
                  size={32}
                  className='mx-auto mb-3'
                  style={{ color: th.textDimmest }}
                />
                <p className='text-[11px]' style={{ color: th.textDimmer }}>
                  {t.selectProfile}
                </p>
              </div>
            </div>
          ) : (
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {/* Request Name */}
              <div className='space-y-1.5'>
                <label
                  className='text-[10px] uppercase tracking-widest'
                  style={labelStyle}
                >
                  {t.requestName}
                </label>
                <input
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder={t.requestNamePlaceholder}
                  className='w-full rounded-lg px-3 py-2 text-xs'
                  style={inputStyle}
                />
              </div>

              {/* Method */}
              <div className='space-y-1.5'>
                <label
                  className='text-[10px] uppercase tracking-widest'
                  style={labelStyle}
                >
                  {t.httpMethod}
                </label>
                <MethodSelector
                  value={method}
                  onChange={(m) => {
                    setMethod(m)
                  }}
                  th={th}
                />
              </div>

              {/* Base URL — first, above path */}
              <div className='space-y-1.5'>
                <label
                  className='text-[10px] uppercase tracking-widest flex items-center gap-1.5'
                  style={labelStyle}
                >
                  <Globe size={9} /> {t.baseUrl}
                </label>
                <input
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder={t.baseUrlPlaceholder}
                  className='w-full rounded-lg px-3 py-2 text-xs font-mono'
                  style={inputStyle}
                />
              </div>

              {/* Path */}
              <div className='space-y-1.5'>
                <label
                  className='text-[10px] uppercase tracking-widest'
                  style={labelStyle}
                >
                  {t.path}
                </label>
                <input
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder={t.pathPlaceholder}
                  className='w-full rounded-lg px-3 py-2 text-xs font-mono'
                  style={inputStyle}
                />
              </div>

              {/* Full URL preview */}
              <div
                className='rounded-lg p-2.5'
                style={{
                  background: th.bgInput,
                  border: `1px solid ${th.border3}`
                }}
              >
                <p
                  className='text-[8px] uppercase tracking-widest mb-1'
                  style={{ color: th.textDim }}
                >
                  {t.fullUrl}
                </p>
                <p
                  className='text-[9px] break-all leading-relaxed font-mono'
                  style={{
                    color: isValidUrl(fullUrl) ? '#3b82f6' : th.textDimmer
                  }}
                >
                  {fullUrl || '—'}
                </p>
              </div>

              {/* Request Headers */}
              <div className='space-y-1.5'>
                <div className='flex items-center justify-between'>
                  <label
                    className='text-[10px] uppercase tracking-widest'
                    style={labelStyle}
                  >
                    {t.headers}
                  </label>
                  <button
                    onClick={addHeader}
                    className='text-[9px] flex items-center gap-1 px-2 py-1 rounded transition-all text-blue-500'
                    style={{
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)'
                    }}
                  >
                    <Plus size={9} /> {t.addHeader}
                  </button>
                </div>
                <div className='space-y-1.5'>
                  {reqHeaders.map((h) => (
                    <div key={h.id} className='flex items-center gap-1.5'>
                      <input
                        value={h.key}
                        onChange={(e) =>
                          updateHeader(h.id, 'key', e.target.value)
                        }
                        placeholder={t.keyPlaceholder}
                        className='flex-1 rounded-md px-2 py-1.5 text-[10px] font-mono min-w-0'
                        style={{
                          ...inputStyle,
                          border: `1px solid ${th.border4}`
                        }}
                      />
                      <input
                        value={h.value}
                        onChange={(e) =>
                          updateHeader(h.id, 'value', e.target.value)
                        }
                        placeholder={t.valuePlaceholder}
                        className='flex-1 rounded-md px-2 py-1.5 text-[10px] font-mono min-w-0'
                        style={{
                          ...inputStyle,
                          border: `1px solid ${th.border4}`
                        }}
                      />
                      <button
                        onClick={() => removeHeader(h.id)}
                        className='text-red-500 shrink-0 p-1'
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send Delay */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label
                    className='text-[10px] uppercase tracking-widest'
                    style={labelStyle}
                  >
                    {t.delay}
                  </label>
                  <div
                    className='flex items-center gap-1 px-2 py-0.5 rounded-full'
                    style={{
                      background: th.bgInput,
                      border: `1px solid ${th.border3}`
                    }}
                  >
                    <span
                      className={`text-xs font-bold ${delay > 3000 ? 'text-red-500' : delay > 1000 ? 'text-amber-500' : delay > 0 ? 'text-blue-400' : 'text-emerald-500'}`}
                    >
                      {delay}
                    </span>
                    <span
                      className='text-[10px]'
                      style={{ color: th.textDimmer }}
                    >
                      ms
                    </span>
                  </div>
                </div>
                <input
                  type='range'
                  min={0}
                  max={5000}
                  step={50}
                  value={delay}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setDelay(v)
                    e.target.style.setProperty('--prog', `${(v / 5000) * 100}%`)
                  }}
                  ref={(el) => {
                    if (el)
                      el.style.setProperty('--prog', `${(delay / 5000) * 100}%`)
                  }}
                  className='latency-slider w-full cursor-pointer'
                />
                <div
                  className='flex justify-between text-[9px]'
                  style={{ color: th.textDimmer }}
                >
                  <span>0ms</span>
                  <span>2500ms</span>
                  <span>5000ms</span>
                </div>
              </div>

              {/* Save */}
              <button
                onClick={saveRequest}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all border ${isSaved ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' : 'text-blue-500 border-blue-500/30'}`}
                style={!isSaved ? { background: 'rgba(59,130,246,0.1)' } : {}}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 size={13} /> {t.saved}
                  </>
                ) : (
                  <>
                    <Save size={13} /> {t.saveRequest}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── Col 3: Body Editor ── */}
        <div
          className='qa-tr flex-1 flex flex-col overflow-hidden min-w-0'
          style={{ background: th.bg, borderRight: `1px solid ${th.border}` }}
        >
          <div
            className='px-4 py-3 flex items-center justify-between'
            style={colHdrStyle}
          >
            <div className='flex items-center gap-1.5'>
              <Code2 size={11} style={labelStyle} />
              <span
                className='text-[10px] font-bold tracking-widest uppercase'
                style={labelStyle}
              >
                {t.requestBody}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              {!needsBody && (
                <span
                  className='text-[9px] italic'
                  style={{ color: th.textDimmer }}
                >
                  {t.bodyOptional}
                </span>
              )}
              {jsonBody.trim() && (
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-bold tracking-widest border ${isJsonValid ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'}`}
                >
                  {isJsonValid ? (
                    <CheckCircle2 size={9} />
                  ) : (
                    <AlertCircle size={9} />
                  )}
                  {isJsonValid ? t.validJson : t.invalidJson}
                </div>
              )}
            </div>
          </div>

          <div className='flex-1 overflow-hidden relative'>
            {/* Line numbers */}
            <div
              className='absolute left-0 top-0 bottom-0 w-10 overflow-hidden pointer-events-none z-10 pt-4'
              style={{
                background: th.bgLineNum,
                borderRight: `1px solid ${th.border}`
              }}
            >
              {jsonBody.split('\n').map((_, i) => (
                <div
                  key={i}
                  className='text-[10px] text-right pr-2.5 leading-6'
                  style={{ color: th.textDimmest }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              value={jsonBody}
              onChange={(e) => setJsonBody(e.target.value)}
              className={`absolute inset-0 bg-transparent text-[12px] leading-6 pl-12 pr-4 pt-4 pb-4 font-mono w-full h-full border-0 ${jsonBody.trim() && !isJsonValid ? 'shadow-[inset_2px_0_0_#ef4444]' : ''}`}
              style={{
                color: th.jsonText,
                caretColor: '#3b82f6',
                outline: 'none'
              }}
              spellCheck={false}
              placeholder={`{\n  "key": "value"\n} `}
            />
          </div>
        </div>

        {/* ── Col 4: Response ── */}
        <div
          className='qa-tr w-96 flex flex-col shrink-0 overflow-hidden'
          style={{ background: th.bgAlt }}
        >
          <div
            className='px-4 py-3 flex items-center justify-between'
            style={colHdrStyle}
          >
            <div className='flex items-center gap-1.5'>
              <Eye size={11} style={labelStyle} />
              <span
                className='text-[10px] font-bold tracking-widest uppercase'
                style={labelStyle}
              >
                {t.preview}
              </span>
            </div>
            {response && !response.error && (
              <div
                className='flex items-center gap-3 text-[9px]'
                style={{ color: th.textDim }}
              >
                <span className={`font-bold ${statusColor(response.status)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className='flex items-center gap-1'>
                  <Clock size={9} /> {response.time}ms
                </span>
                <span>{formatBytes(response.size)}</span>
              </div>
            )}
          </div>

          {/* Send button */}
          <div
            className='p-4'
            style={{ borderBottom: `1px solid ${th.border}` }}
          >
            <button
              onClick={sendRequest}
              disabled={isSending || !canSend || !activeProfileId}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-wider transition-all border ${
                isSending || !canSend || !activeProfileId
                  ? 'cursor-not-allowed'
                  : 'bg-blue-500 text-white border-blue-600 hover:bg-blue-400 active:scale-95 shadow-lg shadow-blue-500/20'
              }`}
              style={
                isSending || !canSend || !activeProfileId
                  ? {
                      background: th.bgInput,
                      color: th.textDimmer,
                      borderColor: th.border3
                    }
                  : {}
              }
            >
              {isSending ? (
                <>
                  <Loader2 size={13} className='qa-spin' /> {t.sending}
                </>
              ) : (
                <>
                  <Play size={13} /> {t.send}
                </>
              )}
            </button>
            {!isValidUrl(fullUrl) && activeProfileId && (
              <p className='text-[10px] text-amber-500 mt-1.5 text-center'>
                Enter a valid URL to send
              </p>
            )}
            {jsonBody.trim() && !isJsonValid && (
              <p className='text-[10px] text-red-500 mt-1.5 text-center'>
                {t.fixJson}
              </p>
            )}
            <p
              className='text-[9px] text-center mt-1.5'
              style={{ color: th.textDimmest }}
            >
              Ctrl+Enter
            </p>
          </div>

          {/* Response area */}
          <div className='flex-1 overflow-y-auto p-4'>
            {isSending && (
              <div className='text-center py-8'>
                <div
                  className='w-10 h-10 rounded-full border-2 qa-spin mx-auto mb-3'
                  style={{ borderColor: th.border3, borderTopColor: '#3b82f6' }}
                />
                <p className='text-[11px]' style={{ color: th.textDim }}>
                  {t.waitingResponse}
                </p>
              </div>
            )}

            {!isSending && !response && (
              <div className='text-center py-8'>
                <div
                  className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3'
                  style={{
                    background: th.bgInput,
                    border: `1px solid ${th.border3}`
                  }}
                >
                  <Play size={18} style={{ color: th.textDimmest }} />
                </div>
                <p
                  className='text-[11px] leading-relaxed'
                  style={{ color: th.textDim }}
                >
                  {activeProfileId ? t.pressRun : t.selectProfileToStart}
                </p>
              </div>
            )}

            {!isSending && response?.error && (
              <div className='space-y-3'>
                <div className='flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20'>
                  <AlertTriangle
                    size={13}
                    className='text-red-500 mt-0.5 shrink-0'
                  />
                  <div>
                    <p className='text-[10px] text-red-500 font-bold mb-1'>
                      {t.error}
                    </p>
                    <p
                      className='text-[10px] font-mono'
                      style={{ color: th.textMuted }}
                    >
                      {response.error}
                    </p>
                  </div>
                </div>
                {response.isCors && (
                  <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20'>
                    <AlertCircle
                      size={13}
                      className='text-amber-500 mt-0.5 shrink-0'
                    />
                    <p className='text-[10px] text-amber-500 leading-relaxed'>
                      {t.corsNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!isSending && response && !response.error && (
              <div className='space-y-3'>
                {/* Status row */}
                <div
                  className='flex items-center gap-2 px-3 py-2 rounded-lg'
                  style={{
                    background:
                      response.status < 400
                        ? 'rgba(16,185,129,0.08)'
                        : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${response.status < 400 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
                  }}
                >
                  {response.status < 400 ? (
                    <CheckCircle2 size={12} className='text-emerald-500' />
                  ) : (
                    <AlertTriangle size={12} className='text-red-500' />
                  )}
                  <span
                    className={`text-[10px] font-bold ${statusColor(response.status)}`}
                  >
                    {response.status} {response.statusText}
                  </span>
                  <span
                    className='ml-auto text-[9px] flex items-center gap-1'
                    style={{ color: th.textDim }}
                  >
                    <Clock size={8} /> {response.time}ms ·{' '}
                    {formatBytes(response.size)}
                  </span>
                </div>

                {/* Request row */}
                <div
                  className='flex items-center gap-2 px-3 py-2 rounded-lg'
                  style={{
                    background: th.bgInput,
                    border: `1px solid ${th.border3}`
                  }}
                >
                  <MethodBadge method={method} />
                  <span
                    className='text-[9px] truncate font-mono'
                    style={{ color: th.textMuted }}
                  >
                    {fullUrl}
                  </span>
                </div>

                {/* View toggle + Body */}
                {response.body !== null && response.body !== '' && (
                  <div
                    className='rounded-lg overflow-hidden'
                    style={{
                      background: th.bgCode,
                      border: `1px solid ${th.border2}`
                    }}
                  >
                    <div
                      className='flex items-center justify-between px-3 py-2'
                      style={{ borderBottom: `1px solid ${th.border2}` }}
                    >
                      <div className='flex gap-1'>
                        {['pretty', 'raw'].map((v) => (
                          <button
                            key={v}
                            onClick={() => setResponseView(v)}
                            className='text-[9px] px-2 py-0.5 rounded transition-all uppercase tracking-widest font-bold'
                            style={{
                              background:
                                responseView === v
                                  ? th.hoverBg2
                                  : 'transparent',
                              color:
                                responseView === v ? th.textPrimary : th.textDim
                            }}
                          >
                            {v === 'pretty' ? t.pretty : t.raw}
                          </button>
                        ))}
                      </div>
                      <CopyButton
                        text={prettyBody}
                        label={t.copy}
                        labelDone={t.copied}
                        th={th}
                      />
                    </div>
                    <pre
                      className='p-3 text-[10px] leading-5 font-mono overflow-x-auto whitespace-pre-wrap wrap-break-word max-h-64'
                      style={{ color: th.jsonResult }}
                    >
                      {prettyBody}
                    </pre>
                  </div>
                )}

                {/* Response Headers */}
                {Object.keys(response.headers).length > 0 && (
                  <div
                    className='rounded-lg overflow-hidden'
                    style={{
                      background: th.bgCode,
                      border: `1px solid ${th.border2}`
                    }}
                  >
                    <div
                      className='px-3 py-2'
                      style={{ borderBottom: `1px solid ${th.border2}` }}
                    >
                      <span
                        className='text-[9px] uppercase tracking-widest'
                        style={labelStyle}
                      >
                        {t.responseHeaders}
                      </span>
                    </div>
                    <div className='p-3 space-y-1 font-mono text-[9px] max-h-40 overflow-y-auto'>
                      {Object.entries(response.headers).map(([k, v]) => (
                        <div key={k} className='flex gap-2'>
                          <span
                            className='shrink-0'
                            style={{ color: th.textDim, minWidth: '10rem' }}
                          >
                            {k}:
                          </span>
                          <span
                            className='break-all'
                            style={{ color: th.textMuted }}
                          >
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer
        className='qa-tr px-5 py-2 flex items-center justify-between shrink-0'
        style={{
          background: th.bg,
          borderTop: `1px solid ${th.border}`,
          zIndex: 50
        }}
      >
        <div className='flex items-center gap-4'>
          <span className='text-[10px]' style={{ color: th.textDimmest }}>
            © 2026 QuickAPI Studio
          </span>
          <div className='flex items-center gap-1'>
            <span className='text-[10px]' style={{ color: th.textDimmest }}>
              {lang === 'en' ? 'Created by' : 'Creado por'}
              <span className='font-bold ml-1'>Josmer Uriel Bertel Calle</span>
            </span>
            <Zap size={10} className='text-blue-500 ml-1' />
          </div>
        </div>
        <span
          className='text-[10px] font-mono'
          style={{ color: th.textDimmest }}
        >
          Enero 2026
        </span>
      </footer>
    </div>
  )
}
