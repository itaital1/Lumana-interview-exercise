import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';

bootstrapApplication(
  AppComponent
  //  {
  // ...appConfig,
  // providers: [
  //   // provideState({ name: 'photo', reducer: photoReducer }),
  //   provideStore({ photo: photoReducer }),
  //   provideEffects(PhotoEffects),
  // ],
  // StoreModule.forRoot({ photo: photoReducSer }),
  // EffectsModule.forRoot([PhotoEffects]),
  // providers: [
  //   StoreModule.forRoot({ photo: photoReducer }),
  //   EffectsModule.forRoot([PhotoEffects]),
  // ],
  // }
).catch((err) => console?.error(err));
