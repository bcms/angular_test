import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    const helper = new JwtHelperService();
    if (this.loginService.currentUserValue) {
      let tokenDecoded = helper.decodeToken(this.loginService.currentUserValue.token);
      
      this.panelA = tokenDecoded.profile.PainelA;
      this.panelB = tokenDecoded.profile.PainelB;
    }
  }

  panelA: boolean;
  panelB: boolean;
}
