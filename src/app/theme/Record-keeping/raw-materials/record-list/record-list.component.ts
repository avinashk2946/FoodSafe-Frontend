import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
  providers:[RawMaterialService]
})
export class RecordListComponent implements OnInit {
  recordList = [];
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
}
