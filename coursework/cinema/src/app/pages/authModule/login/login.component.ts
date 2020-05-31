import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService,
              private router: Router,
              private toastService: ToastService) { }

  public get loginControl(): AbstractControl {
    return this.loginForm.get('login');
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  public errorOccured = false;



  ngOnInit() {

    const loginValidators = [Validators.required, trimmedMinLength(3)];
    const passwordValidators = [Validators.required];

    this.loginForm = new FormGroup({
      login: new FormControl('', loginValidators),
      password: new FormControl('', passwordValidators)
    });
  }

  public onSubmit(value) {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(value.login, value.password)
      .subscribe((user: User) => {
        if (user) {
          this.onSuccess();
          this.errorOccured = false;
        } else {
          this.errorOccured = true;
        }
      });

  }

  public onGoogleAuth(user) {
    this.authService.onSocialAuth(user)
    .subscribe(() => {
      this.onSuccess();
    });
  }

  private onSuccess() {
    this.toastService.success('You have been successfully logged in', '');
    this.router.navigate(['/home']);
  }

}
