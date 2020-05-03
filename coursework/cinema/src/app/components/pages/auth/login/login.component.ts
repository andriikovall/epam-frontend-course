import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {

    const loginValidators = [Validators.required, this.trimmedMinLength(3)];
    const passwordValidators = [Validators.required];

    this.loginForm = new FormGroup({
      login: new FormControl('', loginValidators),
      password: new FormControl('', passwordValidators)
    })
  }

  private trimmedMinLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value || '';
      return value.trim().length >= minLength ? null : ({ trimmedLengthError: { value } });
    };
  }

}
