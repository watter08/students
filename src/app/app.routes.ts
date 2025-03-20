import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'students', component: StudentsComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
