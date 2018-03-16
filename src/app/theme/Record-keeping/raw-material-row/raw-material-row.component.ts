import { Component, OnInit,Input } from '@angular/core';
import  { Rawmaterial } from '../../../classes/rawmaterial';

@Component({
  selector: 'app-raw-material-row',
  templateUrl: './raw-material-row.component.html',
  styles: []
})
export class RawMaterialRowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	@Input() rawmaterial: Rawmaterial;
}
