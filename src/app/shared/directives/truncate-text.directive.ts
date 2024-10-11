import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

/**
 * Trims the text and inserts three dots at the end
 */
@Directive({
  selector: '[truncateText]',
  standalone: true,
})
export class TruncateTextDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Number of lines
   */
  @Input() linesText?: number = 2;

  public ngOnInit(): void {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'display', '-webkit-box');
    this.renderer.setStyle(element, '-webkit-line-clamp', this.linesText);
    this.renderer.setStyle(element, '-webkit-box-orient', 'vertical');
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
  }
}
