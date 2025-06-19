import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[skeleton]',
  standalone: true
})
export class SkeletonDirective implements OnChanges {
  @Input('skeleton') skeleton: boolean = false;

  private shimmerClass = 'shimmer-effect';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.skeleton) {
      this.renderer.addClass(this.el.nativeElement, this.shimmerClass);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.shimmerClass);
    }
  }
}
