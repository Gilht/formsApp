import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  public mySignal = signal(1);

  changeSig() {
    this.mySignal.set(3)
  }
}
