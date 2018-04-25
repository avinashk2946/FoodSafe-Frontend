import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { HttpClient } from '@angular/common/http';
import { GLOBAL_PROPERTIES, API_ACTIONS } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';
// import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class ResetPasswordService {

  constructor(private comonSrvc: CommonService,
    private http : HttpClient) { }
    private headers=new Headers(
    {
        "Content-Type":"application/json",

    } 
    
  );
  reset(data) {
    // const reqPayload = {
    //   channel: GLOBAL_PROPERTIES.CHANNEL,
    //   companyId: data
    // };
    const url = API_ACTIONS.login.resetPassword ;
    const httpRequest = new HttpRequestModal(url, 'POST', data, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }

}
