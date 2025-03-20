import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatatableComponent } from '../../components/datatable/datatable.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NavbarComponent, DatatableComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  headers: string[] = ['ID', 'Nombre', 'Puesto', 'Salario'];
  data: any = [
    { ID: 1, Nombre: 'Juan Pérez', Puesto: 'Desarrollador', Salario: 3000 },
    { ID: 2, Nombre: 'Ana Gómez', Puesto: 'Diseñadora', Salario: 2800 },
    { ID: 3, Nombre: 'Carlos Ramírez', Puesto: 'Gerente', Salario: 5000 },
    { ID: 4, Nombre: 'Laura Fernández', Puesto: 'Tester', Salario: 3200 }
  ];
}
