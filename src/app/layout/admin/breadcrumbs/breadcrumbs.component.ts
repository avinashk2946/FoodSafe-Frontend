import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { RawMaterialService } from '../../../theme/Record-keeping/receiving/raw-materials/raw-material.service';
import { CommonService } from '../../../common/common.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],

    providers: [RawMaterialService]
})
export class BreadcrumbsComponent {
  tempState = [];
  breadcrumbs: Array<Object>;
  constructor(private router: Router,
   private route: ActivatedRoute,
     public rawMatService: RawMaterialService,
      public comonSrvc: CommonService,
     protected localStorage: AsyncLocalStorage
   ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.breadcrumbs = [];
        this.tempState = [];
        let currentRoute = this.route.root,
            url = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              const routeSnapshot = routes.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              if (routes.snapshot.data.title !== undefined) {
                let status = true;
                if (routes.snapshot.data.status !== undefined) {
                  status = routes.snapshot.data.status;
                }

                let icon = false;
                if (routes.snapshot.data.icon !== undefined) {
                  icon = routes.snapshot.data.icon;
                }

                let caption = false;
                if (routes.snapshot.data.caption !== undefined) {
                  caption = routes.snapshot.data.caption;
                }

                if (!this.tempState.includes(routes.snapshot.data.title)) {
                  this.tempState.push(routes.snapshot.data.title);
                  this.breadcrumbs.push({
                    label: routes.snapshot.data.title,
                    icon: icon,
                    caption: caption,
                    status: status,
                    url: url
                  });
                }
              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);
      });

       this.getRecordDetails();
  }


   recordDetails: any = {};
   recordId: any = '';


  getRecordDetails() {
    this.rawMatService.getRecordData(this.recordId).subscribe((response: any) => {
      this.recordDetails = response.data[0];
      // this.convertImageDatatoShowableData();
      this.localStorage.setItem('recordDetails', this.recordDetails).subscribe(() => { }, () => { });
    }, err => {
      this.comonSrvc.showErrorMsg('Document upload - Error in getting a list of record');
    });
  }

  public value: boolean = null;

  id: number;
  rawmaterial: any = 'rawmaterials[]';
  plantList = [];
  brokerList = [];
  supplierList = [];
  productList = [];
  materialGrpList = [];
  materialList = [];
  address: any = '';

  createdDate: any = new Date();
  createdBy: any = '';
  createdById: any = '';
  broker: any = '';
  coo: any = '';
  product: any = '';
  productCode: any = '';
  variety: any = '';
  isApproved: any = '';
  kosher: any = '';
  nonGMO: any = '';
  organicValue: any = '';
  po:  any = '';
  containerNo:string;
  lotNo: string;
  plant: any = '';
  supplier: any = '';
  selectedSupplier: any = '';
  selectedMaterial: any = '';
  materialGrp = '';
  material = '';
  
  onRecordCreate() {
    const obj = {
      plant: this.plant,
      supplier: this.supplier,
      broker: this.broker,
      country: this.coo,
      po: this.po,
      containerNo: this.containerNo,
      lotNo: this.lotNo,
      variety: this.variety,
      rawMaterial: this.material,
      nonGMO: this.nonGMO,
      createdBy: this.createdById,
      materialGrp: this.materialGrp
      // isDelete : false
    };

    this.rawMatService.saveRecord(obj).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
      this.router.navigate(['/recordkeeping/receiving/document-upload', response.data._id]);
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }

}
