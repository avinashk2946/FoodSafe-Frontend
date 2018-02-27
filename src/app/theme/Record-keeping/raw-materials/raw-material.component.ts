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
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  supliers : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  brokers : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  coos : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  /*products : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];*/

    constructor(private servicePNotify: NotificationsService,) {
       // this.createForm();private fb:FormBuilder
    }
   
  ngOnInit() {
  }



}
