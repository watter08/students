import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://api.example.com/data';
  private courses = [
    { ID: 1, Description: "Introduction to Web Development" },
    { ID: 2, Description: "Advanced JavaScript and ES6" },
    { ID: 3, Description: "Mastering React and Redux" },
    { ID: 4, Description: "Full-Stack Development with Node.js" },
    { ID: 5, Description: "Database Design and SQL Fundamentals" },
    { ID: 6, Description: "UI/UX Design Principles" },
    { ID: 7, Description: "Cybersecurity and Ethical Hacking" },
    { ID: 8, Description: "Cloud Computing with AWS and Azure" },
    { ID: 9, Description: "Machine Learning and AI Basics" },
    { ID: 10, Description: "Mobile App Development with Flutter" }
  ];
  constructor(private http: HttpClient) { }

  getCourse(courseId: number, description: string): Observable<any[]> {
    let filtered: any = []; 
    filtered = this.courses.filter((course) => {
      const isCourseIdMatch = isNaN(courseId) || courseId === 0 ? true : course.ID === courseId;
      const isDescriptionMatch = description === '' ? true : String(course.Description).toLocaleLowerCase().includes(
        String(description).toLocaleLowerCase());  
      return isCourseIdMatch && isDescriptionMatch;
    });
    return of(filtered); 
  }

  putUpdateCourse(courseId: number, description: string): Observable<any[]> {
    const newData = this.courses.map((course) => ({
      ID: courseId === course.ID ? courseId : course.ID ,
      Description: courseId === course.ID ? description : course.Description 
    }));

    this.courses = [...newData];
    return of(this.courses);
  }

  postAddCourse(description: string): Observable<any[]> {
    const newData = [...this.courses];
    newData.push({ID:  this.courses.length + 1 , Description: description});
    this.courses = [...newData];
    return of(this.courses);
  }

}