import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //apiUri='http://localhost:50000';
  apiUri = 'http://34.95.82.187';
  constructor(private http: HttpClient) { }

  addEmployee(emp: any) {
    console.log(emp)
    const headers= new HttpHeaders().set('Authorization', 'EPF')
    console.log(headers)
    return this.http.post(`${this.apiUri}/addFormEmployee`, emp,{'headers':headers});
  }

  view() {
    const headers= new HttpHeaders().set('Authorization', 'EPF')
    console.log(headers)
    return this.http.get(`${this.apiUri}/viewemployee`,{'headers':headers});
  }
}
