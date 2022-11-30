import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'rezerwacja-frontend';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  temp:string = '';
  constructor(private tokenStorageService: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles.includes('admin');
      this.username = user.username;
    }
  }

  logout(): void {
    let temp = this.tokenStorageService.getUser().email;
    console.log(temp);
    this.authService.logout(temp).subscribe(
      {error : (e)=>{
        console.log(e);
      },
      complete: () => {
        this.tokenStorageService.signOut();
        window.location.reload();
      }
    });

  }
}
