import { Plant } from './plant'; 
import { Address } from './address'; 
import { Broker } from './broker'; 
import { Supplier } from './supplier'; 

export class Rawmaterials {
  
	  id:number;
  	createdDate :string ;
  	createdBy : string;
  	suplier : string;
	  coo : string;
 	  product :string ;
 	  productCode :string;
 	  variety : string;
  	kosher : string;
  	nonGMO : string;
  	po : string;
  	containerNo :string;
  	lotNo :string; 
    plant:Plant;
    address:Address;
    broker:Broker;
    supplier:Supplier;
}
