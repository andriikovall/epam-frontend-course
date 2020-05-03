import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {

    const loginValidators = [Validators.required, trimmedMinLength(3)];
    const passwordValidators = [Validators.required];

    this.loginForm = new FormGroup({
      login: new FormControl('', loginValidators),
      password: new FormControl('', passwordValidators)
    })
  }


}
