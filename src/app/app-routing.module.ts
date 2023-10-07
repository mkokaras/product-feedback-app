import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'suggestions',
  },
  {
    path: 'suggestions',
    loadComponent: () =>
      import(
        './features/suggestions/pages/suggestions/suggestions.component'
      ).then((comp) => comp.SuggestionsComponent),
  },
  {
    path: 'roadmap',
    loadComponent: () =>
      import('./features/roadmap/pages/roadmap/roadmap.component').then(
        (comp) => comp.RoadmapComponent
      ),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./features/feedback/feedback-routing').then(
        (mod) => mod.FEEDBACK_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: 'suggestions',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
