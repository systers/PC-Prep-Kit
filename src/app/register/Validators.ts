import { AbstractControl } from '@angular/forms';

export class Validation {
  static ConfirmPasswordValidator(control: AbstractControl) {
    const value = control.get('password').value;
    const otherValue = control.get('confirmpassword').value;
    if (value !== otherValue) {
      control.get('confirmpassword').setErrors({MatchError: true});
    } else {
      return null;
    }
  };
}


