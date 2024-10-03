import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import {ArticlesService} from "../../data-access/articles.service";
import { ArticlesStore } from '../../../../core/ngxs/articles.store';
import { JsonPipe } from '@angular/common';
import { Articles } from '../../../../core/ngxs/articles.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  private readonly articlesService = inject(ArticlesService);
  protected articlesStore = inject(ArticlesStore);
  public store: Signal<Articles[]> = this.articlesStore.articles;

  public ngOnInit() {
    this.loadArticles().then((articles) => console.log(articles));
    this.articlesStore.articles();
  }

  async loadArticles() {
    await this.articlesStore.loadAll();
  }
}
