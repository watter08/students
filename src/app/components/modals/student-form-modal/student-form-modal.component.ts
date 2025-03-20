import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-student-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form-modal.component.html',
  styleUrl: './student-form-modal.component.scss'
})
export class StudentFormModalComponent implements AfterViewInit, OnChanges {
  @ViewChild('modalElement') modalRef!: ElementRef;
  private modalInstance!: Modal;
  private fb = inject(FormBuilder);

  @Input() studentData: { StudentId?: any, CourseId?: any, Name?: string, Lastname?: string, Age?: number, Born?: string, Address?: string } | null = null;
  @Output() onSubmit = new EventEmitter<{ StudentId?: number, CourseId?: number, Name: string, Lastname: string, Age: number, Born: string, Address: string }>();

  studentForm = this.fb.nonNullable.group({
    StudentId: [{ value: '', disabled: true }],
    CourseId: ['', Validators.required],
    Name: ['', [Validators.required, Validators.minLength(3)]],
    Lastname: ['', Validators.required],
    Age: [0, [Validators.required, Validators.min(0)]],
    Born: ['', Validators.required],
    Address: ['', Validators.required]
  });

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modalRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentData'] && changes['studentData'].currentValue) {
      this.setFormData();
    }
  }

  openModal() {
    this.modalRef.nativeElement.setAttribute('aria-hidden', 'false');
    this.modalInstance.show();
  }

  closeModal() {
    this.modalRef.nativeElement.setAttribute('aria-hidden', 'true');
    this.modalInstance.hide();
  }

  setFormData() {
    if (this.studentData) {
      this.studentForm.patchValue({
        StudentId: this.studentData.StudentId || '',
        CourseId: this.studentData.CourseId || '',
        Name: this.studentData.Name || '',
        Lastname: this.studentData.Lastname || '',
        Age: this.studentData.Age ?? 0,
        Born: this.studentData.Born ? this.studentData.Born.split('T')[0] : '', // Formatea la fecha
        Address: this.studentData.Address || ''
      });
    } else {
      this.cleanInputs();
    }
  }

  cleanInputs() {
    this.studentForm.reset({
      StudentId: '',
      CourseId: '',
      Name: '',
      Lastname: '',
      Age: 0,
      Born: '',
      Address: ''
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.getRawValue();
  
      const formattedData = {
        ...formData,
        StudentId: formData.StudentId ? Number(formData.StudentId) : undefined,
        CourseId: formData.CourseId ? Number(formData.CourseId) : undefined,
        Age: Number(formData.Age) 
      };
  
      this.onSubmit.emit(formattedData);
      this.closeModal();
    }
  }
}
