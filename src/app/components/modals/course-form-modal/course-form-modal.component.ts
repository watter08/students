import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-course-form-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-form-modal.component.html',
  styleUrl: './course-form-modal.component.scss'
})
export class CourseFormModalComponent implements AfterViewInit {
  @ViewChild('modalElement') modalRef!: ElementRef;
  private modalInstance!: Modal;

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modalRef.nativeElement);
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }
}
