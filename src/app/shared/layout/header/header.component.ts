import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ShowIfNotAuthenticatedDirective } from '../../directives';

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
export class HeaderComponent {}
