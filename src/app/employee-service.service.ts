import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>('http://localhost:3000/employees');
  }

  getSingleEmployee(empId: number): Observable<any> {
    return this._http.get(`http://localhost:3000/employees/${empId}`)
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data)
  }

  updateEmployee(empId: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${empId}`, data)
  }

  deleteEmployee(empId: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${empId}`)
  }

}
