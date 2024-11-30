import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './actions';
import { Photo } from '../models/photo.model';

export interface State {
  top: number;
  skip: number;
  total: number;
  error: boolean;
  photos: Photo[];
  loading: boolean;
  searchQuery: string;
}

export const initialState: State = {
  top: 10,
  skip: 0,
  total: 0,
  photos: [],
  error: false,
  loading: false,
  searchQuery: '',
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.searchPhotos, (state) => ({
    ...state,
    error: false,
    loading: true,
  })),
  on(PhotoActions.searchPhotosSuccess, (state, { results, total }) => ({
    ...state,
    total,
    error: false,
    loading: false,
    photos: [...results],
    skip: state.skip + state.top,
  })),
  on(PhotoActions.searchPhotosFailure, (state) => ({
    ...state,
    error: true,
    loading: false,
  }))
);
