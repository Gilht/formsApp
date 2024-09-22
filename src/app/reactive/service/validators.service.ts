import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  constructor() {}

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: false,
      };
    }

    return null;
  };

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors
    && form.controls[field].touched
  }

  public confirmPassword(password: string, confirm: string){
    
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const field1 = formGroup.get(password)?.value;
        const field2 = formGroup.get(confirm)?.value;

        if (field1 !== field2) {
            formGroup.get(confirm)?.setErrors({notEqual: true});
            return {notEqual: true}
        }

        formGroup.get(field2)?.setErrors(null);
        return null;
    }
  }
}
