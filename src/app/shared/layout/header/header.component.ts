import {
  ChangeDetectionStrategy,
  Component,
  inject, model,
  OnInit
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ArticlesStore } from '../../../features/articles/data-access/articles.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatFormField, MatInput, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly articlesStore = inject(ArticlesStore);
  private readonly fb: FormBuilder = inject(FormBuilder);
  public searchControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((search) => {
      this.articlesStore.updateSearch(search);
    });
  }
}
