import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  sendForm(formData: any) {
    return this.http.post(`${this.apiUrl}/technology`, formData);
  }
 
  fetchRingOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/options/rings`);
  }

  fetchCategoriesOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/options/categories`);
  }

  // To-Implement
  // fetchAllElements(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/technology`);
  // }
  // fetchElementById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/elements/${id}`);
  // }
}