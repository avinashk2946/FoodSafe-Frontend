import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Params , Router } from '@angular/router';
import {Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: [
    './record-list.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [RawMaterialService]
})
export class RecordListComponent implements OnInit {

  recordList : any =[];
  selected : any =[];
  recordSelected : any = [];
  getRecordData: any = [];

  // For search bar autocomplete
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

  constructor( public rawMatService: RawMaterialService, public comonSrvc: CommonService, public activatedRoute: ActivatedRoute,
    public router: Router ) { }



    @Input('sortable-column')
    columnName: string;

    @Input('sort-direction')
    sortDirection: string = '';

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }


  ngOnInit() {
    this.getRecordList();
    // this.reload();
      // this.rawMatService.getRecordList().subscribe(list => {this.record = list })
  }
  getRecordList() {
    console.log("first record ");
    this.rawMatService.getRecord().subscribe((response: any) => {
      // console.log(response.data);
      this.recordList = response.data;
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }
  onSelect(selected) { 
    this.recordSelected = selected;
    console.log("selected ",this.recordSelected);
  }

  doubleClickAction(selectedRow) {
    // console.log('selected Id : ', selectedRow[0]._id);
    this.router.navigate(['/recordkeeping/raw-matrial/document-upload/' + selectedRow[0]._id]);
  }

  onActivate(event) {}

  editSelectedRow(selectedRow) {
    console.log(selectedRow);
   }

  public openConfirmsSwal(_id) {
    console.log("abi");
    let targetId = this.recordSelected.selected[0]._id;
    swal({
      title: 'Are you sure?',
      text: 'Do you want to delete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then((function (returnData) {
      console.log(returnData);
      if (returnData.dismiss === 'cancel') {
        console.log("If");
        swal(
           'Cancelled',
           'Your imaginary file is safe :)',
           'error'
         );
      }else {
        // console.log(targetId);
        this.rawMatService.deleterecordList(targetId).subscribe((response: any) => {
          // alert("delete success");
          this.getRecordList();
        }, err => {
         alert("delete error");
        });
        console.log("else");
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    }).bind(this)).catch(swal.noop);
    
  }

    public deleteClick(_id){ 
     console.log("abinash");  
       console.log("this.recordSelected  ",this.recordSelected.selected[0]._id);
        this.rawMatService.deleterecordList(this.recordSelected.selected[0]._id)
        .subscribe((response: any) => {
      // alert("delete success");
        this.getRecordList();
        console.log("after delete");
      // this.reload();
        },

         // .then(message =>{ this.reload()
         //  });
         err => {
         alert("delete error");
        });
    }

  // public reload():void{
  //     this.rawMatService.getRecordData(this.recordSelected).subscribe(
  //       record_response =>{
  //         this.getRecordData = record_response as any[];       
  //       }
  //     );
  //   }
   
 }