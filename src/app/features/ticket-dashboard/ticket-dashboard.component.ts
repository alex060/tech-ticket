import { Component, computed, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonText,
  IonButton,
  IonList,
  IonItem,
  IonBadge
} from '@ionic/angular';

@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSpinner,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonBadge
  ],
  templateUrl: './ticket-dashboard.component.html',
  styleUrls: ['./ticket-dashboard.component.scss']
})
export class TicketDashboardComponent implements OnInit {
  public ticketService = inject(TicketService);

  // Estado local de la vista
  public filtroActual = signal<'todos' | 'abiertos' | 'cerrados'>('todos');

  // Composición Reactiva: Se recalcula automáticamente si cambia la API o el filtro
  public ticketsFiltrados = computed(() => {
    const data = this.ticketService.tickets();
    const filtro = this.filtroActual();

    if (filtro === 'abiertos') return data.filter(t => !t.completed);
    if (filtro === 'cerrados') return data.filter(t => t.completed);
    return data;
  });

  ngOnInit() {
    this.cargarDatos();
  }

  public cargarDatos(): void {
    this.ticketService.fetchTickets();
  }

  public cambiarFiltro(event: any): void {
    this.filtroActual.set(event.detail.value);
  }
}
