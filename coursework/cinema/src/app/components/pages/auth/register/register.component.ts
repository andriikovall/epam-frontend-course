import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';

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

  passwordsInvalid: boolean;

  constructor() {
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

  public onSubmit() {
    if (this.passwordControl.value !== this.passwordRepeatControl.value) {
      this.passwordsInvalid = true;
      return;
    }

    this.passwordsInvalid = false;
    console.log(this.registerForm.value);

  }

}


