import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PhotoActions from './actions';
import { PhotoSearchService } from '../services/photoSearch.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PhotoEffects {
  private actions$ = inject(Actions); 
  private photoSearchService = inject(PhotoSearchService); 

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoActions.searchPhotos),
      switchMap(({ query, top, skip }) => {
        return this.photoSearchService.searchPhotos(query, top, skip).pipe(
          map((data) =>
            PhotoActions.searchPhotosSuccess({
              results: data.results,
              total: data.total,
            })
          ),
          catchError((error) => of(PhotoActions.searchPhotosFailure({ error })))
        );
      })
    )
  );
}

