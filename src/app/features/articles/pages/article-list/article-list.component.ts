import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ArticlesStore } from '../../../../core/ngxs/articles.store';
import { JsonPipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { Articles } from '../../../../core/ngxs/articles.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DeepSignal } from '@ngrx/signals';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest, map } from 'rxjs';

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
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected articlesStore = inject(ArticlesStore);
  public $articles: DeepSignal<Articles[]> = this.articlesStore.articles;
  public search = input<string>('');
  public searchControl = this.fb.control('');

  public searchSignal = this.articlesStore.config;

  constructor() {
    effect(() => {
      console.log(this.searchSignal());
    });
  }

  public ngOnInit() {
    this.articlesStore.loadAll({});
    combineLatest([this.searchControl.valueChanges])
      .pipe(map(([search]) => ({ search })))
      .subscribe((obj) => {
        this.articlesStore.updateFilters(obj);
        this.articlesStore.loadAll(obj);
      });
  }
}
