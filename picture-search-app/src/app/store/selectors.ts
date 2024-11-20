import { State } from './reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPhotoState = createFeatureSelector<State>('photo');

export const selectPhotos = createSelector(
  selectPhotoState,
  (state: State) => state?.photos
);

export const selectLoading = createSelector(
  selectPhotoState,
  (state: State) => state?.loading
);

export const selectTotal = createSelector(
  selectPhotoState,
  (state: State) => state.total
);

export const selectSkip = createSelector(
  selectPhotoState,
  (state: State) => state.skip
);

export const selectError = createSelector(
  selectPhotoState,
  (state: State) => state.error
);
