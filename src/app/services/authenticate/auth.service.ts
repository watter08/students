import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.example.com/data';
  constructor(private http: HttpClient) { }

  getLogIn(studentId: number, password: string): Observable<string> {
    return of('token'); 
  }
}
