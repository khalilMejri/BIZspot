import { Component, OnInit,Input,Output,ViewChild,EventEmitter,ElementRef } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';


@Component({
  selector: 'app-infinity-scroll',
  template: `<ng-content></ng-content><div name="anchor" id="anchor" #anchor></div>`
})
export class InfinityScrollComponent implements OnInit {
  @Input() options = {
    rootMargin: '10px',
  threshold: 0.5};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor',{'static':false}) anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);
    
  }
  ngAfterViewInit(){
    this.observer.observe(this.anchor.nativeElement);

  }
  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }
}


