import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DEFAULT_PAGE_SIZE } from '../../../../shared/constants/pagination.constatns';

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
  protected articlesStore = inject(ArticlesStore);

  public $articles: DeepSignal<Articles[]> = this.articlesStore.articles;
  public $totalArticles: Signal<number> = this.articlesStore.total;
  public $configSignal = this.articlesStore.config;

  public search = input<string>('');

  public first = computed((): number => {
    return (this.$configSignal().page - 1) * this.$configSignal().limit;
  });

  public ngOnInit() {
    this.articlesStore.loadAll(this.articlesStore.config);
  }

  onPageChange(event: PaginatorState) {
    this.articlesStore.updateFilters({
      page: event.page ? event.page + 1 : 0,
      limit: event.rows ? event.rows : DEFAULT_PAGE_SIZE,
    });
  }
}
