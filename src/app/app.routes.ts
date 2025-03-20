import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { LoginComponent } from './pages/login/login.component';
import { CourseComponent } from './pages/course/course.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'students', component: StudentsComponent }, 
  { path: 'course', component: CourseComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
