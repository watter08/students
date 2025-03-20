import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated = true;

  navItems = [
    { label: 'Students', path: '/students', icon: '🏠' },
    { label: 'Course', path: '/course', icon: '👥' },
  ];

  constructor(private router: Router) {}

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
