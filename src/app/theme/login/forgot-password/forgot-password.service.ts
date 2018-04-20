import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
// import { Headers,Http ,URLSearchParams , Response, ResponseContentType} from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';

@Injectable()
export class ForgotPasswordService {

  constructor(private comonSrvc: CommonService, private http : HttpClient) { }
    private headers=new Headers(
    {
        "Content-Type":"application/json",
    } 
  );
  create(email) {
    console.log(email);//got mail address
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL,
      companyId: email
    };
    console.log(reqPayload);
    const url = API_ACTIONS.login.verifyEmail + '/' + email;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);

    let requestAny: any;
    requestAny = this.comonSrvc.createHttpRequest(httpRequest);
    console.log('requestAny', requestAny);
    return requestAny;
  }

}







