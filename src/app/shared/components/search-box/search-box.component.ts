import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Input() initialValue: string = '';

  @Input() placeholder: string = 'Search...';

  @Output() onValue: EventEmitter<string> = new EventEmitter();

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  private debauncer: Subject<string> = new Subject();
  private debauncerSubscription?: Subscription

  ngOnInit(): void {
    this.debauncerSubscription = this.debauncer.pipe(debounceTime(500)).subscribe((value) => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debauncerSubscription?.unsubscribe();
  }

  emitSearch(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(seachTerm: string) {
    this.debauncer.next(seachTerm);
  }
}
