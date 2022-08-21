import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-authenticated',
  templateUrl: './header-authenticated.component.html',
  styleUrls: ['./header-authenticated.component.scss'],
})
export class HeaderAuthenticatedComponent implements OnInit {
  @Output() public readonly changeToken = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
