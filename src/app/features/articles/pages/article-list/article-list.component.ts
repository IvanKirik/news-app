import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, effect,
  inject,
  OnInit,
  Signal, untracked
} from '@angular/core';
import { ArticlesStore } from '../../data-access/articles.store';
import { JsonPipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCard,
  MatCardContent, MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { ArticleEntity } from '../../data-access/entities/article.entity';
import { TruncateTextDirective } from '../../../../core/directives/truncate-text.directive';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TagPipe } from '../../pipes/tag.pipe';
import { UrlPipe } from '../../../../core/pipes/url.pipe';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { ArticlesListConfig } from '../../data-access/articles.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequestStatus } from '../../../../core/signal-store-features';
import { LoaderService } from '../../../../core/services/loader.service';
import { Sort } from '../../../../core/intefaces/sort.type';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateArticleModalComponent } from '../../components/create-article-modal/create-article-modal.component';

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
    CardModule,
    Button,
    TruncateTextDirective,
    MatCardHeader,
    MatCardSubtitle,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    TagPipe,
    UrlPipe,
    ImageUploaderComponent,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class ArticleListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly articlesStore = inject(ArticlesStore);
  private readonly loaderService = inject(LoaderService);
  private readonly dialogService = inject(DialogService);

  public readonly articles: Signal<ArticleEntity[]> =
    this.articlesStore.articles;
  public readonly filters: Signal<ArticlesListConfig> =
    this.articlesStore.config;
  public readonly total: Signal<number> = this.articlesStore.total;
  public readonly requestStatus: Signal<RequestStatus> =
    this.articlesStore.requestStatus;

  public readonly searchControl = new FormControl('');

  constructor() {
    effect(() => {
      const requestStatus = this.requestStatus();
      untracked(() => {
        requestStatus === 'pending'
          ? this.loaderService.show()
          : this.loaderService.hide();
      });
    });
  }

  public ngOnInit() {
    this.articlesStore.loadAll(this.articlesStore.config);

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((search) => {
        this.articlesStore.search(search ?? '');
      });
  }

  public sort(sortField: string, sortOrder: Sort): void {
    this.articlesStore.sort(sortField, sortOrder);
  }

  public pageChange(event: PaginatorState) {
    this.articlesStore.updateFilters({
      page: event.page ? event.page + 1 : 0,
      limit: event.rows ? event.rows : this.filters().limit,
    });
  }

  public create(): void {
    const ref = this.dialogService.open(CreateArticleModalComponent, {
      header: 'Добавить дайджест',
      width: '500px'
    })
  }
}
