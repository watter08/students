import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { LoginComponent } from './pages/login/login.component';
import { CourseComponent } from './pages/course/course.component';
import { authGuard } from './guards/auth.guard';  

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'students', component: StudentsComponent, canActivate: [authGuard] },  
  { path: 'course', component: CourseComponent, canActivate: [authGuard] },  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
