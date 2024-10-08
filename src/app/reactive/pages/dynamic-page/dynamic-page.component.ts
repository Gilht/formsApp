import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {


  public myForm: FormGroup = this.fb.group({
    name: ["", [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ["Metal Gear", Validators.required],
      ["Death Stranding", Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl("", [Validators.required]);

  constructor( private fb: FormBuilder ) {}

  get favoriteGames() {
    return this.myForm.get("favoriteGames") as FormArray;
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  addFavorites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    )

    this.newFavorite.reset();
  }

  onSubmit(): void {
   if( this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
   }

   (this.myForm.controls["favoriteGames"] as FormArray) = this.fb.array([]);
   this.myForm.reset();
  }
}
