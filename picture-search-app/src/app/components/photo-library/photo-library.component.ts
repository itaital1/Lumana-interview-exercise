import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoActions from '../../store/actions';
import * as fromPhoto from '../../store/selectors';
import { CommonModule } from '@angular/common';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PhotoLibraryComponent implements OnInit, OnChanges {
  @Input() searchLiteral: string = '';

  top = 20;
  skip = 0;
  skip$: Observable<number>;
  photos$: Observable<any[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.skip$ = this.store.select(fromPhoto.selectSkip);
    this.total$ = this.store.select(fromPhoto.selectTotal);
    this.photos$ = this.store.select(fromPhoto.selectPhotos);
    this.loading$ = this.store.select(fromPhoto.selectLoading);
  }

  ngOnInit(): void {
    // this.skip$.pipe(take(1)).subscribe((skip) => {
    //   this.skip = skip;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchLiteral'] && this.searchLiteral) {
      this.onSearch(this.searchLiteral);
    }
  }

  onSearch(query: string): void {
    this.store.dispatch(
      PhotoActions.searchPhotos({ query, top: 20, skip: this.skip })
    );
  }

  onPageChange(direction: 'previous' | 'next'): void {
    if (direction === 'previous' && this.skip >= 20) {
      this.skip -= 20;
    } else if (direction === 'next') {
      this.skip += 20;
    }
    this.store.dispatch(
      PhotoActions.searchPhotos({
        query: this.searchLiteral,
        top: 20,
        skip: this.skip,
      })
    );
  }
}
