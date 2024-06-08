import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',redirectTo: 'splash-screen', pathMatch: 'full', },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage), },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage), },
  { path: 'splash-screen', loadComponent: () => import('./pages/splash-screen/splash-screen.page').then( m => m.SplashScreenPage) },
];
