import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showHomeLink$: Observable<boolean>;

  isWhiteBg$: Observable<boolean>;

  private readonly pagesWithHomeLink = [
    '/search',
    '/hotel/:id',
    '/detail',
    'checkout/:hotelId/:roomName',
  ];

  constructor(private router: Router) {
    const navigation$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
      startWith(this.router.url)
    );

    this.showHomeLink$ = navigation$.pipe(
      map((url) =>
        this.pagesWithHomeLink.some((page) => {
          if (page.includes(':id')) {
            const regex = new RegExp('^' + page.replace(':id', '[^/]+') + '$');
            return regex.test(url);
          }
          return page === url;
        })
      )
    );
    this.isWhiteBg$ = this.showHomeLink$;
  }

  pesquisar() {
    this.router.navigate(['/']);
  }
}
