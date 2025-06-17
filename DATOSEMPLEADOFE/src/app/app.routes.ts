import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./login/components/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'colaboradores',

    loadChildren: () => import('./features/colaboradores/colaboradores.module')
      .then(m => m.ColaboradoresModule)
  }

];
