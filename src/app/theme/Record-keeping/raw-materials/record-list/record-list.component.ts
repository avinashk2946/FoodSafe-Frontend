import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss',
  '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers:[RawMaterialService]
})
export class RecordListComponent implements OnInit {
  recordList = [];
  rows = [
    {
        "name": "Ethel Price",
        "gender": "female",
        "company": "My company name is very long and funny because funny is fun",
        "age": 22
    },
    {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
    },
    {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": 67
    },
    {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko",
        "age": 67
    }];
  selected = [];

  columns: any[] = [
    { prop: 'name'} ,
    { name: 'Company' },
    { name: 'Gender' }
  ];
  constructor(
    public rawMatService:RawMaterialService,
    public comonSrvc:CommonService,
  ) { }
  ngOnInit() {
    this.getRecordList();
  }
  getRecordList() {
    this.rawMatService.getRecord().subscribe((response: any) => {
      console.log(response.data);
      this.recordList = response.data;
    }, err => { 
      this.comonSrvc.showErrorMsg(err.message);
    });
  }
  onSelect({ selected }) {}
  
    onActivate(event) {}
    showDetails(){
      alert(1);
    }
    openConfirmsSwal(selected) {
      let selectedRecord = this.selected[0];
      swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert',
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
}
