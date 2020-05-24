import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { trimmedMinLength } from 'src/app/utils/validators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth-forms.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public passwordsDontEqual: boolean;
  public loginUsed: boolean;

  public get loginControl(): AbstractControl {
    return this.registerForm.get('login');
  }

  public get passwordControl(): AbstractControl {
    return this.registerForm.get('password');
  }

  public get passwordRepeatControl(): AbstractControl {
    return this.registerForm.get('passwordRepeat');
  }


  public passwordsAreInvalid(): boolean {
    return this.passwordsDontEqual ||
    (this.passwordControl.touched && this.passwordControl.invalid ||
      this.passwordRepeatControl.touched && this.passwordRepeatControl.invalid);

    }


    constructor(public authService: AuthService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit() {
      this.loginUsed = false;
      this.registerForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        login: new FormControl('', [trimmedMinLength(3)]),
        password: new FormControl('', [trimmedMinLength(3)]),
        passwordRepeat: new FormControl('', [trimmedMinLength(3)])
      });
  }

  public onSubmit(value) {
    this.registerForm.markAllAsTouched();
    if (this.passwordControl.value !== this.passwordRepeatControl.value) {
      this.passwordsDontEqual = true;
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.passwordsDontEqual = false;
    this.loginUsed = false;

    this.authService.register(value)
    .subscribe(res => {
      if (!res) {
        this.loginUsed = true;
      } else {
        this.onSuccess();
      }
    });

  }

  onGoogleAuth(user: User) {
    this.passwordsDontEqual = false;
    this.loginUsed = false;

    this.authService.onSocialAuth(user)
    .subscribe(() => this.onSocialAuthSuccess());
  }

  private onSuccess() {
    this.toastService.success('You have been successfully registered', 'Please log in to continue', 6000);
    this.router.navigate(['/auth/login']);
  }

  private onSocialAuthSuccess() {
    this.toastService.success('You have been successfully logged in', '');
    this.router.navigate(['/home']);
  }
}


