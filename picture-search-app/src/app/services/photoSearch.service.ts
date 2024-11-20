import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PhotoSearchService {
  private searchSubject = new Subject<string>();
  private apiUrl = 'http://localhost:3000/api/search';

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.searchPhotos(query)) 
      )
      .subscribe();
  }

  /**
   * Performs a paginated search query.
   * @param query The search term to query.
   * @param top Number of items per batch.
   * @param skip The offset for pagination.
   * @returns Observable of the API response.
   */
  searchPhotos(
    query: string,
    top: number = 10,
    skip: number = 0
  ): Observable<any> {
    const params = { query, top: top.toString(), skip: skip.toString() };
    return new Observable<any>((observer) => {
      axios
        .get(this.apiUrl, { params })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error('Error fetching data from Unsplash API');
        });
    });
  }
}
