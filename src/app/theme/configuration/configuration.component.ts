import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers:[ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

 loginCofigurationForm : FormGroup;
  themeColor : any;
  logoImg : any;
  backgroundImg : any;

  constructor(private fb : FormBuilder,private ConfigurationSrvc: ConfigurationService) { 
  }

  ngOnInit() {
    //this.logoUrl = "http://localhost/FS_Resource/images/Logo-small-bottom.png";

  	this.loginCofigurationForm = this.fb.group({
  		/*'username' : ['', [Validators.required, Validators.minLength(6)]],
  		'password' : ['', [Validators.required, Validators.minLength(6)]]*/
  	})
  }
  onSubmit() {
  	var requestData={themeColor:this.themeColor,logoImg:this.logoImg,backgroundImg:this.backgroundImg};
    this.ConfigurationSrvc.setLoginPageConfig(requestData).subscribe(
      (resData: any) => {
    }, err => { 
      if (err.status === 401) {
      }
     
    });
  };
}
