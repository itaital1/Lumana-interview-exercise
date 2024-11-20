import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { photoReducer } from './app/store/reducer';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { PhotoEffects } from './app/store/effects';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';

bootstrapApplication(
  AppComponent,
  {
    ...appConfig,
    providers: [
      // provideState({ name: 'photo', reducer: photoReducer }),
      provideEffects(PhotoEffects),
      importProvidersFrom(RouterModule.forRoot(routes)),
      provideStore({ photo: photoReducer }),
      // EffectsModule.forRoot([PhotoEffects]),
    ],
  }
  // StoreModule.forRoot({ photo: photoReducSer }),
  // providers: [
  //   StoreModule.forRoot({ photo: photoReducer }),
  //   EffectsModule.forRoot([PhotoEffects]),
  // ],
  // }
).catch((err) => console?.error(err));
