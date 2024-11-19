import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { photoReducer } from './store/reducer';
import { PhotoEffects } from './store/effects';
import { CommonModule } from '@angular/common';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    FormsModule,
    CommonModule,
    provideStore({ photoSearchResults: photoReducer }),
    provideEffects([PhotoEffects]),
  ],
};
