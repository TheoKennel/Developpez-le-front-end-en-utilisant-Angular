import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // Mise en place du Lazy Loading
  { path: 'detailsPage/:country', loadChildren: () => import('./pages/details-page/details-page.module')
                                        .then(m => m.DetailsPageModule)
  },
  {
    path: '404',
    component : NotFoundComponent
  },
  {
    // Redirige vers la page 404 si un chemin inconnu est entré
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
