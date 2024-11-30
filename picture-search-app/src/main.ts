import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { photoReducer } from './app/store/reducer';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { provideEffects } from '@ngrx/effects';
import { PhotoEffects } from './app/store/effects';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideEffects(PhotoEffects),
    provideStore({ photo: photoReducer }),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      })
    ),
    importProvidersFrom(RouterModule.forRoot(routes)),  
  ],
}).catch((err) => console?.error(err));
