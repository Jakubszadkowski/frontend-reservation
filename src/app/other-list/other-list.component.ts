import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.sass']
})
export class OtherListComponent implements OnInit {

  constructor(private userService:UserService) { }
  users:User[]=[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next:(data:User[])=>{
        this.users=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }

}
