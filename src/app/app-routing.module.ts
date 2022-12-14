import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtherListComponent } from './other-list/other-list.component';
import { OtherResolver } from './others/other-resolver';
import { OthersComponent } from './others/others.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomResolver } from './room/room-resolve';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'admin',component:BoardAdminComponent},
  {path: 'kadra',component:OtherListComponent},
  {path: 'room',component:RoomListComponent},
  {path: 'calendar',component:CalendarComponent},
  {
    path: 'kadra/:id',
    component: OthersComponent,
    resolve: {
      user: OtherResolver,
    },
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    resolve: {
      room: RoomResolver,
    },
  },
  {path: '',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
