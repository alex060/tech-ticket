import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def add_code_block(doc, code_text):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "F4F5F7")
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="4" w:space="0" w:color="D0D5DD"/>
            <w:left w:val="single" w:sz="18" w:space="0" w:color="3880FF"/>
            <w:bottom w:val="single" w:sz="4" w:space="0" w:color="D0D5DD"/>
            <w:right w:val="single" w:sz="4" w:space="0" w:color="D0D5DD"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(code_text.strip())
    run.font.name = 'Consolas'
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(33, 37, 41)
    
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(0)
    p_after.paragraph_format.space_after = Pt(4)

def add_callout(doc, text, title="NOTA TÉCNICA"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "EBF3FC")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="24" w:space="0" w:color="1B68D8"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    run_t = p.add_run(f"📌 {title}: ")
    run_t.bold = True
    run_t.font.name = 'Calibri'
    run_t.font.size = Pt(10)
    run_t.font.color.rgb = RGBColor(27, 104, 216)
    
    run_b = p.add_run(text)
    run_b.font.name = 'Calibri'
    run_b.font.size = Pt(10)
    run_b.font.color.rgb = RGBColor(20, 30, 45)
    
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(0)
    p_after.paragraph_format.space_after = Pt(4)

def build_document():
    doc = docx.Document()
    
    # Page setup - Margins (2.5 cm)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
    
    # Styles setup
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Calibri'
    style_normal.font.size = Pt(11)
    style_normal.font.color.rgb = RGBColor(40, 44, 52)
    
    # ------------------ PORTADA / HEADER ------------------
    p_org = doc.add_paragraph()
    p_org.paragraph_format.space_after = Pt(4)
    run_org = p_org.add_run("DESARROLLO DE APLICACIONES MULTIPLATAFORMA (DAM) — 2º CURSO")
    run_org.font.size = Pt(9.5)
    run_org.font.bold = True
    run_org.font.color.rgb = RGBColor(100, 110, 125)
    
    p_mod = doc.add_paragraph()
    p_mod.paragraph_format.space_after = Pt(18)
    run_mod = p_mod.add_run("MÓDULO: DESARROLLO DE INTERFACES (CÓDIGO: 0488)")
    run_mod.font.size = Pt(10)
    run_mod.font.bold = True
    run_mod.font.color.rgb = RGBColor(27, 104, 216)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_after = Pt(8)
    run_title = p_title.add_run("Laboratorio Técnico: Arquitectura de Estado Reactivo y Despliegue Móvil")
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(15, 45, 90)
    
    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(20)
    run_sub = p_sub.add_run("Implementación integral de TechTicket FP con Angular Signals, Store Pattern (MVVM), Principios SOLID y Despliegue Nativo en Android con Capacitor")
    run_sub.font.size = Pt(12)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(80, 90, 105)
    
    # Metadata Table
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Alumno:", "Alejandro"),
        ("Módulo Profesional:", "Desarrollo de Interfaces (0488) - DAM"),
        ("Entorno Tecnológico:", "Angular Standalone (v22) + Ionic 9 + Capacitor 8 Android"),
        ("Actividad Evaluada:", "Laboratorio Técnico: TechTicket FP (RA 1, RA 3, RA 4, RA 7)")
    ]
    for i, (k, v) in enumerate(meta_data):
        row = meta_table.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        set_cell_background(c0, "F0F4F8")
        set_cell_background(c1, "F9FAFC")
        set_cell_margins(c0, 60, 60, 100, 100)
        set_cell_margins(c1, 60, 60, 100, 100)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k)
        r0.bold = True
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = RGBColor(15, 45, 90)
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(v)
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = RGBColor(30, 35, 45)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(16)
    
    # ------------------ SECCIÓN 1: ALINEACIÓN CURRICULAR ------------------
    h1 = doc.add_heading(level=1)
    r_h1 = h1.add_run("1. Alineación Curricular y Objetivos Técnicos")
    r_h1.font.color.rgb = RGBColor(15, 45, 90)
    
    p_cur = doc.add_paragraph(
        "El presente laboratorio técnico aborda de forma práctica los Resultados de Aprendizaje (RA) "
        "y Criterios de Evaluación (CE) definidos en el currículo oficial del ciclo formativo de Grado Superior "
        "en Desarrollo de Aplicaciones Multiplataforma (DAM) para el módulo de Desarrollo de Interfaces (0488):"
    )
    p_cur.paragraph_format.space_after = Pt(8)
    
    # Table of RA
    ra_table = doc.add_table(rows=5, cols=3)
    ra_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Resultado de Aprendizaje (RA)", "Criterios de Evaluación", "Implementación Concreta en TechTicket FP"]
    for col_idx, h_text in enumerate(headers):
        cell = ra_table.cell(0, col_idx)
        set_cell_background(cell, "0969DA")
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_margins(cell, 80, 80, 100, 100)
    
    ra_rows = [
        ("RA 1: Confecciona interfaces de usuario analizando y aplicando arquitecturas y patrones.",
         "CE 1.a (Identificación de arquitecturas)\nCE 1.b (Evaluación de patrones)",
         "Implementación del patrón Store/MVVM con Angular Signals desacoplando datos y vista reactiva; justificación rigurosa de principios SOLID."),
        ("RA 3: Crea componentes visuales gestionando eventos y desarrollando controles.",
         "CE 3.d (Asociación de acciones a eventos)",
         "Uso de ion-segment para filtrado en memoria reactivo mediante computed signals; enlace de eventos con (ionChange)."),
        ("RA 4: Diseña interfaces de usuario atendiendo a criterios de usabilidad y accesibilidad.",
         "CE 4.b (Usabilidad y retroalimentación asíncrona)",
         "Gestión de estados asíncronos en el template mediante el nuevo Control Flow (@if isLoading, @else if errorMessage, @empty con feedback visual)."),
        ("RA 7: Prepara, empaqueta y distribuye aplicaciones multiplataforma.",
         "CE 7.a (Empaquetado de aplicaciones)\nCE 7.c (Despliegue multiplataforma)",
         "Compilación de bundles de producción (ionic build --prod), sincronización nativa Android con Capacitor (npx cap add android, npx cap sync android).")
    ]
    
    for row_idx, data in enumerate(ra_rows, start=1):
        for col_idx, text in enumerate(data):
            cell = ra_table.cell(row_idx, col_idx)
            set_cell_background(cell, "F8FAFC" if row_idx % 2 == 1 else "FFFFFF")
            set_cell_margins(cell, 70, 70, 90, 90)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(9)
            r.font.color.rgb = RGBColor(30, 35, 45)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    
    # ------------------ SECCIÓN 2: COMANDOS CLI Y ANDAMIAJE ------------------
    h2 = doc.add_heading(level=1)
    r_h2 = h2.add_run("2. Inicialización y Andamiaje Técnico (CLI)")
    r_h2.font.color.rgb = RGBColor(15, 45, 90)
    
    doc.add_paragraph(
        "Para iniciar el proyecto TechTicket FP, se ejecutó la secuencia de comandos oficial mediante Ionic CLI y Angular CLI. "
        "Se configuró una arquitectura completamente Standalone (eliminando NgModules) para maximizar la modularidad, optimizar el bundle "
        "y preparar el proyecto para la detección de cambios granular Zoneless:"
    )
    
    cli_code = (
        "# 1. Crear el proyecto base (Angular Standalone)\n"
        "ionic start tech-ticket blank --type=angular --standalone\n\n"
        "# 2. Entrar al directorio del proyecto\n"
        "cd tech-ticket\n\n"
        "# 3. Generar el servicio que actuará como Store de estado\n"
        "ionic generate service core/services/ticket\n\n"
        "# 4. Generar el componente visual del panel de control\n"
        "ionic generate component features/ticket-dashboard --standalone\n\n"
        "# 5. Configurar HttpClient reactivo en main.ts\n"
        "# provideHttpClient() en bootstrapApplication providers"
    )
    add_code_block(doc, cli_code)
    
    add_callout(
        doc,
        "La arquitectura Standalone prescinde de AppModule. Cada componente declara explícitamente sus dependencias en el array 'imports' "
        "(ej. IonHeader, IonToolbar, IonBadge) y los servicios se proveen globalmente con provideHttpClient() en main.ts, reduciendo dependencias circulares y acelerando el tiempo de compilación AOT.",
        "VENTAJA DEL ANDAMIAJE STANDALONE"
    )
    
    # ------------------ SECCIÓN 3: DECISIONES ARQUITECTÓNICAS Y SOLID ------------------
    h3 = doc.add_heading(level=1)
    r_h3 = h3.add_run("3. Decisiones Arquitectónicas: Patrones y Principios SOLID")
    r_h3.font.color.rgb = RGBColor(15, 45, 90)
    
    doc.add_paragraph(
        "Antes de abordar la codificación, es crítico justificar la arquitectura de software aplicada en este laboratorio. "
        "La solución se apoya en el patrón de gestión de estado centralizado (Store Pattern / Variante MVVM) impulsado por Angular Signals:"
    )
    
    doc.add_paragraph(
        "• Patrón State Management / Store Pattern (Variante MVVM):\n"
        "  El servicio TicketService actúa como el ViewModel que encapsula la 'fuente única de la verdad' (Single Source of Truth), "
        "  reteniendo tanto los datos como los estados asíncronos (cargando, error, lista de tickets). El componente visual "
        "  TicketDashboardComponent es puramente una Vista reactiva que consume señales de solo lectura y emite intenciones de usuario.\n"
        "  ¿Por qué?: Desacopla la lógica de acceso a datos HTTP y la gestión del estado asíncrono de la interfaz gráfica. "
        "  Al utilizar Angular Signals en lugar del Dirty Checking clásico de Zone.js, permitimos que el framework actualice "
        "  únicamente el nodo exacto del DOM que ha mutado (Zoneless fine-grained reactivity), eliminando repintados costosos en dispositivos móviles."
    )
    
    doc.add_paragraph("Aplicación rigurosa de los Principios SOLID:")
    
    solid_points = [
        ("SRP (Principio de Responsabilidad Única):", 
         "TicketService tiene la única responsabilidad de mutar y mantener el estado de los tickets y gestionar la petición HTTP. TicketDashboardComponent tiene la única responsabilidad de renderizar los datos en el DOM y capturar los eventos de interacción del usuario (clicks en filtros de segmento, botones de reintento)."),
        ("OCP (Principio de Abierto/Cerrado):", 
         "El estado interno del servicio es privado (private state = signal<TicketState>). Se expone hacia el exterior únicamente mediante señales derivadas de solo lectura (computed()). De este modo, la vista está abierta a la extensión (podemos crear nuevos selectores o filtros derivados) pero el estado base está herméticamente cerrado a mutaciones arbitrarias directas desde fuera."),
        ("DIP (Principio de Inversión de Dependencias):", 
         "Se aplica mediante el sistema moderno de inyección de dependencias de Angular a través de la función inject(). El servicio depende de la abstracción HttpClient (inject(HttpClient)), y el componente no instancia con 'new' el servicio, sino que Angular se lo inyecta (inject(TicketService)), facilitando la modularidad y futuros tests unitarios con mocks.")
    ]
    for sp_title, sp_desc in solid_points:
        p = doc.add_paragraph()
        r1 = p.add_run(f"• {sp_title} ")
        r1.bold = True
        r1.font.color.rgb = RGBColor(27, 104, 216)
        r2 = p.add_run(sp_desc)
    
    # ------------------ SECCIÓN 4: IMPLEMENTACIÓN TÉCNICA ------------------
    h4 = doc.add_heading(level=1)
    r_h4 = h4.add_run("4. Implementación del Laboratorio Paso a Paso")
    r_h4.font.color.rgb = RGBColor(15, 45, 90)
    
    # Fase A
    h4_a = doc.add_heading(level=2)
    r_h4a = h4_a.add_run("Fase A: El Servicio de Estado (src/app/core/services/ticket.service.ts)")
    r_h4a.font.color.rgb = RGBColor(27, 104, 216)
    
    doc.add_paragraph(
        "Se implementa el patrón Store encapsulando el estado mutable de la API. Definimos las interfaces fuertemente tipadas Ticket y TicketState, "
        "declaramos la señal writable privada y exponemos las señales computadas públicas tickets, isLoading y errorMessage:"
    )
    
    code_service = (
        "import { Injectable, signal, computed, inject } from '@angular/core';\n"
        "import { HttpClient } from '@angular/common/http';\n\n"
        "export interface Ticket {\n"
        "  id: number;\n"
        "  title: string;\n"
        "  completed: boolean;\n"
        "}\n\n"
        "interface TicketState {\n"
        "  data: Ticket[];\n"
        "  loading: boolean;\n"
        "  error: string | null;\n"
        "}\n\n"
        "@Injectable({ providedIn: 'root' })\n"
        "export class TicketService {\n"
        "  // DIP: Inyección de dependencias moderna con inject()\n"
        "  private http = inject(HttpClient);\n\n"
        "  // OCP & Encapsulación: El estado es privado y mutable solo desde aquí\n"
        "  private state = signal<TicketState>({\n"
        "    data: [],\n"
        "    loading: false,\n"
        "    error: null\n"
        "  });\n\n"
        "  // Exposición controlada (Solo lectura / Derivaciones reactivas)\n"
        "  public tickets = computed(() => this.state().data);\n"
        "  public isLoading = computed(() => this.state().loading);\n"
        "  public errorMessage = computed(() => this.state().error);\n\n"
        "  public fetchTickets(): void {\n"
        "    // Mutación inicial: Activamos el indicador de carga\n"
        "    this.state.update(s => ({ ...s, loading: true, error: null }));\n\n"
        "    this.http.get<Ticket[]>('https://jsonplaceholder.typicode.com/todos?_limit=15')\n"
        "      .subscribe({\n"
        "        next: (response) => {\n"
        "          this.state.update(s => ({ ...s, data: response, loading: false }));\n"
        "        },\n"
        "        error: () => {\n"
        "          this.state.update(s => ({\n"
        "            ...s,\n"
        "            error: 'Error de red al contactar con el servidor. Revise su conexión.',\n"
        "            loading: false\n"
        "          }));\n"
        "        }\n"
        "      });\n"
        "  }\n"
        "}"
    )
    add_code_block(doc, code_service)
    
    # Fase B
    h4_b = doc.add_heading(level=2)
    r_h4b = h4_b.add_run("Fase B: El Componente Visual (src/app/features/ticket-dashboard/ticket-dashboard.component.ts)")
    r_h4b.font.color.rgb = RGBColor(27, 104, 216)
    
    doc.add_paragraph(
        "Conectamos la interfaz de usuario al servicio mediante inyección reactiva y aplicamos una señal local para el filtrado en memoria. "
        "Se aplica ChangeDetectionStrategy.OnPush para evitar comprobaciones innecesarias del árbol de componentes, y el nuevo Control Flow "
        "de Angular (@if, @else if, @else, @for, @empty) para la renderización:"
    )
    
    code_comp = (
        "import { Component, computed, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';\n"
        "import { TicketService } from '../../core/services/ticket.service';\n"
        "import {\n"
        "  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,\n"
        "  IonLabel, IonSpinner, IonText, IonButton, IonList, IonItem, IonBadge\n"
        "} from '@ionic/angular';\n\n"
        "@Component({\n"
        "  selector: 'app-ticket-dashboard',\n"
        "  standalone: true,\n"
        "  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización de renderizado\n"
        "  imports: [\n"
        "    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,\n"
        "    IonLabel, IonSpinner, IonText, IonButton, IonList, IonItem, IonBadge\n"
        "  ],\n"
        "  template: `\n"
        "    <ion-header>\n"
        "      <ion-toolbar color=\"dark\">\n"
        "        <ion-title>TechTicket FP</ion-title>\n"
        "      </ion-toolbar>\n"
        "    </ion-header>\n"
        "    <ion-content class=\"ion-padding\">\n"
        "      <ion-segment (ionChange)=\"cambiarFiltro($event)\" value=\"todos\" class=\"ion-margin-bottom\">\n"
        "        <ion-segment-button value=\"todos\"><ion-label>Todos</ion-label></ion-segment-button>\n"
        "        <ion-segment-button value=\"abiertos\"><ion-label>Abiertos</ion-label></ion-segment-button>\n"
        "        <ion-segment-button value=\"cerrados\"><ion-label>Cerrados</ion-label></ion-segment-button>\n"
        "      </ion-segment>\n"
        "      @if (ticketService.isLoading()) {\n"
        "        <div class=\"ion-text-center ion-margin-top\">\n"
        "          <ion-spinner name=\"dots\"></ion-spinner>\n"
        "          <p>Sincronizando incidencias...</p>\n"
        "        </div>\n"
        "      } @else if (ticketService.errorMessage()) {\n"
        "        <div class=\"ion-text-center\">\n"
        "          <ion-text color=\"danger\"><p>{{ ticketService.errorMessage() }}</p></ion-text>\n"
        "          <ion-button (click)=\"cargarDatos()\" size=\"small\">Reintentar</ion-button>\n"
        "        </div>\n"
        "      } @else {\n"
        "        <ion-list>\n"
        "          @for (ticket of ticketsFiltrados(); track ticket.id) {\n"
        "            <ion-item>\n"
        "              <ion-label><h2>#{{ ticket.id }} - {{ ticket.title }}</h2></ion-label>\n"
        "              <ion-badge slot=\"end\" [color]=\"ticket.completed ? 'success' : 'warning'\">\n"
        "                {{ ticket.completed ? 'Resuelto' : 'Pendiente' }}\n"
        "              </ion-badge>\n"
        "            </ion-item>\n"
        "          } @empty {\n"
        "            <ion-item><ion-label class=\"ion-text-center\">No hay incidencias en esta vista.</ion-label></ion-item>\n"
        "          }\n"
        "        </ion-list>\n"
        "      }\n"
        "    </ion-content>\n"
        "  `\n"
        "})\n"
        "export class TicketDashboardComponent implements OnInit {\n"
        "  public ticketService = inject(TicketService);\n"
        "  public filtroActual = signal<'todos' | 'abiertos' | 'cerrados'>('todos');\n\n"
        "  public ticketsFiltrados = computed(() => {\n"
        "    const data = this.ticketService.tickets();\n"
        "    const filtro = this.filtroActual();\n"
        "    if (filtro === 'abiertos') return data.filter(t => !t.completed);\n"
        "    if (filtro === 'cerrados') return data.filter(t => t.completed);\n"
        "    return data;\n"
        "  });\n\n"
        "  ngOnInit() { this.cargarDatos(); }\n"
        "  public cargarDatos(): void { this.ticketService.fetchTickets(); }\n"
        "  public cambiarFiltro(event: any): void { this.filtroActual.set(event.detail.value); }\n"
        "}"
    )
    add_code_block(doc, code_comp)
    
    # ------------------ SECCIÓN 5: DESPLIEGUE EN ANDROID (CAPACITOR) ------------------
    h5 = doc.add_heading(level=1)
    r_h5 = h5.add_run("5. Empaquetado y Despliegue en Android (Capacitor)")
    r_h5.font.color.rgb = RGBColor(15, 45, 90)
    
    doc.add_paragraph(
        "Para dar cumplimiento al Resultado de Aprendizaje RA 7 (CE 7.a, CE 7.c), se trasladó la aplicación web reactiva "
        "a un contenedor nativo Android mediante Capacitor 8. Este proceso compila el código TypeScript/Angular en un bundle estático "
        "optimizado (HTML/JS/CSS en la carpeta www/) y lo sincroniza con el proyecto nativo de Android Studio:"
    )
    
    cap_steps = [
        ("1. Compilación del proyecto de producción:",
         "Genera los artefactos minificados y optimizados AOT mediante esbuild/vite:\nionic build --prod"),
        ("2. Integración de Capacitor y la plataforma Android:",
         "Añade el andamiaje nativo generando el directorio android/ con Gradle preconfigurado:\nnpx cap add android"),
        ("3. Sincronización del código web y plugins nativos:",
         "Copia los assets de www/ dentro de android/app/src/main/assets/public y actualiza plugins (@capacitor/app, @capacitor/status-bar, etc.):\nnpx cap sync android"),
        ("4. Ejecución y Testing en el dispositivo:",
         "• Vía IDE (Android Studio): npx cap open android\n• Vía CLI directa (Emulador o USB/ADB físico): npx cap run android")
    ]
    for step_title, step_cmd in cap_steps:
        p = doc.add_paragraph()
        r1 = p.add_run(f"{step_title}\n")
        r1.bold = True
        r1.font.color.rgb = RGBColor(27, 104, 216)
        r2 = p.add_run(step_cmd)
        r2.font.name = 'Consolas'
        r2.font.size = Pt(9.5)
    
    # ------------------ SECCIÓN 6: EVIDENCIAS Y CAPTURAS ------------------
    h6 = doc.add_heading(level=1)
    r_h6 = h6.add_run("6. Evidencias de Pruebas y Validación Visual")
    r_h6.font.color.rgb = RGBColor(15, 45, 90)
    
    doc.add_paragraph(
        "A continuación se adjuntan las capturas de pantalla de la ejecución real de TechTicket FP, demostrando la reactividad "
        "de las señales, el filtrado dinámico en memoria, el control de flujo asíncrono y la integración móvil con Capacitor:"
    )
    
    capturas_info = [
        ("captura1_lista_todos.png", 
         "Figura 1: Vista general con filtro 'Todos'",
         "Muestra el listado de 15 incidencias consumidas desde JSONPlaceholder API. Las incidencias completadas muestran el badge verde 'Resuelto' (ion-badge color='success') y las pendientes el badge amarillo 'Pendiente' (color='warning')."),
        ("captura2_filtro_abiertos.png",
         "Figura 2: Filtrado reactivo 'Abiertos' en memoria",
         "Al pulsar el botón del ion-segment 'Abiertos', la señal computada ticketsFiltrados() se recalcula de forma síncrona y granular, filtrando únicamente las tareas pendientes (completed: false) sin recargar la página."),
        ("captura3_filtro_cerrados.png",
         "Figura 3: Filtrado reactivo 'Cerrados' en memoria",
         "Al seleccionar 'Cerrados', se evalúa t.completed === true. Angular actualiza el DOM quirúrgicamente gracias al algoritmo de reconciliación de @for con track ticket.id."),
        ("captura4_estado_loading.png",
         "Figura 4: Estado asíncrono de Carga (ion-spinner)",
         "Retroalimentación visual de usabilidad (RA 4, CE 4.b). Durante el retardo de la red HTTP, la señal isLoading() evalúa true y renderiza el spinner de puntos con el mensaje 'Sincronizando incidencias...'."),
        ("captura5_consola_red.png",
         "Figura 5: Inspección de Red y Consola (Network DevTools)",
         "Verificación del tráfico HTTP GET hacia 'https://jsonplaceholder.typicode.com/todos?_limit=15' con status 200 OK y deserialización automática al array de interfaces Ticket[]."),
        ("captura6_android_capacitor.png",
         "Figura 6: Terminal de empaquetado nativo Capacitor Android",
         "Evidencia de compilación de producción (ionic build --prod), creación del andamiaje nativo Android (npx cap add android) y sincronización de assets estáticos (npx cap sync android) para RA 7.")
    ]
    
    capturas_dir = os.path.join(os.path.dirname(__file__), 'capturas')
    for img_name, fig_title, fig_desc in capturas_info:
        img_path = os.path.join(capturas_dir, img_name)
        
        p_f = doc.add_paragraph()
        p_f.paragraph_format.space_before = Pt(8)
        p_f.paragraph_format.space_after = Pt(2)
        r_f = p_f.add_run(fig_title)
        r_f.bold = True
        r_f.font.size = Pt(10.5)
        r_f.font.color.rgb = RGBColor(15, 45, 90)
        
        p_d = doc.add_paragraph(fig_desc)
        p_d.paragraph_format.space_after = Pt(6)
        p_d.runs[0].font.size = Pt(9.5)
        p_d.runs[0].font.italic = True
        p_d.runs[0].font.color.rgb = RGBColor(90, 100, 115)
        
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_after = Pt(12)
            # Width scaled nicely
            if "consola" in img_name or "android" in img_name:
                doc.add_picture(img_path, width=Inches(5.8))
            else:
                doc.add_picture(img_path, width=Inches(3.4))
    
    # ------------------ SECCIÓN 7: CONCLUSIONES Y COMPARATIVA ------------------
    h7 = doc.add_heading(level=1)
    r_h7 = h7.add_run("7. Conclusiones y Comparativa de Rendimiento")
    r_h7.font.color.rgb = RGBColor(15, 45, 90)
    
    doc.add_paragraph(
        "El desarrollo del laboratorio TechTicket FP pone de manifiesto la madurez del ecosistema Angular 22 e Ionic 9 "
        "para el desarrollo de aplicaciones móviles multiplataforma de alto rendimiento. Las conclusiones clave extraídas son:"
    )
    
    concl = [
        ("Eficiencia Reactiva (Signals vs Dirty Checking):",
         "La transición de Zone.js hacia Signals elimina las evaluaciones periódicas e indiscriminadas de todo el árbol de componentes. Al delegar la reactividad en un grafo de dependencias de grano fino (Fine-grained reactivity), el consumo de batería y CPU del dispositivo móvil disminuye drásticamente."),
        ("Simplicidad de Mantenimiento con Store Pattern:",
         "La centralización del estado en TicketService siguiendo SOLID garantiza que cualquier modificación en la API o lógica de negocio no impacta negativamente en la vista. Los componentes se mantienen puramente declarativos."),
        ("Experiencia de Usuario Móvil (UX):",
         "El control de estados asíncronos (@if isLoading / @else if errorMessage) garantiza que la aplicación nunca muestre pantallas en blanco ni estados indeterminados ante caídas de red o latencia elevada."),
        ("Portabilidad Nativa con Capacitor:",
         "Capacitor demuestra ser una alternativa moderna, limpia y superior a Cordova, generando proyectos Gradle estándar que pueden abrirse y personalizarse directamente en Android Studio.")
    ]
    for c_title, c_desc in concl:
        p = doc.add_paragraph()
        r1 = p.add_run(f"✔ {c_title} ")
        r1.bold = True
        r1.font.color.rgb = RGBColor(27, 104, 216)
        r2 = p.add_run(c_desc)
    
    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Memoria_Tecnica_TechTicket_Alejandro.docx'))
    doc.save(output_path)
    print(f"Documento Word guardado exitosamente en: {output_path}")

if __name__ == '__main__':
    build_document()
