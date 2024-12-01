import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as fromPhoto from '../../store/selectors';
import * as PhotoActions from '../../store/actions';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.scss'],
  imports: [CommonModule], // Add InfiniteScrollDirective to imports
})
export class PhotoLibraryComponent implements OnInit {
  @Input() searchLiteral: string = '';
  top = 30;
  skip = 0;
  skip$: Observable<number>;
  photos$: Observable<any[]>;
  total$: Observable<number>;
  error$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.skip$ = this.store.select(fromPhoto.selectSkip);
    this.total$ = this.store.select(fromPhoto.selectTotal);
    this.error$ = this.store.select(fromPhoto.selectError);
    this.photos$ = this.store.select(fromPhoto.selectPhotos);
    this.loading$ = this.store.select(fromPhoto.selectLoading);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.store.dispatch(PhotoActions.clearPhotos());
      this.searchLiteral = params['search'] || '';
      if (this.searchLiteral.length > 0) {
        this.onSearch(this.searchLiteral);
      }
    });
  }

  onSearch(query: string): void {
    this.store.dispatch(
      PhotoActions.searchPhotos({ query, top: this.top, skip: this.skip })
    );
  }

  onScroll(): void {
    const container = document.querySelector('.photos-container');
    if (container) {
      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollHeight = container.scrollHeight;

      // If the user has scrolled to the bottom or near the bottom, load more photos
      if (scrollPosition >= scrollHeight - 100) {
        this.loadMorePhotos();
      }
    } else {
      console.error('Scroll container not found!');
    }
  }

  loadMorePhotos(): void {
    this.skip += this.top;
    this.store.dispatch(
      PhotoActions.searchPhotos({
        query: this.searchLiteral,
        top: this.top,
        skip: this.skip,
      })
    );
  }
}
