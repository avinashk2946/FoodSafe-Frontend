import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';

@Injectable()
export class RawMaterialService {
  constructor(private comonSrvc: CommonService) {
  }

  getPlant() {
    var reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    }
    var url = API_ACTIONS.raw_material.plant;
    var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getSupplier(id) {
    var reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    }
    var url = API_ACTIONS.raw_material.supplier+'?plant='+id;
    var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getBroker(obj) {
    var reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    }
    var url = API_ACTIONS.raw_material.broker+'?plant='+obj.plantId+'&supplier='+obj.supplierId;
    var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  getProduct(obj) {
    var reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    }
    var url = API_ACTIONS.raw_material.product+'?plant='+obj.plantId+'&supplier='+obj.supplierId+'&brokerId='+obj.brokerId;
    var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
}
