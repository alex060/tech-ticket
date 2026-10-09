const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const capturasDir = path.join(__dirname, 'capturas');
  const toBase64 = (fileName) => {
    const fileP = path.join(capturasDir, fileName);
    if (!fs.existsSync(fileP)) return '';
    const b = fs.readFileSync(fileP);
    return `data:image/png;base64,${b.toString('base64')}`;
  };

  const img1 = toBase64('captura1_lista_todos.png');
  const img2 = toBase64('captura2_filtro_abiertos.png');
  const img3 = toBase64('captura3_filtro_cerrados.png');
  const img4 = toBase64('captura4_estado_loading.png');
  const img5 = toBase64('captura5_consola_red.png');
  const img6 = toBase64('captura6_android_capacitor.png');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Memoria Técnica: TechTicket FP - Estado Reactivo y Despliegue Móvil</title>
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #24292f;
    line-height: 1.5;
    font-size: 12.5px;
    margin: 0;
    padding: 0;
  }
  .header-tag {
    font-size: 10.5px;
    font-weight: 700;
    color: #57606a;
    letter-spacing: 0.5px;
    margin-bottom: 3px;
    text-transform: uppercase;
  }
  .module-tag {
    font-size: 11px;
    font-weight: 700;
    color: #0969da;
    margin-bottom: 12px;
  }
  h1 {
    font-size: 22px;
    color: #093c71;
    margin: 0 0 6px 0;
    line-height: 1.25;
  }
  .subtitle {
    font-size: 13px;
    color: #57606a;
    font-style: italic;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  table.meta-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 11.5px;
  }
  table.meta-table td {
    padding: 6px 10px;
    border: 1px solid #d0d7de;
  }
  table.meta-table td.label {
    background-color: #f6f8fa;
    font-weight: 700;
    color: #093c71;
    width: 28%;
  }
  h2 {
    font-size: 16px;
    color: #093c71;
    border-bottom: 2px solid #0969da;
    padding-bottom: 4px;
    margin-top: 22px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 13.5px;
    color: #0969da;
    margin-top: 14px;
    margin-bottom: 6px;
  }
  p { margin: 0 0 9px 0; }
  ul { margin: 0 0 10px 18px; padding: 0; }
  li { margin-bottom: 4px; }

  .callout {
    background: #ddf4ff;
    border-left: 4px solid #0969da;
    padding: 9px 12px;
    border-radius: 4px;
    margin: 12px 0;
    font-size: 12px;
    color: #093c71;
  }
  .code-block {
    background: #f6f8fa;
    border: 1px solid #d0d7de;
    border-left: 4px solid #0969da;
    border-radius: 5px;
    padding: 9px 11px;
    font-family: Consolas, "Courier New", monospace;
    font-size: 10px;
    line-height: 1.35;
    white-space: pre-wrap;
    margin: 9px 0;
    color: #24292f;
  }
  table.ra-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 14px 0;
    font-size: 11px;
  }
  table.ra-table th {
    background: #0969da;
    color: #fff;
    padding: 6px 9px;
    text-align: left;
    font-weight: 600;
  }
  table.ra-table td {
    padding: 6px 9px;
    border: 1px solid #d0d7de;
    vertical-align: top;
  }
  table.ra-table tr:nth-child(even) td {
    background: #f6f8fa;
  }
  .page-break {
    page-break-before: always;
  }
  .figure-box {
    text-align: center;
    margin: 10px 0 14px 0;
    clear: both;
    display: block;
  }
  .figure-box img {
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.12);
    border: 1px solid #d0d7de;
    display: block;
    margin: 0 auto;
    max-width: 90%;
  }
  .figure-box img.mobile {
    max-width: 50%;
  }
  .caption {
    font-size: 10.5px;
    color: #57606a;
    font-style: italic;
    margin-top: 6px;
    margin-bottom: 6px;
    display: block;
  }
</style>
</head>
<body>

  <div class="header-tag">DESARROLLO DE APLICACIONES MULTIPLATAFORMA (DAM) — 2º CURSO</div>
  <div class="module-tag">MÓDULO: DESARROLLO DE INTERFACES (CÓDIGO: 0488)</div>

  <h1>Laboratorio Técnico: Arquitectura de Estado Reactivo y Despliegue Móvil</h1>
  <div class="subtitle">Implementación de TechTicket FP con Angular Signals, Store Pattern (MVVM), Principios SOLID y Despliegue Nativo en Android con Capacitor</div>

  <table class="meta-table">
    <tr>
      <td class="label">Alumno:</td>
      <td><strong>Alejandro</strong></td>
    </tr>
    <tr>
      <td class="label">Módulo Profesional:</td>
      <td>Desarrollo de Interfaces (0488) | Ciclo Superior DAM</td>
    </tr>
    <tr>
      <td class="label">Entorno Tecnológico:</td>
      <td>Angular Standalone (v22) + Ionic Framework 9 + Capacitor 8 Android</td>
    </tr>
    <tr>
      <td class="label">Actividad Evaluada:</td>
      <td>Laboratorio Técnico: TechTicket FP (RA 1, RA 3, RA 4, RA 7)</td>
    </tr>
  </table>

  <h2>1. Alineación Curricular y Objetivos Técnicos</h2>
  <p>El presente laboratorio técnico cubre de forma práctica e integral los Resultados de Aprendizaje (RA) y Criterios de Evaluación (CE) oficiales establecidos para el módulo:</p>

  <table class="ra-table">
    <thead>
      <tr>
        <th style="width: 32%;">Resultado de Aprendizaje (RA)</th>
        <th style="width: 28%;">Criterios de Evaluación</th>
        <th style="width: 40%;">Implementación en TechTicket FP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>RA 1:</strong> Confecciona interfaces aplicando arquitecturas y patrones.</td>
        <td>CE 1.a (Identificación)<br>CE 1.b (Evaluación)</td>
        <td>Implementación del patrón Store/MVVM con Angular Signals; justificación rigurosa de principios SOLID (SRP, OCP, DIP).</td>
      </tr>
      <tr>
        <td><strong>RA 3:</strong> Crea componentes visuales gestionando eventos y datos reactivos.</td>
        <td>CE 3.d (Asociación a eventos)</td>
        <td>Filtro de incidencias en memoria mediante <code>computed()</code> y control de eventos con <code>ion-segment (ionChange)</code>.</td>
      </tr>
      <tr>
        <td><strong>RA 4:</strong> Usabilidad y retroalimentación de estado asíncrono.</td>
        <td>CE 4.b (Feedback asíncrono)</td>
        <td>Gestión reactiva en template con el nuevo Control Flow (<code>@if isLoading</code> con spinner, <code>@else if error</code> con reintento, <code>@empty</code>).</td>
      </tr>
      <tr>
        <td><strong>RA 7:</strong> Prepara, empaqueta y distribuye aplicaciones multiplataforma.</td>
        <td>CE 7.a (Empaquetado)<br>CE 7.c (Despliegue móvil)</td>
        <td>Build AOT de producción (<code>ionic build --prod</code>), adición del contenedor Android y sincronización nativa con Capacitor.</td>
      </tr>
    </tbody>
  </table>

  <h2>2. Inicialización y Andamiaje Técnico (CLI)</h2>
  <p>Se ejecutó la secuencia oficial mediante Ionic CLI y Angular CLI asegurando una base Standalone (sin NgModules) para maximizar la optimización del bundle y permitir la reactividad granular Zoneless:</p>

  <div class="code-block"># 1. Crear el proyecto base (Angular Standalone)
ionic start tech-ticket blank --type=angular --standalone

# 2. Entrar al directorio
cd tech-ticket

# 3. Generar el servicio que actuará como Store de estado
ionic generate service core/services/ticket

# 4. Generar el componente visual del panel de control
ionic generate component features/ticket-dashboard --standalone

# 5. Configurar HttpClient reactivo en main.ts
provideHttpClient() en los providers de bootstrapApplication</div>

  <div class="callout">
    <strong>💡 Ventaja de la arquitectura Standalone:</strong> Cada componente declara explícitamente sus dependencias en <code>imports: [...]</code> y los servicios se proveen globalmente mediante <code>provideHttpClient()</code> en <code>main.ts</code>, eliminando sobrecostes de <code>AppModule</code> y mejorando el tree-shaking en la compilación móvil.
  </div>

  <h2>3. Decisiones Arquitectónicas: Patrones y Principios SOLID</h2>
  <p><strong>Patrón de Diseño: State Management / Store Pattern (Variante MVVM)</strong><br>
  Utilizamos un patrón de gestión de estado centralizado impulsado por Angular Signals. El servicio <code>TicketService</code> actúa como el <em>Model/ViewModel</em> que retiene la <strong>fuente única de la verdad</strong> (Single Source of Truth), mientras que <code>TicketDashboardComponent</code> es puramente una <em>Vista reactiva</em>.</p>
  <p><em>¿Por qué?:</em> Desacopla la lógica de acceso a datos HTTP y la gestión del estado asíncrono (cargando, error, lista de datos) de la interfaz gráfica. Al usar Signals en vez del dirty checking de Zone.js, permitimos que el framework actualice el DOM de forma granular (Zoneless) sin recálculos innecesarios ni barridos globales del árbol de componentes.</p>

  <p><strong>Aplicación de Principios SOLID:</strong></p>
  <ul>
    <li><strong>SRP (Principio de Responsabilidad Única):</strong> <code>TicketService</code> tiene la única responsabilidad de mutar y mantener el estado de los tickets. <code>TicketDashboardComponent</code> tiene la única responsabilidad de renderizar los datos y capturar los eventos del usuario (clicks, filtros).</li>
    <li><strong>OCP (Principio de Abierto/Cerrado):</strong> El estado del servicio se expone mediante señales derivadas (<code>computed</code>). La vista está abierta a la extensión (podemos añadir nuevos selectores) pero el estado base está cerrado a la modificación directa desde fuera (encapsulamiento privado).</li>
    <li><strong>DIP (Principio de Inversión de Dependencias):</strong> Se aplica mediante el sistema de inyección moderna de dependencias (<code>inject(HttpClient)</code> e <code>inject(TicketService)</code>). El componente no instancia el servicio, sino que Angular se lo provee, facilitando futuros tests unitarios con mocks.</li>
  </ul>

  <div class="page-break"></div>

  <h2>4. Implementación del Laboratorio Paso a Paso</h2>

  <h3>Fase A: El Servicio de Estado (src/app/core/services/ticket.service.ts)</h3>
  <p>Implementamos el patrón Store encapsulando el estado mutable de la API y exponiendo selectores computados de solo lectura:</p>

  <div class="code-block">import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ticket {
  id: number;
  title: string;
  completed: boolean;
}

interface TicketState {
  data: Ticket[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  // DIP: Inyección de dependencias moderna
  private http = inject(HttpClient);

  // OCP & Encapsulación: El estado es privado y mutable solo desde aquí
  private state = signal&lt;TicketState&gt;({
    data: [],
    loading: false,
    error: null
  });

  // Exposición controlada (Solo lectura / Derivaciones reactivas)
  public tickets = computed(() => this.state().data);
  public isLoading = computed(() => this.state().loading);
  public errorMessage = computed(() => this.state().error);

  public fetchTickets(): void {
    // Mutación inicial: Activamos el indicador de carga
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.http.get&lt;Ticket[]&gt;('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .subscribe({
        next: (response) => {
          this.state.update(s => ({ ...s, data: response, loading: false }));
        },
        error: () => {
          this.state.update(s => ({
            ...s,
            error: 'Error de red al contactar con el servidor. Revise su conexión.',
            loading: false
          }));
        }
      });
  }
}</div>

  <h3>Fase B: El Componente Visual (src/app/features/ticket-dashboard/ticket-dashboard.component.ts)</h3>
  <p>Conectamos la UI al servicio y aplicamos una señal local para el filtrado en memoria, optimizando con <code>ChangeDetectionStrategy.OnPush</code> y el nuevo Control Flow:</p>

  <div class="code-block">import { Component, computed, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
  IonLabel, IonSpinner, IonText, IonButton, IonList, IonItem, IonBadge
} from '@ionic/angular';

@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización de renderizado
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
    IonLabel, IonSpinner, IonText, IonButton, IonList, IonItem, IonBadge
  ],
  template: \`
    &lt;ion-header&gt;
      &lt;ion-toolbar color="dark"&gt;
        &lt;ion-title&gt;TechTicket FP&lt;/ion-title&gt;
      &lt;/ion-toolbar&gt;
    &lt;/ion-header&gt;

    &lt;ion-content class="ion-padding"&gt;
      &lt;!-- UI: Selector de Filtro --&gt;
      &lt;ion-segment (ionChange)="cambiarFiltro(\$event)" value="todos" class="ion-margin-bottom"&gt;
        &lt;ion-segment-button value="todos"&gt;&lt;ion-label&gt;Todos&lt;/ion-label&gt;&lt;/ion-segment-button&gt;
        &lt;ion-segment-button value="abiertos"&gt;&lt;ion-label&gt;Abiertos&lt;/ion-label&gt;&lt;/ion-segment-button&gt;
        &lt;ion-segment-button value="cerrados"&gt;&lt;ion-label&gt;Cerrados&lt;/ion-label&gt;&lt;/ion-segment-button&gt;
      &lt;/ion-segment&gt;

      &lt;!-- Control Flow: Gestión de Estado Asíncrono (Feedback UI) --&gt;
      @if (ticketService.isLoading()) {
        &lt;div class="ion-text-center ion-margin-top"&gt;
          &lt;ion-spinner name="dots"&gt;&lt;/ion-spinner&gt;
          &lt;p&gt;Sincronizando incidencias...&lt;/p&gt;
        &lt;/div&gt;
      } @else if (ticketService.errorMessage()) {
        &lt;div class="ion-text-center"&gt;
          &lt;ion-text color="danger"&gt;&lt;p&gt;{{ ticketService.errorMessage() }}&lt;/p&gt;&lt;/ion-text&gt;
          &lt;ion-button (click)="cargarDatos()" size="small"&gt;Reintentar&lt;/ion-button&gt;
        &lt;/div&gt;
      } @else {
        &lt;!-- Renderizado Optimizado de la Lista --&gt;
        &lt;ion-list&gt;
          @for (ticket of ticketsFiltrados(); track ticket.id) {
            &lt;ion-item&gt;
              &lt;ion-label&gt;
                &lt;h2&gt;#{{ ticket.id }} - {{ ticket.title }}&lt;/h2&gt;
              &lt;/ion-label&gt;
              &lt;ion-badge slot="end" [color]="ticket.completed ? 'success' : 'warning'"&gt;
                {{ ticket.completed ? 'Resuelto' : 'Pendiente' }}
              &lt;/ion-badge&gt;
            &lt;/ion-item&gt;
          } @empty {
            &lt;ion-item&gt;&lt;ion-label class="ion-text-center"&gt;No hay incidencias en esta vista.&lt;/ion-label&gt;&lt;/ion-item&gt;
          }
        &lt;/ion-list&gt;
      }
    &lt;/ion-content&gt;
  \`
})
export class TicketDashboardComponent implements OnInit {
  public ticketService = inject(TicketService);
  public filtroActual = signal&lt;'todos' | 'abiertos' | 'cerrados'&gt;('todos');

  public ticketsFiltrados = computed(() => {
    const data = this.ticketService.tickets();
    const filtro = this.filtroActual();
    if (filtro === 'abiertos') return data.filter(t => !t.completed);
    if (filtro === 'cerrados') return data.filter(t => t.completed);
    return data;
  });

  ngOnInit() { this.cargarDatos(); }
  public cargarDatos(): void { this.ticketService.fetchTickets(); }
  public cambiarFiltro(event: any): void { this.filtroActual.set(event.detail.value); }
}</div>

  <div class="page-break"></div>

  <h2>5. Empaquetado y Despliegue en Android (Capacitor)</h2>
  <p>Para cumplir con el Resultado de Aprendizaje <strong>RA 7</strong>, trasladamos nuestra aplicación web reactiva a un contenedor nativo Android utilizando Capacitor 8. La secuencia técnica ejecutada comprende:</p>

  <ol>
    <li><strong>Compilar el proyecto de producción:</strong><br>
    Genera los artefactos optimizados (AOT) en la carpeta <code>www/</code> mediante:
    <div class="code-block">ionic build --prod</div></li>
    <li><strong>Integrar Capacitor y la plataforma Android:</strong><br>
    Añade el andamiaje nativo al proyecto (creando la carpeta <code>android/</code> con configuración Gradle):
    <div class="code-block">npx cap add android</div></li>
    <li><strong>Sincronizar el código compilado:</strong><br>
    Copia los archivos web y sincroniza dependencias nativas:
    <div class="code-block">npx cap sync android</div></li>
    <li><strong>Ejecución y Testing en el dispositivo:</strong><br>
    Apertura en Android Studio mediante <code>npx cap open android</code> o despliegue directo por USB/ADB con <code>npx cap run android</code>.</li>
  </ol>

  <h2>6. Evidencias de Pruebas y Validación Visual</h2>

  <div class="figure-box">
    <img src="${img1}" class="mobile" alt="Figura 1: Vista general con filtro Todos">
    <span class="caption">Figura 1: Vista general con filtro 'Todos' (muestra las incidencias con badges verdes 'Resuelto' y amarillos 'Pendiente')</span>
  </div>

  <div class="page-break"></div>

  <div class="figure-box">
    <img src="${img2}" class="mobile" alt="Figura 2: Filtro Abiertos">
    <span class="caption">Figura 2: Filtrado reactivo en memoria 'Abiertos' (solo incidencias pendientes con badge amarillo)</span>
  </div>

  <div class="figure-box">
    <img src="${img3}" class="mobile" alt="Figura 3: Filtro Cerrados">
    <span class="caption">Figura 3: Filtrado reactivo en memoria 'Cerrados' (solo incidencias resueltas con badge verde)</span>
  </div>

  <div class="page-break"></div>

  <div class="figure-box">
    <img src="${img4}" class="mobile" alt="Figura 4: Estado de Carga">
    <span class="caption">Figura 4: Retroalimentación de estado asíncrono con spinner de carga 'Sincronizando incidencias...' (RA 4, CE 4.b)</span>
  </div>

  <div class="figure-box">
    <img src="${img5}" alt="Figura 5: Inspección de Red y Consola">
    <span class="caption">Figura 5: Inspección de tráfico de red DevTools con petición GET 200 OK a JSONPlaceholder API</span>
  </div>

  <div class="figure-box">
    <img src="${img6}" alt="Figura 6: Terminal Capacitor Android">
    <span class="caption">Figura 6: Terminal de compilación y sincronización nativa en Android con Capacitor (RA 7)</span>
  </div>

  <h2>7. Conclusiones y Comparativa de Rendimiento</h2>
  <ul>
    <li><strong>Reactividad Granular sin Zone.js:</strong> La integración de Angular Signals elimina el overhead de comprobación de cambios global (Dirty Checking), permitiendo un rendimiento fluido a 60 FPS en dispositivos móviles reales.</li>
    <li><strong>Mantenibilidad y Robustez Arquitectónica:</strong> La separación de responsabilidades (SRP) y la encapsulación del estado en el servicio Store (OCP) evitan efectos colaterales indeseados y facilitan la testabilidad de la aplicación.</li>
    <li><strong>Despliegue Nativo Limpio:</strong> Capacitor ofrece una integración directa y transparente con el ecosistema Android Studio, sin las abstracciones opacas del antiguo Apache Cordova.</li>
  </ul>

</body>
</html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outputPath = path.resolve(__dirname, '..', 'Memoria_Tecnica_TechTicket_Alejandro.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '16mm',
      right: '16mm'
    }
  });

  await browser.close();
  console.log(`Documento PDF guardado exitosamente en: ${outputPath}`);
}

main().catch(err => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
