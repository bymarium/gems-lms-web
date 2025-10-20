import { Component, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { subformComponentProviders, createForm, FormType } from 'ngx-sub-form';
import { InputComponent } from 'shared';

export interface LoginFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'auth-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  providers: subformComponentProviders(LoginForm),
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  private input$: Subject<LoginFormModel | undefined> = new Subject();
  @Input() set model(value: LoginFormModel | undefined) {
    this.input$.next(value);
  }

  private disabled$: Subject<boolean> = new Subject();
  @Input() set disabled(value: boolean | undefined) {
    this.disabled$.next(!!value);
  }

  @Output() modelUpdate: Subject<LoginFormModel> = new Subject();

  public form = createForm<LoginFormModel>(this, {
    formType: FormType.ROOT,
    input$: this.input$,
    output$: this.modelUpdate,
    disabled$: this.disabled$,
    formControls: {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    },
  });

  onSubmit(): void {
    if (this.form.formGroup.valid) {
      console.log('Form submitted:', this.form.formGroup.value);
    }
  }
}
