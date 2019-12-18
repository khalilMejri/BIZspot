import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() message;
  @Input() type = 'note';
  closed = false;
  cssClass
  constructor() { }
  ngOnInit() {
    switch (this.type) {
      case 'success': {
        this.cssClass = 'notification--success';
        break;
      }
      case 'danger': {
        this.cssClass = 'notification--danger';
        break;
      }
      case 'notify': {
        this.cssClass = 'notification--notify';
        break;
      }
      case 'note': {
        this.cssClass = 'notification--note';
        break;
      }
      default: {
        this.cssClass = '';
        break;
      }

    }
    setTimeout(() => {
      this.closed = true;
    }, 2500);
  }
  onClose() {
    this.closed = true;
  }

}
