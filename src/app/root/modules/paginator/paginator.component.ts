import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Output() public readonly back = new EventEmitter();
  @Output() public readonly forward = new EventEmitter();

  @Input() set isBackEnabled(val: boolean) {
    this.isBackEnabled$.next(val);
  }

  @Input() set isForwardEnabled(val: boolean) {
    this.isForwardEnabled$.next(val);
  }

  public readonly isBackEnabled$ = new ReplaySubject<boolean>(1);
  public readonly isForwardEnabled$ = new ReplaySubject<boolean>(1);

  constructor() {}

  ngOnInit(): void {}
}
