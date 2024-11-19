import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';
import { RouterOutlet } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    CommonModule,
    PhotoLibraryComponent,
    StoreModule
  ]
})
export class AppComponent {
  searchLiteral: string = '';
  isSearchSubmitted: boolean = false;

  onSearch(searchLiteral: string) {
    this.searchLiteral = searchLiteral;
    this.isSearchSubmitted = true;
  }
}
