import { Component, signal } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../reactive/service/validators.service';
import * as customValidators from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ["", [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ["", [Validators.required, this.validatorService.cantBeStrider]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required]],
  },{
    validators: [
      this.validatorService.confirmPassword("password", "password2")
    ]
  });


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidator
    ){}

  isValidField(field: string){
    return this.validatorService.isValidField(this.myForm ,field)
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

  public mySignal = signal(1);

  changeSig() {
    this.mySignal.set(3)
  }
}
