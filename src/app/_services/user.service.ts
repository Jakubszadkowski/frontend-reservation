import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { variable } from '../resource/variable';
import { User } from '../model/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get<User>(variable.API_URL + 'user/getAllSurnames');
  }

  getUserBoard(): Observable<any> {
    return this.http.get(variable.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(variable.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(variable.API_URL + 'admin', { responseType: 'text' });
  }
}
