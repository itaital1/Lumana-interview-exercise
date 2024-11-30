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
  searchSuggestions: string[] = [];
  allSearchSuggestions: string[] = [];
  showSuggestions: boolean = false;
  isSearchSubmitted: boolean = false;
  private readonly MAX_RECENT_SEARCHES = 6;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchLiteral = params['search'] || '';
      this.onSearch(this.searchLiteral);
    });
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.loadRecentSearches();
  }

  loadRecentSearches() {
    const recentSearches = sessionStorage.getItem('recentSearches');
    if (recentSearches) {
      this.searchSuggestions = this.allSearchSuggestions =
        JSON.parse(recentSearches);
    }
  }

  saveRecentSearches() {
    sessionStorage.setItem(
      'recentSearches',
      JSON.stringify(this.allSearchSuggestions)
    );
  }

  onSearch(searchLiteral: string) {
    if (this.searchLiteral.length > 0) {
      this.isSearchSubmitted = true;
      this.searchLiteral = searchLiteral;

      if (
        !this.allSearchSuggestions.find((item) => item == this.searchLiteral)
      ) {
        this.allSearchSuggestions.unshift(this.searchLiteral);
      }

      if (this.allSearchSuggestions.length > this.MAX_RECENT_SEARCHES) {
        this.allSearchSuggestions.pop();
      }
      this.saveRecentSearches();
      this.showSuggestions = false;
      
      this.router.navigate([], {
        queryParams: { search: this.searchLiteral },
      });
    }
  }

  backToMain() {
    this.router.navigate([], {
      queryParams: {},
    });
    this.searchLiteral = '';
    this.isSearchSubmitted = false;
  }

  showRecentSearches() {
    this.loadRecentSearches();
  }

  onFocusInput() {
    this.showSuggestions = true;
    this.loadRecentSearches();
  }

  onBlurInput() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

  filterSearchSuggestions() {
    if (this.searchLiteral) {
      this.searchSuggestions = this.allSearchSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(this.searchLiteral.toLowerCase())
      );
    } else {
      this.loadRecentSearches();
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchLiteral = suggestion;
    this.searchSuggestions = [];
  }
}
