import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.scss']
})
export class SampleCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

sampplingno: string = "1"; 
supplierlot: string = "1235"; 
pictureofcaselabel: string = ""; 
qcanalysissampling: string = "Yes"; 
microsampling: string = "Yes"; 
virussampling: string = "Yes"; 
pesticidesampling: string = "Yes"; 
indicatororganismsampling: string = "No"; 

}
