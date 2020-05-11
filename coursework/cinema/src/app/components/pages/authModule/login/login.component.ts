import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService) { }

  public get loginControl(): AbstractControl {
    return this.loginForm.get('login');
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  public errorOccured = false;

  private navigateAfterSuccess() {
    window.location.href = '/';
  }

  ngOnInit() {

    const loginValidators = [Validators.required, trimmedMinLength(3)];
    const passwordValidators = [Validators.required];

    this.loginForm = new FormGroup({
      login: new FormControl('', loginValidators),
      password: new FormControl('', passwordValidators)
    })
  }

  public onSubmit(value) {
    if (!this.loginForm.valid)
      return;
    this.authService.login(value.login, value.password)
      .then((user: User) => {
        if (user) {
          this.navigateAfterSuccess();
          this.errorOccured = false;
        }
        else {
          this.errorOccured = true;
        }
      })

  }

  public onGoogleAuth(user) {
    this.authService.onSocialAuth(user)
    .then(() => this.navigateAfterSuccess());
  }


}
