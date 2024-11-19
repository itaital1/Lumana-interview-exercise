import { Photo } from '../models/photo.model';
import { createAction, props } from '@ngrx/store';

export const searchPhotos = createAction(
  'Search Photos',
  props<{ query: string; top: number; skip: number }>()
);

export const searchPhotosSuccess = createAction(
  'Search Photos Success',
  props<{ results: Photo[]; total: number }>()
);

export const searchPhotosFailure = createAction(
  'Search Photos Failure',
  props<{ error: string }>()
);