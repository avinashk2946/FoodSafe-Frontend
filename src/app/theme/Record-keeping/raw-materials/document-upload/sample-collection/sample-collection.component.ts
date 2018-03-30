import { Component, OnInit,Input,Output,EventEmitter,ViewChild} from '@angular/core';
import { RawMaterialService } from '../../raw-material.service';


@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.scss']
})
export class SampleCollectionComponent implements OnInit {

  constructor(
  	  public rawMatService:RawMaterialService,
  	) {
 
     }

   @ViewChild('addsample') public addsample;

  public supplierLot:any="";

  ngOnInit() {
     // this.rawMatService.sampleCollection.get()
    //      .then((sample_response)=>{
    //        this.sample=smaple_response;
    //      });
      this.supplierLot = Array(6).fill(4).map((x,i)=>i); 
      this.samples = Array(6).fill(4);
  }
  
  samples = [
    // {
    //   sampplingno: "1",
    //   supplierlot: "32123",
    //   pictureofcaselabel: "",
    //   qcanalysissampling: false,
    //   microsampling:  false,
    //   virussampling: false,
    //   pesticidesampling: false,
    //   indicatororganismsampling: false
    // },
  {
    
       "supplierLot"         :"testLot1",
       "newLot"              :"true",
       "po"                  :"po1",
       "totalQuantity"       : 10,
       "quantityPlanned"     :1,
       "qualityAnalysis"     :false,

     
       "indicatorTest"       :false,
       "pathogenTest"        :false,
       "virusTest"           :false,
       "pesticideTest"       :false,
        "comment" :"samples are uploaded properly"
       
     },
        {
       "supplierLot"         :"testLot2",
       "newLot"              :"false",
       "po"                  :"po234",
       "totalQuantity"       : 9,
       "quantityPlanned"     :2,
       "qualityAnalysis"     :true,

     
       "indicatorTest"       :true,
       "pathogenTest"        :true,
       "virusTest"           :true,
       "pesticideTest"       :true,
       "comment":"samples are uploaded properly"
     },
     {
       "supplierLot"         :"testLot3",
       "newLot"              :"false",
       "po"                  :"Po123",
       "totalQuantity"       : 10,
       "quantityPlanned"     :3,
       "qualityAnalysis"     :false,

     
       "indicatorTest"       :false,
       "pathogenTest"        :false,
       "virusTest"           :false,
       "pesticideTest"       :false,
       "comment":"some samples are uploaded properly"
     }
  ];


}
