import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    StoreModule,
    RouterModule,
    CommonModule,
    PhotoLibraryComponent,
  ],
})
export class AppComponent {
  searchLiteral: string = '';
  isSearchSubmitted: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchLiteral = params['search'] || '';
      this.onSearch(this.searchLiteral);
    });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSearch(searchLiteral: string) {
    if (this.searchLiteral.length > 0) {
      this.searchLiteral = searchLiteral;
      this.isSearchSubmitted = true;

      this.router.navigate([], {
        queryParams: { search: this.searchLiteral },
      });
    }
  }
}
