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

  public passwordsEqual(): boolean {
    return this.registerForm.get('password').value ===
      this.registerForm.get('passwordRepeat').value;
  }

  constructor() { }

  ngOnInit() {

    const passwordsValidators = [trimmedMinLength(3), this.passwordsValidator];

    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      login: new FormControl('', passwordsValidators),
      password: new FormControl('', passwordsValidators),
      passwordRepeat: new FormControl('')
    })
  }

  passwordsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.passwordsEqual() ? null : ({ passwordsNotEqualError: true });
    };
  }

}


