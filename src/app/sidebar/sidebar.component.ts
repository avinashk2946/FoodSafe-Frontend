import { Component,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent  {


  private navlist=[
      {
      'name':"Dashboard",
      "link":"/home",
      "icon":"globe",
      "class":"dashboard"
    },
  	{
  		'name':"Customer",
  		"link":"/customer",
  		"icon":"user-o"
  	},
  	{
  		'name':"Company",
  		"link":"/company",
  		"icon":"building-o"
  	},
  	{
  		'name':"Products",
  		"link":"/products",
  		"icon":"flask"
  	},
  	{
  		'name':"Stock",
  		"link":"/stock",
  		"icon":"dropbox",
      "class":"stock"
  	},
  	{
  		'name':"Receival",
  		"link":"/receival",
  		"icon":"list-alt",
      "type":"submenu",
      "subopen":false,
      "submenu":[
          {
            'name':"Receival History",
            "link":"/receival",
            "icon":"list-alt",
          },
          {
            'name':"Pending Receival",
            "link":"/receival-product",
            "icon":"list-alt",
          }
      ]
  	},
  	{
  		'name':"Sale",
  		"link":"/sale",
  		"icon":"shopping-cart",
      "class":"sale"
  	},
    {
      'name':"Invoice",
      'link':"/invoice",
      'icon':"file-text-o"
    },
    {
      'name':"PO",
      'link':"/po",
      'icon':"list-ul"
    },
    {
      'name':"Request",
      'link':"/request",
      'icon':"newspaper-o"
    },
    {
      'name':"Quote",
      'link':"/quote",
      'icon':"file"
    },
    {
      'name':"Challan",
      'link':"/challan",
      'icon':"sticky-note-o"
    },
  ];

  @Output() expandonhover:EventEmitter<Boolean> = new EventEmitter();
  
  private expanditonhover(data:Boolean):void{
  		this.expandonhover.next(data);
  		// console.log('data');
  }
 

}
