import {Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { PlantService } from '../../../service/plant.service';
import { Plant } from '../../../classes/plant';
import { CommonService } from '../../../common/common.service';
import { AuthService } from '../../../common/auth.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: [
    './raw-material.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class RawmaterialComponent implements OnInit {
  dataForm: FormGroup;
   
  public hitCancel:boolean=false;
  
   @Input() plant=[];

  constructor(private fb: FormBuilder, public plantservice: PlantService) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      'plant' : ['', [Validators.required]],
      'createdDate' : ['', [Validators.required]],
      'createdBy' : ['', [Validators.required]],
      'suplier' : ['', [Validators.required]],
      'broker' : ['', [Validators.required]],
      'coo' : ['', [Validators.required]],
      'product' : ['', [Validators.required]],
      'productCode' : ['', [Validators.required]],
      'variety' : ['', [Validators.required]],
      'approved' : ['', [Validators.required]],
      'kosher' : ['', [Validators.required]],
      'nonGMO' : ['', [Validators.required]],
      'po' : ['', [Validators.required]],
      'containerNo' : ['', [Validators.required]],
      'lotNo' : ['', [Validators.required]]
    });
    this.plantservice.getplant().subscribe(responseplants => this.plant = responseplants);
  }
    
  public changePlant (plant: Plant): void {  
    this.plantservice.getplant().subscribe((response: any) => {
      console.log(response);
    });


    this.dataForm = this.fb.group({
      'plant' : '',
      'createdDate' : '', 
      'createdBy' : '', 
      'suplier' : '', 
      'broker' : '', 
      'coo' : '', 
      'product' : '', 
      'productCode' : '', 
      'variety' : '', 
      'approved' : '', 
      'kosher' : '', 
      'nonGMO' : '', 
      'po' : '', 
      'containerNo' : '', 
      'lotNo' : ''
  });
  
  this.dataForm.controls[ 'plant' ].setValidators([ Validators.required]);
  this.dataForm.controls[ 'createdDate' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'createdBy' ].setValidators([Validators.required ]);
  this.dataForm.controls[ 'suplier' ].setValidators([ Validators.required]);
  this.dataForm.controls[ 'broker' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'coo' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'product' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'productCode' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'variety' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'approved' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'kosher' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'nonGMO' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'po' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'containerNo' ].setValidators([Validators.required]);
  this.dataForm.controls[ 'lotNo' ].setValidators([Validators.required]);

  }

cancel()
{
 this.hitCancel=true;
}
  }

  


