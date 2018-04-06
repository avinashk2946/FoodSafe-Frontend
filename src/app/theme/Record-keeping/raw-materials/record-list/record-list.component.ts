import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Params ,Router } from '@angular/router';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss',
  '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers:[RawMaterialService]
})
export class RecordListComponent implements OnInit {

    // public dblclick=[
    //   {
    //     name : "",
    //     action: "dblclick",
    //     path : "/document-upload/5ac618d6ea13d618cfdf6342",
    //   },
  
    // ];
  
  recordList = [];
  selected = [];
  autocompleteItemsAsObjects = [
    {value: 'Alabama', id: 0},
    {value: 'Wyoming', id: 1},
    {value: 'Coming', id: 2},
    {value: 'Josephin Doe', id: 3},
    {value: 'Henry Die', id: 4},
    {value: 'Lary Doe', id: 5},
    {value: 'Alice', id: 6},
    {value: 'Alia', id: 7},
    {value: 'Suzen', id: 8},
    {value: 'Michael Scofield', id: 9},
    {value: 'Irina Shayk', id: 10},
    {value: 'Sara Tancredi', id: 11},
    {value: 'Daizy Mendize', id: 12},
    {value: 'Loren Scofield', id: 13},
    {value: 'Shayk', id: 14},
    {value: 'Sara', id: 15},
    {value: 'Doe', id: 16},
    {value: 'Lary', id: 17},
    {value: 'Roni Sommerfield', id: 18},
    {value: 'Mickey Amavisca', id: 19},
    {value: 'Dorethea Hennigan', id: 20},
    {value: 'Marisha Haughey', id: 21},
    {value: 'Justin Czajkowski', id: 22},
    {value: 'Reyes Hodges', id: 23},
    {value: 'Vicky Hadley', id: 24},
    {value: 'Lezlie Baumert', id: 25},
    {value: 'Otha Vanorden', id: 26},
    {value: 'Glayds Inabinet', id: 27},
    {value: 'Hang Owsley', id: 28},
    {value: 'Carlotta Buttner', id: 29},
    {value: 'Randa Vanloan', id: 30},
    {value: 'Elana Fulk', id: 31},
    {value: 'Amos Spearman', id: 32},
    {value: 'Samon', id: 33},
    {value: 'John Doe', id:  34}
  ];
  constructor(
    public rawMatService:RawMaterialService,
    public comonSrvc:CommonService,
    public activatedRoute: ActivatedRoute,
    public router:Router
  ) { }
  ngOnInit() {
    this.getRecordList();
      // this.rawMatService.getRecordList().subscribe(data => {this.record = data })
  }
  getRecordList() {
    this.rawMatService.getRecord().subscribe((response: any) => {
      console.log(response.data);
      
      this.recordList = response.data;
    }, err => { 
      this.comonSrvc.showErrorMsg(err.message);
    });
  }
  onSelect({ selected }) {
    console.log("selectedRow",);
    
  }
    clickaction(action:any){
      console.log('mouse btn clicked', action);
      // if(action==="deleteclick"){
      //   this.deleterecord.show();
      // }
      
      if(action==="dblclick" ){
        let router=this.router.navigate(['document-upload/5aa582ea8067d717e0108f89'])
      }
    }
  
    onActivate(event) {}
    showDetails(){
      alert(1);
    }

    openConfirmsSwal(selected) {
      let selectedRecord = this.selected[0];
      swal({
        title: 'Are you sure?',
        text: 'Do you want to delete?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false
      }).then(function (response) {
        console.log(response)
        if (response.dismiss === 'cancel') {
          // swal(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
        else{
          console.log(selectedRecord);
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      }).catch(swal.noop);
    }

  // public changePlant (plant:Plant):void {
  //   console.log("hi",this.plant);
  //   this.plantservice.getplant().subscribe((response: any) => {
  //     console.log(response);
  //   });
  // }
}
