import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ArticlesStore } from '../../../features/articles/data-access/articles.store';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ShowIfNotAuthenticatedDirective } from '../../directives/show-if-not-authenticated.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatAnchor,
    MatIcon,
    ShowIfNotAuthenticatedDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly articlesStore = inject(ArticlesStore);
  public searchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((search) => {
      this.articlesStore.updateSearch(search);
    });
  }
}
