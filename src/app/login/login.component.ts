import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser = {"title":"","name":"","surname":"","phone":"","email":"","role":"","userId":""};

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      {next : (data)=>{
        // this.currentUser = data.user;
        this.currentUser.name = data.user.name;
        this.currentUser.surname = data.user.surname;
        this.currentUser.email = data.user.email;
        this.currentUser.phone = data.user.phone;
        this.currentUser.role = data.user.role;
        this.currentUser.userId = data.user.userId;
        this.currentUser.title = data.user.title;
        this.tokenStorage.saveToken(data.sessionId);
        this.tokenStorage.saveUser(this.currentUser);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error : (e)=>{
        console.log(e);
        this.errorMessage = e;
        this.isLoginFailed = true;
      },
      complete: () => console.info('complete')
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
