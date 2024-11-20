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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PhotoLibraryComponent implements OnInit {
  @Input() searchLiteral: string = '';

  top = 20;
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
      this.searchLiteral = params['search'] || '';
      this.onSearch(this.searchLiteral);
    });
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
