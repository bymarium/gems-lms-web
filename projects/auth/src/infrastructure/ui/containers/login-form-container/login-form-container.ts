import { Component } from '@angular/core';
import { LoginForm } from '../../forms/login-form/login-form';

@Component({
  selector: 'auth-login-form-container',
  imports: [LoginForm],
  template: `<auth-login-form></auth-login-form>`
})
export class LoginFormContainer {}
