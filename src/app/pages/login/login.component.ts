import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authenticate/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(private router: Router){}

  loginForm = this.fb.nonNullable.group({
    studentId: [0, [Validators.required, Validators.min(1)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  message: string | null = null;

  login() {
    if (this.loginForm.valid) {
      const { studentId, password } = this.loginForm.getRawValue();

      this.authService.getLogIn(Number(studentId), password).subscribe(response => {
        this.message = response ? 'Success' : 'ID or Wrong Password';
        if(response){
          this.router.navigate(['/students']);
        }        
      });
    }
  }
}
