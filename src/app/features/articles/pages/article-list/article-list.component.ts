import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ArticlesService} from "../../data-access/articles.service";

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  private readonly articlesService = inject(ArticlesService);

  public ngOnInit() {

  }
}
