import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../../raw-material.service';


@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.scss']
})
export class SampleCollectionComponent implements OnInit {

  constructor(
  	  public rawMatService:RawMaterialService,
  	) { }

  ngOnInit() {
     // this.rawMatService.sampleCollection.get()
    //      .then((sample_response)=>{
    //        this.sample=smaple_response;
    //      });
  }
  
  samples = [
    {
      sampplingno: "1",
      supplierlot: "32123",
      pictureofcaselabel: "",
      qcanalysissampling: false,
      microsampling:  false,
      virussampling: false,
      pesticidesampling: false,
      indicatororganismsampling: false
    }
  ];




}
