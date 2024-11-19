import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './actions';
import { Photo } from '../models/photo.model';

export interface State {
  query: string;
  photos: Photo[];
  total: number;
  loading: boolean;
  skip: number;
  top: number;
  error: string | null;
}

export const initialState: State = {
  query: '',
  photos: [],
  total: 0,
  loading: false,
  skip: 0,
  top: 10,
  error: null,
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.searchPhotos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PhotoActions.searchPhotosSuccess, (state, { results, total }) => ({
    ...state,
    photos: results,
    total,
    loading: false,
    skip: state.skip + state.top,
  })),
  on(PhotoActions.searchPhotosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
