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
    var url = API_ACTIONS.raw_material.supplier+'/'+id;
    var httpRequest = new  HttpRequestModal(url, 'GET',reqPayload,true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
}
