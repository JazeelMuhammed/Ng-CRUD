import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { District, Student } from './student.model';
import { Observable, map, of, catchError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {

  constructor(private http: HttpClient) { }

  existingEmail: string[] = [];

  subjectList: string[] = ['Maths', 'Science', 'English', 'EV', 'Malayalam'];

  ngOnInit(): void {
      
  }

  checkemailExist(value: string) {
    return of(this.existingEmail.some((email) => email === value)).pipe(
      delay(1000)
    );
  }

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(`http://localhost:3000/district`);
  }

  districtsArray = this.getDistricts();

  private getDistrictName(districtId: number): string {
    const districts: any = this.districtsArray;
    const matchingDistrict = districts.find((district: any) => district.id === districtId);
    return matchingDistrict ? matchingDistrict.name : 'Unknown District';
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>(`http://localhost:3000/student?email=${email}`);
  }
  
  studentsArray: Student[] = [];

  getStudents(): Observable<Student[]> {
    this.http.get<Student[]>(`http://localhost:3000/student`).subscribe((res) => {
      this.studentsArray = res
      for(let std of this.studentsArray){
        this.existingEmail.push(std.email)
      }
    })
    // let studentsEmailArr = this.studentsArray.map(std => std.email)
    // console.log('Emails', studentsEmailArr)
    return this.http.get<Student[]>(`http://localhost:3000/student`);
  }

  // getStudentsAndDistricts(): Observable<Student[]> {
  //   return this.getStudents().pipe(
  //     map((students) => {
  //       return students.map((student) => ({
  //         ...student,
  //         districtName: this.getDistrictName(student.district.id)
  //       }));
  //     })
  //   )
  // }

  updateEmailexists: any;

  getSingleStudent(id: number): Observable<Student> {
    // this.updateEmailexists = this.http.get<Student>(`http://localhost:3000/student/${id}`)
    return this.http.get<Student>(`http://localhost:3000/student/${id}`)
  }

  addStudent(data: Student): Observable<Student> {
    return this.http.post<Student>(`http://localhost:3000/student`, data);
  }

  editStudent(id: number, data: Student): Observable<Student> {
    this.http.put<Student>(`http://localhost:3000/student/${id}`, data).subscribe(res => {
      this.updateEmailexists = res.email
    })
    return this.http.put<Student>(`http://localhost:3000/student/${id}`, data);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`http://localhost:3000/student/${id}`);
  }

}
