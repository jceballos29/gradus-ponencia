# Propuesta presenación ponencia
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Moon, 
  Sun, 
  UserX, 
  FileWarning, 
  Database, 
  ShieldCheck, 
  Cpu, 
  FileCheck, 
  ArrowRight,
  Clock,
  Sparkles,
  Server,
  Layers,
  GraduationCap,
  X,
  Code2,
  FolderOpen,
  FileCode2,
  Container,
  Github,
  Rocket,
  ExternalLink
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface ModalData {
  title: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  tags?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

// ==========================================
// CSS INJECTION (Gradus Theme & Animations)
// ==========================================
const GradusStyles: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root {
      --background: oklch(0.99 0.002 247.839);
      --foreground: oklch(0.208 0.042 265.755);
      --card: oklch(1 0 0 / 80%);
      --card-foreground: oklch(0.208 0.042 265.755);
      
      /* Color índigo suave y corporativo para modo claro */
      --primary: oklch(0.60 0.12 276.966);
      --primary-foreground: oklch(0.985 0 0);
      
      --secondary: oklch(0.968 0.007 247.896);
      --secondary-foreground: oklch(0.208 0.042 265.755);
      --muted: oklch(0.96 0.01 250);
      --muted-foreground: oklch(0.554 0.046 257.417);
      --border: oklch(0.90 0.02 255.508);
      --radius: 0.75rem;
    }

    .dark {
      --background: oklch(0.129 0.042 264.695);
      --foreground: oklch(0.984 0.003 247.858);
      --card: oklch(0.18 0.04 265 / 80%);
      --card-foreground: oklch(0.984 0.003 247.858);
      --primary: oklch(0.673 0.182 276.935);
      --primary-foreground: oklch(0.129 0.042 264.695);
      --secondary: oklch(0.279 0.041 260.031);
      --secondary-foreground: oklch(0.984 0.003 247.858);
      --muted: oklch(0.25 0.04 260);
      --muted-foreground: oklch(0.704 0.04 256.788);
      --border: oklch(1 0 0 / 10%);
    }

    .theme-bg { background-color: var(--background); color: var(--foreground); }
    .theme-card { background-color: var(--card); color: var(--card-foreground); border-color: var(--border); backdrop-filter: blur(12px); }
    .theme-primary { background-color: var(--primary); color: var(--primary-foreground); }
    .theme-text-primary { color: var(--primary); }
    .theme-secondary { background-color: var(--secondary); color: var(--secondary-foreground); }
    .theme-muted { background-color: var(--muted); }
    .theme-text-muted { color: var(--muted-foreground); }
    .theme-border { border-color: var(--border); }

    /* Impactful Light Mode Pattern */
    .pattern-bg {
      background-image: radial-gradient(var(--border) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .dark .pattern-bg {
      background-image: radial-gradient(var(--border) 1px, transparent 1px);
    }

    /* Animations */
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
    .animate-zoom-in { animation: zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
    
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    /* Custom Scrollbar for code blocks */
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
  `}} />
);

// ==========================================
// REUSABLE COMPONENTS
// ==========================================
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />
      <div className="theme-card border w-full max-w-lg rounded-2xl p-8 shadow-2xl relative z-10 animate-zoom-in">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full theme-muted hover:bg-[var(--primary)] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${data.color === 'theme-primary' ? 'theme-primary' : data.color}`}>
            {data.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p className="theme-text-muted font-medium">{data.sub}</p>
          </div>
        </div>
        
        <p className="text-lg leading-relaxed mb-6">
          {data.description}
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider theme-text-primary">Profundidad Técnica</h4>
          <ul className="space-y-3 mt-4">
            {data.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 theme-text-muted">
                <ArrowRight size={18} className="mt-0.5 shrink-0 theme-text-primary" />
                <span className="leading-snug">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SLIDES CONTENT COMPONENTS
// ==========================================

const Slide1Cover: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
    <div className="p-6 rounded-[2rem] theme-card shadow-lg theme-border border mb-4 animate-zoom-in">
      <GraduationCap size={72} className="theme-text-primary" />
    </div>
    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight animate-slide-up delay-100 text-transparent bg-clip-text bg-gradient-to-br from-[var(--foreground)] to-[var(--muted-foreground)]">
      Gradus
    </h1>
    <p className="text-2xl md:text-3xl theme-text-muted max-w-2xl font-light animate-slide-up delay-200">
      Plataforma de Homologación Académica
    </p>
    
    <div className="pt-12 space-y-2 animate-slide-up delay-300">
      <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-500">
        Juan Antonio Ceballos Usuga
      </p>
      <p className="font-medium theme-text-muted">Semillero de Investigación Kepler-90</p>
      <div className="flex items-center justify-center gap-2 text-sm theme-text-muted opacity-80 pt-2">
        <span>Coordinador:</span>
        <span className="font-medium">Luis Alberto Garcia Gonzalez</span>
      </div>
      <p className="text-sm font-bold mt-6 py-2 px-6 rounded-full theme-muted border theme-border uppercase tracking-widest theme-text-primary inline-block shadow-sm">
        Politécnico Internacional
      </p>
    </div>
  </div>
);

const Slide2Problem: React.FC = () => (
  <div className="flex flex-col h-full py-8">
    <h2 className="text-4xl font-bold mb-12 text-center animate-slide-up">El Dolor del Proceso Actual</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
      {/* Estudiante */}
      <div className="theme-card border p-8 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl relative overflow-hidden animate-slide-up delay-100">
        <div className="absolute top-0 w-full h-2 bg-red-500"></div>
        <div className="w-20 h-20 rounded-full theme-muted flex items-center justify-center mb-2 shadow-inner">
          <UserX size={36} className="text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold">El Estudiante</h3>
        <ul className="space-y-4 text-left w-full mt-6 theme-text-muted text-lg">
          <li className="flex items-start gap-3"><FileWarning className="shrink-0 mt-1" size={24}/> Trámites presenciales obligatorios.</li>
          <li className="flex items-start gap-3"><Clock className="shrink-0 mt-1" size={24}/> Tiempos de espera e incertidumbre total.</li>
          <li className="flex items-start gap-3"><ArrowRight className="shrink-0 mt-1" size={24}/> Seguimiento manual (correos/visitas).</li>
        </ul>
      </div>

      {/* Coordinador */}
      <div className="theme-card border p-8 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl relative overflow-hidden animate-slide-up delay-200">
        <div className="absolute top-0 w-full h-2 bg-orange-500"></div>
        <div className="w-20 h-20 rounded-full theme-muted flex items-center justify-center mb-2 shadow-inner">
          <Database size={36} className="text-orange-500" />
        </div>
        <h3 className="text-2xl font-semibold">El Coordinador</h3>
        <ul className="space-y-4 text-left w-full mt-6 theme-text-muted text-lg">
          <li className="flex items-start gap-3"><Database className="shrink-0 mt-1" size={24}/> Cruce manual de bases de datos.</li>
          <li className="flex items-start gap-3"><FileWarning className="shrink-0 mt-1" size={24}/> Diligenciamiento de formatos a mano.</li>
          <li className="flex items-start gap-3"><Clock className="shrink-0 mt-1" size={24}/> Carga operativa que crece exponencialmente.</li>
        </ul>
      </div>
    </div>
  </div>
);

const Slide3Architecture: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<ModalData | null>(null);

  const archItems: ModalData[] = [
    {
      title: "Identity",
      sub: "SSO Provider",
      color: "bg-blue-500",
      icon: <ShieldCheck size={28} />,
      description: "Desarrollado en Next.js Full Stack para mayor agilidad al no ser la app central. Actúa como proveedor OAuth2/OIDC, preparado para migrar a Microsoft Entra ID.",
      details: [
        "Base de datos separada (identity_db) en PostgreSQL.",
        "Generación y validación de tokens JWT mediante claves RSA.",
        "Manejo de sesiones y redirecciones OIDC seguras."
      ],
      tags: ["Next.js 16", "Prisma", "PostgreSQL"]
    },
    {
      title: "Universitas",
      sub: "Mock UXXI",
      color: "bg-green-500",
      icon: <Server size={28} />,
      description: "Desarrollado en Next.js Full Stack. Implementa el patrón Anti-Corruption Layer (ACL) para simular eficientemente la API oficial de la universidad.",
      details: [
        "Esquema de datos basado estrictamente en la documentación de Universitas XXI.",
        "Endpoints M2M (Machine to Machine) para consulta de historiales.",
        "Aislamiento total: previene el bloqueo del desarrollo del sistema central."
      ],
      tags: ["Next.js 16", "Prisma", "PostgreSQL"]
    },
    {
      title: "Gradus",
      sub: "Gestor Core",
      color: "theme-primary",
      icon: <Cpu size={28} />,
      description: "La aplicación central. Backend robusto y asíncrono para el motor de reglas, con interfaces modernas para el coordinador y móvil para el estudiante.",
      details: [
        "API construida en .NET 10 bajo patrón CQRS (MediatR).",
        "Implementación de Redis para caché de tokens e historiales pesados.",
        "Generación automatizada de Actas PDF con plantillas institucionales.",
        "Notificaciones en tiempo real vía WebSockets."
      ],
      tags: [".NET 10 API", "Next.js 16 (Web)", "React Native", "Redis", "PostgreSQL"]
    }
  ];

  return (
    <div className="flex flex-col h-full py-8">
      <h2 className="text-4xl font-bold mb-4 text-center animate-slide-up">Arquitectura y Ecosistema</h2>
      <p className="text-center theme-text-muted text-xl mb-10 max-w-3xl mx-auto animate-slide-up delay-100">
        Haz clic en cada pilar para explorar la profundidad técnica del stack.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        {/* Left: Ecosystem Pillars */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
          {archItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedArch(item)}
              className="theme-card border p-5 rounded-2xl flex items-start gap-4 cursor-pointer shadow-md transition-all duration-300 hover:shadow-none hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 animate-slide-up group"
              style={{ animationDelay: ((idx + 2) * 100) + 'ms' }}
            >
              <div className="p-3 rounded-xl theme-muted shrink-0 transition-colors group-hover:bg-transparent">
                <div className={item.color === 'theme-primary' ? 'theme-text-primary' : 'text-' + item.color.split('-')[1] + '-500'}>
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">{item.title} <span className="text-sm font-normal theme-text-muted">({item.sub})</span></h3>
                <p className="text-sm theme-text-muted mt-2 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {item.tags?.map(tag => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md theme-muted border theme-border font-mono font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Technical Details (Deployment & Tree) */}
        <div className="lg:col-span-2 flex flex-col gap-4 animate-slide-up delay-500">
          
          {/* Deployment Info */}
          <div className="theme-card border rounded-2xl p-5 shadow-md flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold theme-text-primary border-b theme-border pb-3">
              <Rocket size={20} />
              <h3 className="text-lg">Despliegue CI/CD</h3>
            </div>
            <p className="text-sm theme-text-muted mt-1">
              Entorno de producción automatizado utilizando <strong>Railway</strong>, conectado directamente a nuestro repositorio para despliegue continuo.
            </p>
            <a 
              href="https://github.com/jceballos29/Gradus" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-3 mt-2 rounded-xl theme-muted hover:bg-[var(--primary)] hover:text-white transition-colors group text-sm border theme-border cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Github size={18} />
                <span className="font-mono font-medium">jceballos29/Gradus</span>
              </div>
              <ExternalLink size={16} className="opacity-50 group-hover:opacity-100" />
            </a>
          </div>

          {/* Folder Structure */}
          <div className="theme-card border rounded-2xl p-5 flex-1 font-mono text-sm shadow-inner overflow-hidden flex flex-col relative min-h-[220px]">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] pointer-events-none"><Code2 size={120}/></div>
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider theme-text-muted border-b theme-border pb-3 relative z-10">
              <FolderOpen size={16} /> Estructura del Monorepo
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 space-y-1.5 text-[13px] relative z-10">
              <div className="font-bold theme-text-primary">gradus/</div>
              
              <div className="pl-3 flex items-center gap-2 mt-1"><FolderOpen size={14} className="theme-text-muted"/> <span>apps/</span></div>
              
              <div className="pl-6 flex items-center gap-2 group mt-1">
                <FolderOpen size={14} className="text-blue-500 group-hover:text-blue-400 shrink-0"/> 
                <span className="truncate">identity/ <span className="theme-text-muted opacity-0 group-hover:opacity-100 transition-opacity text-xs">SSO</span></span>
              </div>
              
              <div className="pl-6 flex items-center gap-2 group mt-1">
                <FolderOpen size={14} className="text-indigo-500 group-hover:text-indigo-400 shrink-0"/> 
                <span className="truncate">gradus-api/ <span className="theme-text-muted opacity-0 group-hover:opacity-100 transition-opacity text-xs">.NET 10</span></span>
              </div>
              
              <div className="pl-6 flex items-center gap-2 group mt-1">
                <FolderOpen size={14} className="text-green-500 group-hover:text-green-400 shrink-0"/> 
                <span className="truncate">universitas/ <span className="theme-text-muted opacity-0 group-hover:opacity-100 transition-opacity text-xs">Mock</span></span>
              </div>
              
              <div className="pl-6 flex items-center gap-2 group mt-1">
                <FolderOpen size={14} className="text-orange-500 group-hover:text-orange-400 shrink-0"/> 
                <span className="truncate">gradus/ <span className="theme-text-muted opacity-0 group-hover:opacity-100 transition-opacity text-xs">Frontend</span></span>
              </div>
              
              <div className="pl-3 flex items-center gap-2 mt-4"><FileCode2 size={14} className="theme-text-muted shrink-0"/> <span>package.json</span></div>
              <div className="pl-3 flex items-center gap-2 mt-1"><Container size={14} className="theme-text-muted shrink-0"/> <span>docker-compose.yml</span></div>
            </div>
          </div>

        </div>
      </div>

      <Modal 
        isOpen={!!selectedArch} 
        onClose={() => setSelectedArch(null)} 
        data={selectedArch} 
      />
    </div>
  );
};

const Slide4Demo: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ModalData | null>(null);

  const flowSteps: ModalData[] = [
    { 
      title: "Borrador", sub: "Vista Previa", color: "bg-gray-400", icon: <FileCheck size={20}/>,
      description: "El estudiante selecciona el programa destino. Gradus evalúa automáticamente las reglas (créditos, notas, área) y genera una vista previa.",
      details: ["Cálculo automático de equivalencias.", "Evaluación de nota mínima y créditos.", "Sin incertidumbre para el estudiante."]
    },
    { 
      title: "Pendiente", sub: "Notificación", color: "bg-amber-500", icon: <Sparkles size={20}/>,
      description: "La solicitud es enviada formalmente. El sistema dispara alertas inmediatas para el área administrativa.",
      details: ["Notificaciones in-app vía WebSocket.", "La solicitud aparece en la bandeja del coordinador.", "Registro inmutable de fecha y hora."]
    },
    { 
      title: "En Revisión", sub: "Excepciones", color: "bg-blue-500", icon: <Layers size={20}/>,
      description: "El coordinador revisa la matriz de materias. El sistema ya hizo el trabajo pesado, pero permite intervención humana experta.",
      details: ["Posibilidad de aplicar Excepciones Manuales.", "Inclusión o exclusión forzada de materias.", "Flexibilidad institucional con auditoría."]
    },
    { 
      title: "Decisión", sub: "Aprobar/Rechazar", color: "bg-green-500", icon: <ShieldCheck size={20}/>,
      description: "Se toma la decisión final sobre la solicitud, notificando automáticamente al estudiante del resultado.",
      details: ["El coordinador agrega observaciones finales.", "Actualización inmediata del estado (State Machine).", "Trazabilidad completa."]
    },
    { 
      title: "Acta Lista", sub: "Generación PDF", color: "theme-primary", icon: <FileCode2 size={20}/>,
      description: "Si es aprobada, el backend genera el documento legal aplicando la plantilla oficial de la institución.",
      details: ["Generación de PDF en tiempo real.", "Descarga disponible para estudiante y coordinador.", "Cierre exitoso del ciclo."]
    }
  ];

  return (
    <div className="flex flex-col h-full py-8 relative">
      <h2 className="text-4xl font-bold mb-4 text-center animate-slide-up">Flujo Automatizado Interactivo</h2>
      <p className="text-center theme-text-muted text-xl mb-12 animate-slide-up delay-100">
        Haz clic en cada estado de la <span className="font-semibold text-[var(--primary)]">Máquina de Estados</span> para ver los detalles.
      </p>

      {/* State Machine Visualization */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full relative">
          {/* Connecting line background */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-1 theme-muted -z-10 animate-fade-in delay-300"></div>
          
          {flowSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center relative z-10 w-full md:w-auto cursor-pointer group animate-slide-up"
              style={{ animationDelay: ((idx + 2) * 100) + 'ms' }}
              onClick={() => setSelectedStep(step)}
            >
              <div className={`w-14 h-14 rounded-full mb-5 ring-4 theme-bg flex items-center justify-center text-white shadow-xl transition-all transform group-hover:scale-110 group-hover:ring-8 group-hover:ring-[var(--primary)]/20 duration-300 ${step.color === 'theme-primary' ? 'theme-primary' : step.color}`}>
                {step.icon}
              </div>
              <div className="theme-card border px-5 py-4 rounded-2xl text-center shadow-md w-44 transition-colors group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/5">
                <p className="font-bold text-[15px]">{step.title}</p>
                <p className="text-xs theme-text-muted mt-1.5">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center animate-slide-up delay-500 p-6 rounded-3xl theme-card shadow-lg border theme-border max-w-3xl mx-auto">
          <p className="text-xl font-light">
            <span className="font-bold theme-text-primary mr-2">🎯 Momento Demo en Vivo:</span> 
            SSO ➔ Generar Vista Previa ➔ Excepción Manual ➔ Descargar PDF
          </p>
        </div>
      </div>

      <Modal 
        isOpen={!!selectedStep} 
        onClose={() => setSelectedStep(null)} 
        data={selectedStep} 
      />
    </div>
  );
};

const Slide5Impact: React.FC = () => (
  <div className="flex flex-col h-full py-8">
    <h2 className="text-4xl font-bold mb-12 text-center animate-slide-up">Impacto y Futuro</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
      {/* Column 1 */}
      <div className="theme-card border p-8 rounded-3xl flex flex-col shadow-xl animate-slide-up delay-100 hover:-translate-y-2 transition-transform duration-300">
        <div className="theme-muted p-4 rounded-2xl w-fit mb-6">
          <Sparkles className="theme-text-primary" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-4">Impacto Institucional</h3>
        <ul className="space-y-4 theme-text-muted text-lg">
          <li>• Ahorro masivo de horas operativas.</li>
          <li>• Trazabilidad total y auditable.</li>
          <li>• Autonomía completa para el estudiante.</li>
        </ul>
      </div>

      {/* Column 2 */}
      <div className="theme-card border p-8 rounded-3xl flex flex-col shadow-xl relative overflow-hidden animate-slide-up delay-200 hover:-translate-y-2 transition-transform duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <Cpu size={140} />
        </div>
        <div className="theme-muted p-4 rounded-2xl w-fit mb-6">
          <Layers className="theme-text-primary" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-4 relative z-10">Desarrollo Asistido (IA)</h3>
        <ul className="space-y-4 theme-text-muted text-lg relative z-10">
          <li>• IA como habilitador arquitectónico.</li>
          <li>• Ingeniería inversa para el mock de BD.</li>
          <li>• Sparring técnico para reglas de negocio.</li>
        </ul>
      </div>

      {/* Column 3 */}
      <div className="theme-card border p-8 rounded-3xl flex flex-col shadow-xl border-b-8 border-b-[var(--primary)] animate-slide-up delay-300 hover:-translate-y-2 transition-transform duration-300">
        <div className="theme-muted p-4 rounded-2xl w-fit mb-6">
          <FileCheck className="theme-text-primary" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-4">Siguientes Pasos</h3>
        <ul className="space-y-4 theme-text-muted text-lg">
          <li>• Migración a Microsoft Entra ID.</li>
          <li>• Integración real API Universitas XXI.</li>
          <li>• Despliegue de aplicación móvil (Fase 5).</li>
        </ul>
      </div>
    </div>
  </div>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Started in Light mode for full impact

  const slides = [
    <Slide1Cover key="s1" />,
    <Slide2Problem key="s2" />,
    <Slide3Architecture key="s3" />,
    <Slide4Demo key="s4" />,
    <Slide5Impact key="s5" />
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <GradusStyles />
      
      <div className="flex-1 flex flex-col theme-bg relative overflow-hidden pattern-bg">
        
        {/* Glow Effects for Light Mode Impact */}
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary)] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary)] opacity-[0.04] blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="absolute top-0 w-full p-8 flex justify-between items-center z-40">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
            <div className="w-10 h-10 rounded-xl theme-primary flex items-center justify-center shadow-lg">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span>Gradus</span>
          </div>
          
          <button 
            onClick={toggleTheme} 
            className="p-3 rounded-full theme-card hover:bg-[var(--muted)] transition-all border theme-border shadow-sm"
            title="Cambiar tema"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Slide Content Container */}
        <main className="flex-1 flex flex-col justify-center px-6 md:px-20 pt-24 pb-28 max-w-[1400px] mx-auto w-full relative z-10">
          {/* Key forces re-render of animations when slide changes */}
          <div key={`slide-${currentSlide}`} className="h-full">
            {slides[currentSlide]}
          </div>
        </main>

        {/* Footer & Controls (Refactored to left/right as requested) */}
        <footer className="absolute bottom-0 w-full p-8 flex justify-between items-center z-40">
          
          {/* Botones de navegación a la izquierda */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-4 rounded-full border theme-border transition-all ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'theme-card hover:bg-[var(--muted)] hover:scale-105 shadow-md'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`p-4 rounded-full border theme-border transition-all ${currentSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'theme-card hover:bg-[var(--muted)] hover:scale-105 shadow-md'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Contador de página a la derecha */}
          <div className="text-sm font-bold theme-text-primary theme-card px-6 py-3 rounded-full border theme-border shadow-md tracking-widest">
            {currentSlide + 1} / {totalSlides}
          </div>
          
        </footer>
        
      </div>
    </div>
  );
}
```