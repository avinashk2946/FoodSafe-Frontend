import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { Headers,Http ,URLSearchParams , Response, ResponseContentType} from '@angular/http';

import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';

@Injectable()
export class ForgotPasswordService {

  constructor(private comonSrvc: CommonService,
    private http : Http) { }
    private headers=new Headers(
    {
        "Content-Type":"application/json",

    } 
    
  );
  create(email) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL,
      companyId: email
    };

    const httpRequest = new HttpRequestModal(API_ACTIONS.login.forgotpassword, 'POST', reqPayload, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }

}






