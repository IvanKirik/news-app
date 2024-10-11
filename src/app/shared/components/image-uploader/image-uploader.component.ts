import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  HostListener,
  inject,
  input
} from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../../intefaces/image.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { UrlPipe } from '../../pipes/url.pipe';
import { BaseValueAccessor, controlProviderFor } from '../../helpers';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [AsyncPipe, UrlPipe, NgIf],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    controlProviderFor(() => ImageUploaderComponent)
  ]
})
export class ImageUploaderComponent extends BaseValueAccessor<string> {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fileUploadService = inject(FileUploadService);

  /**
   * Counts up on all dragenter events and counts down on dragleave events.
   */
  private dragEnterCount = 0;

  public multiple = input(false);

  public readonly previewImage$ = new BehaviorSubject<string | null>(null);

  /**
   * Shown if drag and drop is possible.
   */
  @HostBinding('class.on-drag')
  public onDrag: boolean;

  /**
   * Shown if drag and drop is not possible.
   */
  @HostBinding('class.on-wrong-drag')
  public onWrongDrag: boolean;

  /**
   * Drop files.
   */
  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    stopEvent(event);
    if (this.hasFiles(event)) {
      const files = getFiles(event);
      this.uploadedFiles(files[0]);
    }
    this.dragEnterCount = 0;
    this.showWaitingDrag();
  }

  /**
   * Drag over.
   */
  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    stopEvent(event);
  }

  /**
   * Drag enter.Shows whether you can make a drop.
   */
  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent): void {
    this.dragEnterCount++;
    stopEvent(event);
    if (this.hasFiles(event)) {
      this.showOnDrag();
    } else {
      this.showOnWrongDrag();
    }
  }

  /**
   * Shows drag waiting.
   */
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    this.dragEnterCount--;
    if (this.dragEnterCount === 0) {
      this.showWaitingDrag();
    }
    stopEvent(event);
  }

  /**
   * Clear the value in multiple input so that even when the same image is selected, onchange is called.
   * @input Input from which onchange is called.
   */
  public clearValue(input: HTMLInputElement): void {
    input.value = '';
  }

  /**
   * Upload files.
   */
  public onUpload(event: EventTarget | null): void {
    const files = (event as HTMLInputElement).files;
    if (event && files && !this.multiple()) {
      this.uploadedFiles(files[0]);
    }
  }

  public override writeValue(_value: string | null) {
    super.writeValue(_value);
    if (_value) this.previewImage$.next(_value);
  }

  private uploadedFiles(files: File): void {
    const formData = new FormData();
    formData.set('files', files);
    this.fileUploadService
      .upload(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.previewImage$.next(result[1].url);
        this.emitChange(result[1].url);
      });
  }

  private hasFiles(event: DragEvent): boolean {
    const files = getFiles(event);
    const items = getDataTransferItems(event).filter(
      (value) => value.kind === 'file',
    );
    return !![...Array.from(files), ...Array.from(items)].length;
  }

  private showOnDrag(): void {
    this.onDrag = true;
    this.onWrongDrag = false;
  }

  private showOnWrongDrag(): void {
    this.onDrag = false;
    this.onWrongDrag = true;
  }

  private showWaitingDrag(): void {
    this.onDrag = false;
    this.onWrongDrag = false;
  }
}

function getFiles(event: DragEvent): File[] {
  const files = (event && event.dataTransfer && event.dataTransfer.files) || [];
  return [...Array.from(files)];
}

function getDataTransferItems(event: DragEvent): DataTransferItem[] {
  const items = (event && event.dataTransfer && event.dataTransfer.items) || [];
  return [...Array.from(items)];
}

function stopEvent(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
}
