import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit() {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy() {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string): void {
    console.log({ value });
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
