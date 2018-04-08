import { Injectable } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../common/common.constant';
import { HttpRequestModal } from '../../common/httpRequest.modal';
@Injectable()
export class LoginService {

  constructor(private comonSrvc: CommonService) { }

  verifyUser(data) {
    const reqPayload = {
      username: data.username,
      password: data.password
    };

    const httpRequest = new HttpRequestModal(API_ACTIONS.login.loginUser, 'POST', reqPayload, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }

  fetchConfig(data) {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL,
      companyId: data
    }

    const httpRequest = new HttpRequestModal(API_ACTIONS.configuration.loginConfig, 'GET', reqPayload, true);

    return this.comonSrvc.createHttpRequest(httpRequest);
  }
  resetPassword(data) {
    const reqPayload = {
      username: data.username,
      password: data.password
    }
    const httpRequest = new HttpRequestModal(API_ACTIONS.login.resetPassword, 'POST', reqPayload, true);
    return this.comonSrvc.createHttpRequest(httpRequest);
  }
}




