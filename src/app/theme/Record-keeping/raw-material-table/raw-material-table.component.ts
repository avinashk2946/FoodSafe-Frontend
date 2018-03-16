import { Component, OnInit ,Input} from '@angular/core';
import  { Rawmaterial } from '../../../classes/rawmaterial';


@Component({
  selector: 'app-raw-material-table',
  templateUrl: './raw-material-table.component.html',
  styles: []
})
export class RawMaterialTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	@Input() rawmaterials: Rawmaterial[];

}
