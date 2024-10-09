import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-article-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-article-modal.component.html',
  styleUrl: './create-article-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleModalComponent {
}
