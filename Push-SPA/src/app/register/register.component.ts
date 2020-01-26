import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
      this.authService.login(this.model).subscribe(() => {
        this.router.navigate(['/reminders']);
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    },
      () => {
        this.router.navigate(['/reminders']);
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
