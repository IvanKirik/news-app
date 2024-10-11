import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ImageUploaderComponent } from '../../../../shared/components';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmailsToSend, Tag } from '../../data-access/dto/article.dto';
import { FlatControlsOf } from '../../../../shared/helpers';
import { CreateArticleDto } from '../../data-access/dto/create-article.dto';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RequestStatus } from '../../../../shared/signal-store-features';
import { MultiSelectModule } from 'primeng/multiselect';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { Subject } from 'rxjs';

export type CreateArticleDialogPayload = {
  data: {
    emails: Signal<EmailsToSend[]>;
    tags: Signal<Tag[]>;
    event: Subject<CreateArticleDto>;
    load: Signal<RequestStatus>;
  };
};

type Form = FlatControlsOf<CreateArticleDto>;

@Component({
  selector: 'app-create-article-modal',
  standalone: true,
  imports: [
    ImageUploaderComponent,
    InputTextModule,
    InputTextareaModule,
    Button,
    AutoCompleteModule,
    ReactiveFormsModule,
    MultiSelectModule,
    NgIf,
    NgStyle,
    AsyncPipe,
  ],
  templateUrl: './create-article-modal.component.html',
  styleUrl: './create-article-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleModalComponent {
  private readonly config = inject(
    DynamicDialogConfig<CreateArticleDialogPayload>,
  );
  private readonly fb = inject(NonNullableFormBuilder);

  public readonly form = this.fb.group<Form>({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    image: this.fb.control('', Validators.required),
    tags: this.fb.control([]),
    emails: this.fb.control([]),
    emailIsAuthor: this.fb.control('', Validators.required),
    nameIsAuthor: this.fb.control('', Validators.required),
  });

  private readonly submit$ = this.config.data.event;
  public readonly load: Signal<RequestStatus> = this.config.data.load;

  public readonly emails: Signal<EmailsToSend[]> = this.config.data.emails;
  public readonly tags: Signal<Tag[]> = this.config.data.tags;

  public send(): void {
    const dto = this.form.getRawValue();
    if (dto.title && dto.description && dto.emailIsAuthor && dto.image) {
      this.submit$.next(dto);
    }
  }
}
