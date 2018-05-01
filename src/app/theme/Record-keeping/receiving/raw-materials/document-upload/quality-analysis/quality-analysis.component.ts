import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quality-analysis',
  templateUrl: './quality-analysis.component.html',
  styleUrls: ['./quality-analysis.component.scss']
})
export class QualityAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

		characteristics: string = "Count for 500gm"; 
		description: string = "No. of pieces in 500gm"; 
		unit: string = "pieces"; 
		one:number = 33; 
		two: number = 45; 
		three: number = 28; 
		four: number = 28; 
		five: number = 28;

}
