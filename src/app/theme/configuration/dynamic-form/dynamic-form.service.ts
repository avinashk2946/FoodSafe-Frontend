import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { API_ACTIONS, GLOBAL_PROPERTIES } from '../../../common/common.constant';
import { HttpRequestModal } from '../../../common/httpRequest.modal';

@Injectable()
export class DynamicFormService extends CommonService{

  //constructor(private comonSrvc: CommonService) { }

  saveDynamicForm(input){
    try {
      if(input){
        const url = API_ACTIONS.configuration.dynamicForm;
        const httpRequest = new HttpRequestModal(url, 'POST', input, true);
        return this.createHttpRequest(httpRequest);
       }
    } catch (error) {
      console.log(error);
    }   
  }  

  updateDynamicForm(id, input){
    try {
      if(input){
        const url = API_ACTIONS.configuration.dynamicForm + '/' + id;
        const httpRequest = new HttpRequestModal(url, 'PUT', input, true);
        return this.createHttpRequest(httpRequest);
       }
    } catch (error) {
      console.log(error);
    }   
  }  

  searchDynamicForm(input){
    try {
      if(input){
        const url = API_ACTIONS.configuration.dynamicForm + '/search';
        const httpRequest = new HttpRequestModal(url, 'POST', input, true);
        return this.createHttpRequest(httpRequest);
       }
    } catch (error) {
      console.log(error);
    }   
  }  

  //It will be used for fetching all master data
  getMasterData(modalName){
    try {
        const reqPayload = {
          channel: GLOBAL_PROPERTIES.CHANNEL
        };
        const url = "genericMaster/" + modalName;
        const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
        return this.createHttpRequest(httpRequest);
    } catch (error) {
      console.log(error);
    }
  }

  //It will be used for searching dependent master data
  getPlants() {
    const reqPayload = {
      channel: GLOBAL_PROPERTIES.CHANNEL
    };
    const url = API_ACTIONS.raw_material.plant;
    const httpRequest = new HttpRequestModal(url, 'GET', reqPayload, true);
    return this.createHttpRequest(httpRequest);
  }
}