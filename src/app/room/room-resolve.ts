import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot, Router } from "@angular/router";
import { catchError, Observable } from 'rxjs';
import { RoomService } from '../_services/room.service';
import { RoomComponent } from './room.component';

@Injectable({providedIn:'root'})
export class RoomResolver implements Resolve<RoomComponent>{

    constructor(private roomService:RoomService,private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.roomService
        .getRoomById(route.params['id'])
        .pipe(catchError((err) => this.router.navigateByUrl('/')));
     }
}