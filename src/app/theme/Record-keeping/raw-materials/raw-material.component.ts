import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
// import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

declare const AmCharts: any;


import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: [
    './raw-material.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]

})
export class RawmaterialComponent implements OnInit {



    options: any = {
      position: ['bottom', 'right'],
    };
    plant : any = '';
    plants : Array<any> =[
    {id: 'AF', name: 'Afghanistan'},
    {id: 'AX', name: 'Åland Islands'},
    {id: 'AL', name: 'Albania'},
    {id: 'DZ', name: 'Algeria'},
    {id: 'AS', name: 'American Samoa'},
    {id: 'AD', name: 'Andorra'},
    {id: 'AO', name: 'Angola'},
    {id: 'AI', name: 'Anguilla'},
    {id: 'AQ', name: 'Antarctica'},
    {id: 'AG', name: 'Antigua and Barbuda'},
    {id: 'AR', name: 'Argentina'}
  ];
  /*products : Array<any> =[
    {id: 'AF', name: 'Afghanistan'},
    {id: 'AX', name: 'Åland Islands'},
    {id: 'AL', name: 'Albania'},
    {id: 'DZ', name: 'Algeria'},
    {id: 'AS', name: 'American Samoa'},
    {id: 'AD', name: 'Andorra'},
    {id: 'AO', name: 'Angola'},
    {id: 'AI', name: 'Anguilla'},
    {id: 'AQ', name: 'Antarctica'},
    {id: 'AG', name: 'Antigua and Barbuda'},
    {id: 'AR', name: 'Argentina'}
  ];*/

    constructor(private servicePNotify: NotificationsService,) {
       // this.createForm();private fb:FormBuilder
    }
   
  ngOnInit() {
  }



}
