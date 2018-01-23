import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { FlightServiceService } from '../../services/flight-service.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css'],
  providers:[FlightServiceService]
})
export class SearchFlightComponent implements OnInit {
  passengers:any;
  stateCtrl: FormControl;
  stateToCtrl: FormControl;
  searchFlight: FormGroup;
  selectedTabIndex:any;
  filteredStates: Observable<any[]>;
  filteredToStates: Observable<any[]>;
 
  displayedColumns = ['Id'];
  GridData:any;
  states: any[] = [
    {
      name: 'Arkansas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  constructor( private fb: FormBuilder,private FlightService: FlightServiceService,private route:Router) { 
    this.stateCtrl = new FormControl();
    this.stateToCtrl = new FormControl();
    
    this.searchFlight = fb.group({
      from: [null, Validators.compose([Validators.required])],
      to: [null, Validators.compose([Validators.required])],
      fromDate: [null, Validators.compose([Validators.required])],
      toDate: [null],
      passenger: [null, Validators.compose([Validators.required])],
     
    })


    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(state => state ? this.filterStates(state) : this.states.slice());

        this.filteredToStates = this.stateToCtrl.valueChanges
        .startWith(null)
        .map(state => state ? this.filterToStates(state) : this.states.slice());
  }
  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filterToStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.passengers = [
      {value: 1, viewValue: 1},
      {value: 2, viewValue: 2},
      {value: 3, viewValue: 3},
      {value: 4, viewValue: 4},
      {value: 5, viewValue: 5},
      {value: 6, viewValue: 6},
      {value: 7, viewValue: 7},
      {value: 8, viewValue: 8},
      {value: 9, viewValue: 9},
      {value: 10, viewValue: 10},
      {value: 11, viewValue: 11},
      {value: 12, viewValue: 12},
    ];

var currentUser = JSON.parse(localStorage.getItem('current'));
if(currentUser!=undefined || currentUser!=null ){
  this.searchFlight.setValue(currentUser);
  this.selectedTabIndex=currentUser.index;
}
debugger;
var currentUserselection = JSON.parse(localStorage.getItem('selectedIndex'));

if(currentUserselection!=undefined || currentUserselection!=null ){

  this.selectedTabIndex=currentUserselection;
}
  }

  onLinkClick(e:any){
    if( e.tab.textLabel=="Round Trip"){
      this.selectedTabIndex=0;
    }
    else if( e.tab.textLabel=="One Way"){
      this.selectedTabIndex=1;
      this.searchFlight.get('toDate').setValue(null);
    }
   
  }

  findFlight(){
    let value=this.getModifiedData(this.searchFlight.value);
    localStorage.setItem('current', JSON.stringify(value));
    localStorage.setItem('selectedIndex', this.selectedTabIndex);
    this.route.navigate(['view-flight']);
  }
  getModifiedData(data:any){
    data.fromDate = moment(data.fromDate).format('YYYY-MM-DD');
    if( data.toDate!=null){
      data.toDate = moment( data.toDate).format('YYYY-MM-DD');
    }
    return data;
  }


}
