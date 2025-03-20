import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-course-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form-modal.component.html',
  styleUrl: './course-form-modal.component.scss'
})
export class CourseFormModalComponent implements AfterViewInit {
  @ViewChild('modalElement') modalRef!: ElementRef;
  private modalInstance!: Modal;
  private fb = inject(FormBuilder);

  @Input() courseData: { courseId?: string, description?: string } | null = null;
  @Output() onSubmit = new EventEmitter<{ courseId?: string, description: string }>();

  courseForm = this.fb.nonNullable.group({
    courseId: [{ value: '', disabled: true }],
    description: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modalRef.nativeElement);
  }

  openModal() {
    this.modalRef.nativeElement.setAttribute('aria-hidden', 'false');
    this.setFormData();
    this.modalInstance.show();
  }

  closeModal() {
    this.modalRef.nativeElement.setAttribute('aria-hidden', 'true');
    this.modalInstance.hide();
  }

  setFormData() {
    if (this.courseData) {
      this.courseForm.patchValue({
        courseId: this.courseData.courseId || '',
        description: this.courseData.description || ''
      });
    } else {
      this.cleanInputs();
    }
  }

  cleanInputs() {
    this.courseForm.reset({
      courseId: '',
      description: ''
    });
  }

  addCourse() {
    if (this.courseForm.valid) {
      this.onSubmit.emit(this.courseForm.getRawValue());
      this.closeModal();
    }
  }
}
