import {
  ChangeDetectionStrategy,
  Component, computed,
  effect,
  inject,
  input,
  OnInit,
  Signal
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
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../../../shared/constants/pagination.constatns';

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
  public $configSignal = this.articlesStore.config;

  public search = input<string>('');
  public page$ = new BehaviorSubject<number>(DEFAULT_PAGE);
  public limit$ = new BehaviorSubject<number>(DEFAULT_PAGE_SIZE);
  public searchControl = this.fb.control('');


  public ngOnInit() {
    this.articlesStore.loadAll(this.articlesStore.config)
    // combineLatest([this.page$, this.limit$])
    //   .pipe(map(([page, limit]) => ({ page, limit })))
    //   .subscribe((obj) => {
    //     this.articlesStore.updateFilters(obj);
    //     this.articlesStore.loadAll(obj);
    //   });
  }

  onPageChange(event: PaginatorState) {
    console.log(event.page);
    this.articlesStore.updateFilters({page: event.page ? event.page + 1 : 1, limit: event.rows});

    this.page$.next(event.page ? event.page + 1 : 1);
    this.limit$.next(event.rows ? event.rows : 3);
  }
}
