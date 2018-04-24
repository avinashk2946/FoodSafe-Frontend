import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { QMR14Service } from './qmr-14.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'qmr-14',
  templateUrl: './qmr-14.html',
  styleUrls: ['./qmr-14.scss'],
  providers: [QMR14Service]
})
export class QMR14Component implements OnInit {
  productionLine = [
    { "label": "Production-1", "code": "P1" },
    { "label": "Production-2", "code": "P2" },
    { "label": "Production-3", "code": "P3" },
    { "label": "Production-4", "code": "P4" }
  ]
  netWeight = [
    { "label": "10", "code": "10" },
    { "label": "20", "code": "20" },
    { "label": "30", "code": "30" },
    { "label": "40", "code": "40" }
  ];
  // brandName = [
  //   "Brand-01", "Brand-02", "Brand-03", "Brand-04"
  // ];
  brandName = [
    { "label": "Brand-01", "code": "B1", "productionLineCode": "P1" },
    { "label": "Brand-02", "code": "B2", "productionLineCode": "P1" },
    { "label": "Brand-03", "code": "B3", "productionLineCode": "P2" },
    { "label": "Brand-04", "code": "B4", "productionLineCode": "P4" }
  ];
  productName = [
    { "label": "Product-1", "code": "Prd1" },
    { "label": "Product-1", "code": "Prd1" },
    { "label": "Product-1", "code": "Prd1" },
    { "label": "Product-1", "code": "Prd1" }
  ]
  public formData: Object;
  //public brandName: Array<object>;
  constructor(private http: HttpClient) {
    this.formData = {};
    //this.formData["productionLine"] = "P2";
    //this.brandName = this.brandNameData;
  }

  onSubmit(event, data) {
    console.log(data);
  }

  ngOnInit() {

  }

  productionLineSelected(data) {
    /*
    let result = [];
    delete this.formData["brandName"];//for deleting the pre selected value of brand label dropdown
    //creating filter of data based on production line selection, populate btand label dropdown
    this.brandNameData.forEach(item => {
      if (item.productionLineCode == data.code) {
        result.push(item);
      }
    });
    this.brandName = result;
    */
  }
}


