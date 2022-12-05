import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Resolve,ActivatedRouteSnapshot, Router } from "@angular/router";
import { OthersComponent } from "./others.component";
import { catchError, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class OtherResolver implements Resolve<OthersComponent>{

    constructor(private userService:UserService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.userService
          .getUserById(route.params['id'])
          .pipe(catchError((err) => this.router.navigateByUrl('/')));
       }
}