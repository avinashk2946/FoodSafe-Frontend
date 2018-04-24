import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../../common/common.constant';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import {  map } from 'rxjs/operators';
import { error } from 'util';
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
  items = [];
  recordList: any = [];
  selected: any = [];
  recordSelected: any = [];
  getRecordData: any = [];
  
  constructor(public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    public activatedRoute: ActivatedRoute,private http:HttpClient, public router: Router) {

  }


  ngOnInit() {
    this.getRecordList();
  }
  getRecordList() {
    this.rawMatService.getRecord().subscribe((response: any) => {
      this.recordList = response.data;
    }, err => {
      this.comonSrvc.showErrorMsg(err.message); 
    });
    
  }
  onSelect(selected) {
    this.recordSelected = selected;
  }

  enableEditRow(selectedRow) {
    // TODO: Default dropdown value selection
    this.router.navigate(['/recordkeeping/raw-matrial/create/'],
      {
        queryParams:
          {
            'selectedRow': selectedRow[0]._id,
            'plant': selectedRow[0].plant['name'],
            'supplierName': selectedRow[0].supplier['name'],
            'po': selectedRow[0].po,
            'lotNo': selectedRow[0].lotNo,
            'containerNo': selectedRow[0].containerNo
          }
      });
  }

  public requestAutocompleteItems = (text: string): Observable<any> => {
   
    if(!!text){
   
    const url = GLOBAL_PROPERTIES.BASE_API_URL+`record/search/${text}`;
    return this.http.get(url)
    .map((res: Response) => {
      if(res.status < 200 || res.status >= 300) {
        throw new Error();
      } 
      else {
        this.recordList=res['data'];
        return res.json();
      }
    })
  }
  else{
    this.getRecordList();
  }
};
  onActivate(event) { }

  doubleClickAction(selectedRow) {
    this.router.navigate(['/recordkeeping/raw-matrial/document-upload/' + selectedRow[0]._id]);
  }

  public openConfirmsSwal(_id) {
    const targetId = this.recordSelected.selected[0]._id;
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
        swal(
          'Cancelled',
          'Your file is safe :)',
          'error'
        );
      } else {
        this.rawMatService.deleterecordList(targetId).subscribe((response: any) => {
          this.getRecordList();
        }, err => {

        });
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    }).bind(this)).catch(swal.noop);

  }

  public deleteClick(_id) {
    this.rawMatService.deleterecordList(this.recordSelected.selected[0]._id)
      .subscribe((response: any) => {

        this.getRecordList();
      },
        err => {

        });
  }
  public onItemRemoved(event){
  this.getRecordList();
   }



}
