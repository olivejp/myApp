import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private auth: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

    signIn() {
        console.log('Je suis authentifié !!!');
        this.auth = true;
        this.router.navigate(["/menu"])
    }
}
