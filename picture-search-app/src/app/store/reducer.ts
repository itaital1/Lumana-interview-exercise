import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './actions';
import { Photo } from '../models/photo.model';

export interface State {
  photos: Photo[];
  total: number;
  skip: number;
  top: number;
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
  photos: [],
  total: 0,
  skip: 0,
  top: 20,
  loading: false,
  error: false,
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.searchPhotos, (state) => ({
    ...state,
    loading: true,
  })),
  on(PhotoActions.searchPhotosSuccess, (state, { results, total }) => ({
    ...state,
    loading: false,
    photos: [...state.photos, ...results],
    total,
  })),
  on(PhotoActions.searchPhotosFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(PhotoActions.clearPhotos, (state) => ({
    ...state,
    photos: [],
    skip: 0,
    total: 0,
    loading: false,
    error: false,
  }))
);
