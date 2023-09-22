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
  // Se agrega ? ya que inicialmente la subscripción no existe
  private debouncerSuscription?: Subscription;

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
        console.log('emitiendo value luego de 1 seg');
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy() {
    this.debouncerSuscription?.unsubscribe();
    console.log('debouncerSuscription destroy');

  }

  onKeyPress(searchTerm: string) {
    // (keyup) es una función que se ejecuta cada vez que se escribe una tecla
    // Luego de escribir en el input, next hace la emisión del observable y le envía el searchTerm
    this.debouncer.next(searchTerm);
  }
}
