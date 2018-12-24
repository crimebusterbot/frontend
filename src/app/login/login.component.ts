import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to overview
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/check';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);

          if (error.error && error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'Something went wrong processing your request.';
          }
        }
      );
  }
}
