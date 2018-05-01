import { Injectable } from '@angular/core';
import { CommonService } from '../../../../common/common.service';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../../common/common.constant';
import { HttpRequestModal } from '../../../../common/httpRequest.modal';
import {Observable} from 'rxjs';
@Injectable()
export class QMR14Service {

  constructor(private comonSrvc: CommonService) { }

  getFormConfig():Observable<any> {

    const httpRequest = new HttpRequestModal('dynamicForm?id=5ae5aff7db269d3768593b71', 'GET', {}, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  saveFormConfig(data,id="5ae5aff7db269d3768593b71"):Observable<any> {

    const httpRequest = new HttpRequestModal('qmr14', 'POST', {formId:id,data}, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }
}
