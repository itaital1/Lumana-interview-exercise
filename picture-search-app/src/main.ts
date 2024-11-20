import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { photoReducer } from './app/store/reducer';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { PhotoEffects } from './app/store/effects';

bootstrapApplication(
  AppComponent,
  {
    ...appConfig,
    providers: [
      // provideState({ name: 'photo', reducer: photoReducer }),
      provideStore({ photo: photoReducer }),
      provideEffects(PhotoEffects)
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
