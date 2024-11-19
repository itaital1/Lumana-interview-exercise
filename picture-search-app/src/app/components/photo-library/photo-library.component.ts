import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoActions from '../../store/actions';
import * as fromPhoto from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';

@Component({
  selector: 'photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PhotoLibraryComponent implements OnInit, OnChanges {
  @Input() searchLiteral: string = '';

  photos$: Observable<any[]>;
  loading$: Observable<boolean>;
  total$: Observable<number>;
  skip$: Observable<number>;
  top: number = 10;  
  skip: number = 0; 

  constructor(private store: Store<any>) {
    this.photos$ = this.store.select(fromPhoto.selectPhotos);
    this.loading$ = this.store.select(fromPhoto.selectLoading);
    this.total$ = this.store.select(fromPhoto.selectTotal);
    this.skip$ = this.store.select(fromPhoto.selectSkip);
  }

  ngOnInit(): void {
    this.onSearch(this.searchLiteral);
    this.skip$.pipe(take(1)).subscribe(skip => {
      this.skip = skip;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchLiteral'] && this.searchLiteral) {
      this.onSearch(this.searchLiteral);
    }
  }

  onSearch(query: string): void {
    this.skip = 0;
    this.store.dispatch(PhotoActions.searchPhotos({ query, top: this.top, skip: this.skip }));
  }

  onPageChange(direction: 'previous' | 'next'): void {
    if (direction === 'previous' && this.skip >= this.top) {
      this.skip -= this.top;
    } else if (direction === 'next') {
      this.skip += this.top;
    }
    this.store.dispatch(PhotoActions.searchPhotos({ query: this.searchLiteral, top: this.top, skip: this.skip }));
  }
}
