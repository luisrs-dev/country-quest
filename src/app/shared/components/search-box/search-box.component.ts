import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  emitValue(value: string): void {
    console.log({ value });
    this.onValue.emit(value);
  }
}
