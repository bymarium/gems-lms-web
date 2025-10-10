import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOptions } from '../../../../domain/model/controls.model';

@Component({
  selector: 'lib-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  public text = input<string>();
  public controlName = input.required<string>();
  public formGroup = input.required<FormGroup>();
  public options = input<IOptions[]>();

  isInvalid(): boolean {
    const control = this.formGroup().get(this.controlName());
    return !!control?.invalid && control?.touched;
  }

  get errorMessage(): string {
    const control = this.formGroup().get(this.controlName());
    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio.';
    }
    return 'El valor seleccionado no es válido.';
  }
}
