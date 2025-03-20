import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-datatable',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {
  @Input() headers: string[] = []; 
  @Input() data: any[] = []; 

  searchTerm: string = '';

  filteredData() {
    return this.data.filter(row =>
      Object.values(row).some((value: any) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}