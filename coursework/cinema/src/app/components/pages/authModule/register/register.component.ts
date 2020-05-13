import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  public get loginControl(): AbstractControl {
    return this.registerForm.get('login');
  }

  public get passwordControl(): AbstractControl {
    return this.registerForm.get('password');
  }

  public get passwordRepeatControl(): AbstractControl {
    return this.registerForm.get('passwordRepeat');
  }

  private redirectAfterSuccess() {
    // @todo add query param after redirect
    window.location.href = '/';
  }

  public passwordsAreInvalid(): boolean {
    return this.passwordsDontEqual ||
           (this.passwordControl.touched && this.passwordControl.invalid ||
           this.passwordRepeatControl.touched && this.passwordRepeatControl.invalid);

  }

  passwordsDontEqual: boolean;
  loginUsed: boolean;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.loginUsed = false;
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      login: new FormControl('', [trimmedMinLength(3)]),
      password: new FormControl('', [trimmedMinLength(3)]),
      passwordRepeat: new FormControl('', [trimmedMinLength(3)])
    })
  }

  public onSubmit(value) {
    this.registerForm.markAllAsTouched();
    if (this.passwordControl.value !== this.passwordRepeatControl.value) {
      this.passwordsDontEqual = true;
      return;
    }

    if (this.registerForm.invalid)
      return;

    this.passwordsDontEqual = false;
    this.loginUsed = false;

    this.authService.register(value)
      .subscribe(res => {
        if (!res) {
          this.loginUsed = true;
        } else {
          this.redirectAfterSuccess();
        }
      })

  }

  onGoogleAuth(user: User) {
    this.passwordsDontEqual = false;
    this.loginUsed = false;

    this.authService.onSocialAuth(user)
    .subscribe(() => this.redirectAfterSuccess());
  }

}


