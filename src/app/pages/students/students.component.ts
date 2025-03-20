import { Component, inject, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { StudentService } from '../../services/students/student.service';
import { StudentFormModalComponent } from '../../components/modals/student-form-modal/student-form-modal.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, DatatableComponent, StudentFormModalComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  @ViewChild(StudentFormModalComponent) modalComponent!: StudentFormModalComponent;
  headers: string[] = ['StudentId', 'Name', 'Lastname',  'Age', 'Born', 'CourseId', 'Address'];
  data: any[] = [];
  selectedStudent: any = null;


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
    if (this.modalComponent) {
      this.modalComponent.openModal();
    } else {
      console.error('ModalComponent is not initialized');
    }
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

  handleStudentSave(student: any) {
    if (student?.StudentId) {
      this.service.putUpdateStudent(student).subscribe((ressponse) => {
        this.data = ressponse;
      });
    } else {
      this.service.postAddStudent(student).subscribe((response) => {
        if(this.data.length > 0){
          this.data = response;
        }
      });
    }
  }

  updateRow(row: any) {
    this.selectedStudent = {...row};
    this.openModal();
  }
  
  deleteRow(row: any) {
    this.service.deleteStudentById(Number(row.StudentId)).subscribe((response) => {
        this.data = response;
    });
  }
}
