import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nickname: string = '';

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario enviado:', this.nickname);
    } else {
      console.log('Formulario inválido');
    }
  }
}
