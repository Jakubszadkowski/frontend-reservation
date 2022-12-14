import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { variable } from '../resource/variable';


const httpOptions = {
  headers: new HttpHeaders({ "Access-Control-Allow-Origin": "http://localhost:4200",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post(variable.API_URL + 'session/auth', {
      "email":email,
      "password":password
    }, httpOptions);
  }

  register(name: string,surname: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post(variable.API_URL + 'user/createUser', {
      "name":name,
      "surname":surname,
      "email":email,
      "phone":phone,
      "password":password
    }, httpOptions);
  }
  deleteMe(id: string): Observable<any> {
    return this.http.post(variable.API_URL + 'user/deleteUserById', {
      "userId":id,

    }, httpOptions);
  }

  logout(text: string): Observable<any>{
    console.log("Auth id = "+text)
    return this.http.post(variable.API_URL + 'session/logout', {
      "email":text
    }, httpOptions);
  }
  
}
