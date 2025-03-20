import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../services/courses/course.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { CourseFormModalComponent } from '../../components/modals/course-form-modal/course-form-modal.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, DatatableComponent, CourseFormModalComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  @ViewChild(CourseFormModalComponent) modalComponent!: CourseFormModalComponent;

  private fb = inject(FormBuilder);
  private service = inject(CourseService);

  headers: string[] = ['ID', 'Description'];
  data: any[] = [];
  selectedCourse: { ID?: string, Description?: string } | null = null;

  actions = [
    { icon: 'bi bi-pencil-square text-success', action: (row: any) => this.updateRow(row) },
    { icon: 'bi bi-trash text-danger', action: (row: any) => this.deleteRow(row) }
  ];

  courseForm = this.fb.nonNullable.group({
    courseId: [''],
    description: ['']
  });

  openModal() {
    if (this.modalComponent) {
      this.modalComponent.openModal();
    } else {
      console.error('ModalComponent is not initialized');
    }
  }

  cleanInputs() {
    this.courseForm.reset({
      courseId: '',
      description: ''
    });
    this.data = [];
  }

  getCourse() {
    if (this.courseForm.valid) {
      const { courseId, description } = this.courseForm.getRawValue();
      this.service.getCourse(Number(courseId), description).subscribe(response => {
       this.data = response;
      });
    }
  }

  handleCourseSave(course: { courseId?: string, description: string }) {
    if (course.courseId) {
      this.service.putUpdateCourse(Number(course.courseId), course.description).subscribe((ressponse) => {
        this.data = ressponse;
      });
    } else {
      this.service.postAddCourse(course.description).subscribe((response) => {
        if(this.data.length > 0){
          this.data = response;
        }
      });
    }
  }

  updateRow(row: any) {
    this.selectedCourse = {...row};
    this.openModal();
  }
  
  deleteRow(usuario: any) {
    console.log('Eliminando usuario:', usuario);
  }

}
