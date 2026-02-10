import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FacturaListar } from '../../../models/factura.models';


@Component({
  selector: 'app-ver-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent {

  @Input() factura: FacturaListar | null = null;
  @Output() cerrar = new EventEmitter<void>();

  descargando: boolean = false;

  // Método Mágico: Convierte el HTML en PDF
  descargarPDF() {
    this.descargando = true;
    const data = document.getElementById('factura-visual'); 

    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        const imgWidth = 208; 
        const pageHeight = 295; 
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(`Factura-${this.factura?.numeroFactura}.pdf`);
        
        this.descargando = false;
      });
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}