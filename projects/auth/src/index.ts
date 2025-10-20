import { Routes } from "@angular/router";
import { LoginLayout } from "./infrastructure/ui/layouts/login-layout/login-layout";

export const routes: Routes = [
  {
    path: 'signin',
    component: LoginLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./infrastructure/ui/containers/login-aside-container/login-aside-container').then(m => m.LoginAsideContainer),
        outlet: 'right'
      },
      {
        path: '',
        loadComponent: () => import('./infrastructure/ui/containers/login-form-container/login-form-container').then(m => m.LoginFormContainer),
        outlet: 'left'
      }
    ]
  }
];