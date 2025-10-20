import { Component } from '@angular/core';
import { LoginAside } from '../../components/login-aside/login-aside';

@Component({
  selector: 'auth-login-aside-container',
  imports: [LoginAside],
  template: `<auth-login-aside></auth-login-aside>`
})
export class LoginAsideContainer { }
