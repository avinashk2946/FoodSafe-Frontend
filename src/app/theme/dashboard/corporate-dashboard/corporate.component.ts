import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: [
    './corporate.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CorporateComponent implements OnInit, AfterViewInit {

  constructor(private servicePNotify: NotificationsService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
