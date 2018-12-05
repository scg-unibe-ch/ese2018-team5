import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  @Input() message: string;

  @Output() doAction = new EventEmitter();
  @Output() cancelAction = new EventEmitter();

  bool = true;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.bool = false;
    this.cancelAction.emit(this.bool);
  }

  doAct() {
    this.doAction.emit();
  }
}
