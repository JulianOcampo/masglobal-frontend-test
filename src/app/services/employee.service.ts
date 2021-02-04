import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  }
  constructor(
    private http: HttpClient,

  ) { }
  getEmployees(url: string): Observable<any> {
    return this.http.get<any>(url + environment.getEmployees, { observe: 'body', ...this.httpOptions })
  }

  getEmployee(id: number, url: string): Observable<any> {
    return this.http.get<any>(url + environment.getEmployee + `/${id}`, { observe: 'body', ...this.httpOptions })
  }
}
