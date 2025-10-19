import { Component, input, ElementRef, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {  subformComponentProviders, createForm, FormType } from 'ngx-sub-form';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: subformComponentProviders(InputComponent),
  templateUrl: './input.html',
  styleUrl: './input.scss'
})
export class InputComponent{
  public type = input<'input' | 'email' | 'password'>('input');
  public icon = input<string>();
  public label = input<string>();
  public placeholder = input<string>('');
  public patternKey = input<string>('');
  
  public readonly uniqueId = crypto.randomUUID();

  private readonly errorMessages: Record<string, (error: any) => string> = {
    required: () => 'Este campo es obligatorio.',
    email: () => 'Por favor, introduce un correo válido.',
    pattern: () => 'El formato no es válido.',
    minlength: (error) => `Mínimo ${error.requiredLength} caracteres.`,
    maxlength: (error) => `Máximo ${error.requiredLength} caracteres.`,
    min: (error) => `El valor debe ser mayor o igual a ${error.min}.`,
  };

  public form = createForm<string, { value: string }>(this, {
    formType: FormType.SUB,
    formControls: {
      value: new UntypedFormControl(null),
    },
    toFormGroup: (value: string): { value: string } => {
      return { value };
    },
    fromFormGroup: (formValue: { value: string }): string => {
      return formValue.value;
    },
  });

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  handleKeypress(key: string): boolean {
    const pattern = new RegExp(this.patternKey());
    return pattern.test(key);
  }

  handleFocus(target: EventTarget | null): void {
    this.toggleLabelFocus(true);
  }

  handleBlur(): void {
    this.toggleLabelFocus(false);
    this.checkForErrors();
  }

  private checkForErrors(): void {
    const control = this.form.formGroup.get(this.form.formControlNames.value);
    const hasError = control?.invalid && control?.touched;
    this.toggleLabelError(Boolean(hasError));
  }

  get errorMessage(): string {
    const control = this.form.formGroup.get(this.form.formControlNames.value);
    if (!control?.errors || !control?.touched) {
      return '';
    }

    const errorKey = Object.keys(control.errors)[0];
    const errorHandler = this.errorMessages[errorKey];

    if (errorHandler) {
      return errorHandler(control.errors[errorKey]);
    }

    return 'El valor introducido no es válido.';
  }

  private toggleLabelFocus(toggle: boolean): void {
    const classes = 'input__label--focus';
    this.toggleLabelClass(toggle, classes);
  }

  private toggleLabelError(toggle: boolean): void {
    const classes = 'input__label--error';
    this.toggleLabelClass(toggle, classes);
  }

  private toggleLabelClass(toggle: boolean, classes: string): void {
    const label = this.el?.nativeElement?.querySelector('.input__label');

    if (!label) { return; }

    toggle
      ? this.renderer.addClass(label, classes)
      : this.renderer.removeClass(label, classes);
  }
}