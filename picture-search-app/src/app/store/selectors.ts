// photo.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducer';

export const selectPhotoState = createFeatureSelector<State>('photo');

export const selectPhotos = createSelector(
  selectPhotoState,
  (state: State) => state?.photos
);

export const selectLoading = createSelector(
  selectPhotoState,
  (state: State) => state?.loading
);

export const selectError = createSelector(
  selectPhotoState,
  (state: State) => state.error
);

export const selectTotal = createSelector(
  selectPhotoState,
  (state: State) => state.total
);

export const selectQuery = createSelector(
  selectPhotoState,
  (state: State) => state.query
);

export const selectSkip = createSelector(
  selectPhotoState,
  (state: State) => state.skip
);
