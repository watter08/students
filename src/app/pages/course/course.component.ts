import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/courses/course.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatatableComponent } from '../../components/datatable/datatable.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, DatatableComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  private fb = inject(FormBuilder);
  private service = inject(CourseService);

  headers: string[] = ['ID', 'Description'];
  data: any[] = [];

  courseForm = this.fb.nonNullable.group({
    courseId: [''],
    description: ['']
  });

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
}
