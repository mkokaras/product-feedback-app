import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app.reducer';
import { SuggestionsEffects } from './features/suggestions/store/suggestions.effects';
import { FeedbackEffects } from './features/feedback/store/feedback.effects';
import { AppEffects } from './store/app.effects';
import { RoadmapEffects } from './features/roadmap/store/roadmap.effects';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([
      SuggestionsEffects,
      FeedbackEffects,
      RoadmapEffects,
      AppEffects,
      UserEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
