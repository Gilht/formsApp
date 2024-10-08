import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',),
  //   price: new FormControl(0,),
  //   inStorage: new FormControl(0,)
  // });

  constructor(private fb: FormBuilder) {
}

public myForm: FormGroup = this.fb.group({
  name: ["", [ Validators.required, Validators.minLength(3) ]],
  price: [0, [ Validators.required, Validators.min(0)]],
  inStorage: [0, [ Validators.required, Validators.min(0)]] 
})

protected onSave() {
  console.log(this.myForm.value);
}

isValidField(field: string): boolean | null{
  return this.myForm.controls[field].errors
  && this.myForm.controls[field].touched;
}

getFieldError(field: string): string | null {
  if (!this.myForm.controls[field]) return null;

  const errors = this.myForm.controls[field].errors || {};

  for (const key of Object.keys(errors)) {
   
    switch(key) {
      case "required": 
        return "El campo es requerido"

      case "mminLength":
        return  `Se necesitan minimo: ${errors["minLength"].requiredLength} caracteres`;
    }
  }

  return "null";
}
}

