import { ValidatorFn, AbstractControl } from '@angular/forms';

export function trimmedMinLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value || '';
    return value.trim().length >= minLength ? null : ({ trimmedLengthError: { value } });
  };
}
