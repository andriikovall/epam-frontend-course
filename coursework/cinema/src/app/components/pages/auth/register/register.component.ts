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
    window.location.href = '/';
  }

  passwordsInvalid: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      login: new FormControl('', [trimmedMinLength(3)]),
      password: new FormControl('', [trimmedMinLength(3)]),
      passwordRepeat: new FormControl('', [trimmedMinLength(3)])
    })
  }

  public onSubmit(value) {
    if (this.passwordControl.value !== this.passwordRepeatControl.value) {
      this.passwordsInvalid = true;
      return;
    }

    this.passwordsInvalid = false;

    this.authService.register(value)
      .then(res => console.log(res));

  }

  onGoogleAuth(user: User) {
    this.authService.onSocialAuth(user)
    .then(() => this.redirectAfterSuccess());
  }

}


