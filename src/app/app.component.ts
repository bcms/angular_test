import { Component } from '@angular/core';
import { LoginService } from './login/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public get currentUser() { return this.loginService.currentUser; }
}
