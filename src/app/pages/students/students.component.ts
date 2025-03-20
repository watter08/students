import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { StudentService } from '../../services/students/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, DatatableComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  headers: string[] = ['StudentId', 'Name', 'Lastname',  'Age', 'Born', 'CourseId', 'Address'];
  data: any[] = [];
  selectedCourse: { ID?: string, Description?: string } | null = null;


  actions = [
    { icon: 'bi bi-pencil-square text-success', action: (row: any) => this.updateRow(row) },
    { icon: 'bi bi-trash text-danger', action: (row: any) => this.deleteRow(row) }
  ];

  private service = inject(StudentService);
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.nonNullable.group({
      courseId: [''],
      name: [''],
      lastname: [''],
      age: ['']
    });
  }

  openModal() {
    // if (this.modalComponent) {
    //   this.modalComponent.openModal();
    // } else {
    //   console.error('ModalComponent is not initialized');
    // }
  }

  cleanInputs() {
    this.studentForm.reset({
      courseId: '',
      description: ''
    });
    this.data = [];
  }

  getStudent() {
    if (this.studentForm.valid) {
      this.service.getStudent(this.studentForm.getRawValue()).subscribe(response => {
       this.data = response;
      });
    }
  }

  handleCourseSave(course: { courseId?: string, description: string }) {
    // if (course.courseId) {
    //   this.service.putUpdateCourse(Number(course.courseId), course.description).subscribe((ressponse) => {
    //     this.data = ressponse;
    //   });
    // } else {
    //   this.service.postAddCourse(course.description).subscribe((response) => {
    //     if(this.data.length > 0){
    //       this.data = response;
    //     }
    //   });
    // }
  }

  updateRow(row: any) {
    this.selectedCourse = {...row};
    this.openModal();
  }
  
  deleteRow(row: any) {
    // this.service.deleteCoursseById(Number(row.ID)).subscribe((response) => {
    //     this.data = response;
    // });
  }
}
