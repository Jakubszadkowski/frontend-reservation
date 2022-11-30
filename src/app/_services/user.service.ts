import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { variable } from '../resource/variable';
import { User } from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({ "Access-Control-Allow-Origin": "http://localhost:4200",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS" })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get<User>(variable.API_URL + 'user/getAllSurnames',httpOptions);
  }


  editUser(user:User):Observable<any>{
    return this.http.patch(variable.API_URL + 'user/patchUser',user,httpOptions)
  }
}
