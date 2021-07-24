import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<'recipe'|'shopping'>();

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(feature: 'recipe'|'shopping') {
    this.featureSelected.emit(feature)
  }
}
