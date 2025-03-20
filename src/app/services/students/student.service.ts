import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = [
    { "StudentId": 1, "CourseId": 1, "Name": "Juan", "Lastname": "Pérez", "Age": 20, "Born": "2004-03-15T00:00:00", "Address": "Calle 123, Ciudad A" },
    { "StudentId": 2, "CourseId": 2, "Name": "María", "Lastname": "Gómez", "Age": 22, "Born": "2002-07-22T00:00:00", "Address": "Avenida 456, Ciudad B" },
    { "StudentId": 3, "CourseId": 3, "Name": "Carlos", "Lastname": "López", "Age": 19, "Born": "2005-01-10T00:00:00", "Address": "Calle Falsa 789, Ciudad C" },
    { "StudentId": 4, "CourseId": 1, "Name": "Ana", "Lastname": "Martínez", "Age": 21, "Born": "2003-05-30T00:00:00", "Address": "Barrio Verde, Ciudad D" },
    { "StudentId": 5, "CourseId": 2, "Name": "Pedro", "Lastname": "Ramírez", "Age": 23, "Born": "2001-09-12T00:00:00", "Address": "Zona Centro, Ciudad E" },
    { "StudentId": 6, "CourseId": 3, "Name": "Luisa", "Lastname": "Hernández", "Age": 18, "Born": "2006-12-03T00:00:00", "Address": "Calle Azul, Ciudad F" },
    { "StudentId": 7, "CourseId": 1, "Name": "José", "Lastname": "Fernández", "Age": 20, "Born": "2004-08-21T00:00:00", "Address": "Avenida Principal, Ciudad G" },
    { "StudentId": 8, "CourseId": 2, "Name": "Sofía", "Lastname": "Castro", "Age": 19, "Born": "2005-04-18T00:00:00", "Address": "Urbanización Sur, Ciudad H" },
    { "StudentId": 9, "CourseId": 3, "Name": "Miguel", "Lastname": "Ortega", "Age": 22, "Born": "2002-11-25T00:00:00", "Address": "Calle Roja, Ciudad I" },
    { "StudentId": 10, "CourseId": 1, "Name": "Elena", "Lastname": "Vega", "Age": 21, "Born": "2003-02-08T00:00:00", "Address": "Colonia Este, Ciudad J" },
    { "StudentId": 11, "CourseId": 2, "Name": "Diego", "Lastname": "Navarro", "Age": 24, "Born": "2000-06-14T00:00:00", "Address": "Pueblo Nuevo, Ciudad K" },
    { "StudentId": 12, "CourseId": 3, "Name": "Valeria", "Lastname": "Méndez", "Age": 18, "Born": "2006-10-07T00:00:00", "Address": "Sector Norte, Ciudad L" },
    { "StudentId": 13, "CourseId": 1, "Name": "Manuel", "Lastname": "Cabrera", "Age": 20, "Born": "2004-09-30T00:00:00", "Address": "Calle Amarilla, Ciudad M" },
    { "StudentId": 14, "CourseId": 2, "Name": "Andrea", "Lastname": "Silva", "Age": 19, "Born": "2005-07-11T00:00:00", "Address": "Zona Industrial, Ciudad N" },
    { "StudentId": 15, "CourseId": 3, "Name": "Fernando", "Lastname": "Delgado", "Age": 22, "Born": "2002-03-28T00:00:00", "Address": "Boulevard 5, Ciudad O" },
    { "StudentId": 16, "CourseId": 1, "Name": "Camila", "Lastname": "Guzmán", "Age": 21, "Born": "2003-12-15T00:00:00", "Address": "Residencial Sur, Ciudad P" },
    { "StudentId": 17, "CourseId": 2, "Name": "Oscar", "Lastname": "Reyes", "Age": 23, "Born": "2001-05-06T00:00:00", "Address": "Avenida Ancha, Ciudad Q" },
    { "StudentId": 18, "CourseId": 3, "Name": "Patricia", "Lastname": "Morales", "Age": 18, "Born": "2006-08-19T00:00:00", "Address": "Paseo Central, Ciudad R" },
    { "StudentId": 19, "CourseId": 1, "Name": "Javier", "Lastname": "Pacheco", "Age": 20, "Born": "2004-11-02T00:00:00", "Address": "Villa del Mar, Ciudad S" },
    { "StudentId": 20, "CourseId": 2, "Name": "Gabriela", "Lastname": "Rojas", "Age": 19, "Born": "2005-09-17T00:00:00", "Address": "Plaza Mayor, Ciudad T" }
  ];
  
  constructor(private http: HttpClient) { }

  getStudent(filters: any): Observable<any[]> {
    const { courseId, name, lastname, age } = filters;
    
    let filtered: any = [];
    filtered = this.students.filter((student) => {
      const isCourseIdMatch = courseId === '' || courseId === 0 ? true : student.CourseId === courseId;
      const isNameMatch = name === '' ? true : student.Name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      const isLastnameMatch = lastname === '' ? true : student.Lastname.toLocaleLowerCase().includes(lastname.toLocaleLowerCase());
      const isAgeMatch = age === '' ? true : student.Age === age;  
      return isCourseIdMatch && isNameMatch && isLastnameMatch && isAgeMatch;
    });
  
    return of(filtered);
  }
  
}
