import { Component, OnInit, ComponentFactoryResolver } from "@angular/core";
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfuly');
    },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/reminders']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
