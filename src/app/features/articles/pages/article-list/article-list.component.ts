import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { ArticlesStore } from '../../data-access/articles.store';
import { JsonPipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { Articles } from '../../data-access/articles.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DeepSignal } from '@ngrx/signals';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, startWith, tap } from 'rxjs';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatInput,
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    MatPaginator,
    MatCard,
    MatCardTitle,
    MatCardContent,
    RouterLink,
    MatCardImage,
    PaginatorModule,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected articlesStore = inject(ArticlesStore);

  public $articles: DeepSignal<Articles[]> = this.articlesStore.articles;
  public $totalArticles: Signal<number> = this.articlesStore.total;
  public searchSignal = this.articlesStore.config;

  public search = input<string>('');
  public page$ = new BehaviorSubject<number>(1);
  public limit$ = new BehaviorSubject<number>(3);
  public searchControl = this.fb.control('');

  constructor() {}

  public ngOnInit() {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        tap(() => {
          this.page$.next(1);
          this.limit$.next(3);
        }),
      ),
      this.page$,
      this.limit$,
    ])
      .pipe(map(([search, page, limit]) => ({ search, page, limit })))
      .subscribe((obj) => {
        this.articlesStore.updateFilters(obj);
        this.articlesStore.loadAll(obj);
      });
  }

  onPageChange(event: PaginatorState) {
    this.page$.next(event.page ? event.page + 1 : 1);
    this.limit$.next(event.rows ? event.rows : 3);
  }
}
