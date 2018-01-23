import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../../services/flight-service.service';
@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css'],
  providers:[FlightServiceService]
})
export class ViewFlightsComponent implements OnInit {
  dataSource:any;
  loaddata: object;
  flights;any;
  flightData:any;
  slidervalue:number;
  selectedTabIndex:any;
  constructor(private FlightService: FlightServiceService) { }

  ngOnInit() {
    this.slidervalue=0;
  
this.flights=[
  {
    "id": 0,
    "flightName": "Kingfisher Goa-Delhi",
    "from": "Arkansas",
    "to": "California",
    "departureTime": "02:30pm",
    "arrivalTime": "03:30pm",
    "date": "2018-01-15",
    "flightRate": 5000
  },
  {
    "id": 1,
    "flightName": "Kingfisher Delhi-Goa",
    "from": "Florida",
    "to": "Texas",
    "departureTime": "02:30pm",
    "arrivalTime": "03:30pm",
    "date": "2018-01-17",
    "flightRate": 6507
  },
  {
    "id": 2,
    "flightName": "Spice Jet Delhi-Thailand",
    "from": "Texas",
    "to": "Florida",
    "departureTime": "02:05pm",
    "arrivalTime": "03:50am",
    "date": "2018-01-16",
    "flightRate": 1269
  },
  {
    "id": 3,
    "flightName": "Malindo Delhi-Dubai",
    "from": "Texas",
    "to": "California",
    "departureTime": "12:55pm",
    "arrivalTime": "08:15am",
    "date": "2018-01-15",
    "flightRate": 2413
  },
  {
    "id": 4,
    "flightName": "Malaysia Airlines Delhi-Bangkok",
    "from": "Arkansas",
    "to": "California",
    "departureTime": "11:40pm",
    "arrivalTime": "10:15am",
    "date":"2018-01-15",
    "flightRate": 3390
  },
  {
    "id": 5,
    "flightName": "Indigo Delhi-Hyderabad",
    "from": "California",
    "to": "Arkansas",
    "departureTime": "05:10am",
    "arrivalTime": "07:15am",
    "date": "2018-01-16",
    "flightRate": 2823
  },
  {
    "id": 6,
    "flightName": "Vistara Delhi-Chennai",
    "from": "California",
    "to": "Arkansas",
    "departureTime": "03:15am",
    "arrivalTime": "05:00am",
    "date": "2018-01-16",
    "flightRate": 2094
  },
  {
    "id": 7,
    "flightName": "Air India Goa-Delhi",
    "from": "California",
    "to": "Arkansas",
    "departureTime": "07:20pm",
    "arrivalTime": "10:50pm",
    "date":  "2018-01-16",
    "flightRate": 4093
  },
  {
    "id": 8,
    "flightName": "Go Air Goa-Mumbai",
    "from": "Arkansas",
    "to": "California",
    "departureTime": "12:00pm",
    "arrivalTime": "02:00pm",
    "date": "2018-01-15",
    "flightRate": 1804
  },
  {
    "id": 9,
    "flightName": "Kingfisher Delhi-Goa",
    "from": "Florida",
    "to": "Texas",
    "departureTime": "12:30pm",
    "arrivalTime": "3:30am",
    "date": "2018-01-15",
    "flightRate": 1082
  },
  {
    "id": 10,
    "flightName": "Indigo Chennai-Mumbai",
    "from": "Florida",
    "to": "Texas",
    "departureTime": "04:20am",
    "arrivalTime": "07:50am",
    "date": "2018-01-15",
    "flightRate": 2004
  }
]
this.flightData=this.flights;

var currentUser = JSON.parse(localStorage.getItem('current'));
if(currentUser!=undefined || currentUser!=null ){
  this.get(currentUser)
}

  }
  get(data:any){
    var currentUserselection = JSON.parse(localStorage.getItem('selectedIndex'));
    
    if(currentUserselection!=undefined || currentUserselection!=null ){
      this.selectedTabIndex=currentUserselection;
    }
    this.flightData=[];
    debugger;
    for(let flight of this.flights){
      if(flight.from==data.from && flight.to==data.to  && flight.date==data.fromDate){
        this.flightData.push(flight);
      }
     
      if(this.selectedTabIndex==0){
        if(flight.to==data.from && flight.from==data.to && flight.date==data.toDate){
          this.flightData.push(flight);
        }
      }

}
  }
  SliderChnage(value:any){
    this.slidervalue=value.value;
    this.getReqData(value.value);
  }
  getReqData(min:any){
    this.flightData=[];
    var currentUser = JSON.parse(localStorage.getItem('current'));
    for(let flight of this.flights){
      if(flight.from==currentUser.from && flight.to==currentUser.to && flight.date==currentUser.fromDate){
        if(flight.flightRate>=min){
          this.flightData.push(flight);
        }
      }
      if(this.selectedTabIndex==0){
        if(flight.to==currentUser.from && flight.from==currentUser.to  && flight.date==currentUser.toDate){
          if(flight.flightRate>=min){
            this.flightData.push(flight);
          }
        }
      }

}
  }
}
