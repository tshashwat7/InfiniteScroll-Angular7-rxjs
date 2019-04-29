import { Directive, AfterContentInit,Output , EventEmitter, HostListener, AfterViewInit, Input, ElementRef, Inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, merge, mergeMap, tap, pairwise, filter, startWith, exhaustMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WINDOW } from '../service/window.service';
import { DOCUMENT } from '@angular/platform-browser';

interface ScrollPosition {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
};
const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  scrollHeight: 0,
  scrollTop: 0,
  clientHeight: 0
};
@Directive({
  selector: '[infinitescroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {
  private scrollEvent$: Observable<any>;
  private userScrolledDown$;
  private requestStream$;
  private requestOnScroll$;

  @Input() scrollCallback;
  @Input() immediateCallback;
  @Input() scrollPercent = 70;

  private itemHeight = 40;
  private numberOfItems = 10;

  private _window?: Window;
  private _document?: Document;

  constructor(private elemeentRef: ElementRef, @Inject(WINDOW) private window?: any, @Inject(DOCUMENT) private document?: any) {
    this._window = window as Window;
    this._document = document as Document;
  }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }
  private registerScrollEvent() {
    this.scrollEvent$ = fromEvent(this._window, 'scroll');
  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .pipe(
        map(() => this._window.pageYOffset ),
        filter(current =>
        current >= this._document.body.clientHeight - this._window.innerHeight),
        debounceTime(1000),
        distinctUntilChanged(),
        map(y => Math.ceil(
        (y + this._window.innerHeight) / (this.itemHeight * this.numberOfItems)
      )
      )
      )
  }
  private requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;
    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$.pipe(
        startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
      )
    }
    this.requestOnScroll$.pipe(
      exhaustMap(() => { 
        return this.scrollCallback(); })
    ).subscribe(() => { })
  }
  
}