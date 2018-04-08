import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';
import { Http } from '@angular/http';
import { HttpEventType } from '@angular/common/http';
import { SamplePreparation } from '../../../classes/sample-preparation';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Injectable()
export class RawMaterialService {

  constructor(private comonSrvc: CommonService, public http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private url;

  getPlant() {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.plant;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getSupplier(id) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.supplier + '?plant=' + id;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getBroker(obj) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.broker + '?plant=' + obj.plantId + '&supplier=' + obj.supplierId;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }

  //   getSamplePreparation(obj) {
  //   var reqPayload = {
  //     channel: GLOBAL_PROPERTIES.CHANNEL
  //   }
  //   var url = API_ACTIONS.raw_material.samplepreparation+'?supplierlot='+obj.supplierlot+'&supplier='+obj.supplierlot;
  //   var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
  //   return this.comonSrvc.createHttpRequest(httpRequest);
  // }

  getProduct(obj) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.product + '?plant=' + obj.plantId + '&supplier=' + obj.supplierId + '&brokerId=' + obj.brokerId;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  saveRecord(obj) {
    const url = API_ACTIONS.raw_material.record;
    const httpRequest = new HttpRequestModal(url, 'POST', obj, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getRecord() {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.record;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  uploadAttachment(obj) {
    const url = GLOBAL_PROPERTIES.BASE_API_URL + API_ACTIONS.raw_material.record + '/attachment';
    console.log(url);
    return this.http.post(url, obj);
  }
  getRecordData(id) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.record + '?_id=' + id;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }

  getRawMatrialGroup(obj) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.rawmaterial + '/groups?plant=' + obj.plantId
      + '&supplier=' + obj.supplierId + '&brokerId=' + obj.brokerId;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getRawMatrial(obj) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.rawmaterial + '?plant=' + obj.plantId
      + '&supplier=' + obj.supplierId + '&brokerId=' + obj.brokerId + 'rmGroupName' + obj.matrialGrp;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  saveSamplePreparation(obj) {
    const url = API_ACTIONS.raw_material.record + '/samplePreparation';
    const httpRequest = new HttpRequestModal(url, 'POST', obj, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }

  getSamplePreparation(recordId) {
    const url = API_ACTIONS.raw_material.record + '/samplePreparation/' + recordId;
    return this.http.get(GLOBAL_PROPERTIES.BASE_API_URL + url);
  }

  sampleCollection(obj) {
    const url = API_ACTIONS.raw_material.record + '/';
    const httpRequest = new HttpRequestModal(url, 'GET', obj, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }

  searchSupplier(supplierlot: Observable<string>, suplierid, rawmaterialGrp) {

    return supplierlot
      .debounceTime(500)
      .filter(term => !!term)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term, suplierid, rawmaterialGrp));

  }
  searchEntries(term, suplierid, rawmaterialGrp) {
    console.log(term);
    const url = API_ACTIONS.raw_material.record + '/samplePreparation/checkSupplierLot/'
      + suplierid + '/' + term + '/' + rawmaterialGrp;

    return this.http
      .get(GLOBAL_PROPERTIES.BASE_API_URL + url)
      .map(res => res.json());
  }


}
