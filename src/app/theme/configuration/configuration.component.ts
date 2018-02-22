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
  base64textString:String="";

  constructor(private fb : FormBuilder,private ConfigurationSrvc: ConfigurationService) { 
  }
	handleFileSelect(evt){
	  var files = evt.target.files;
	  console.log('files',files);
	  var file = files[0];

	if (files && file) {
	    var reader = new FileReader();

	    reader.onload =this._handleReaderLoaded.bind(this);

	    reader.readAsBinaryString(file);
	}
	}

	_handleReaderLoaded(readerEvt) {
	 var binaryString = readerEvt.target.result;
	        this.base64textString= btoa(binaryString);
	        console.log(btoa(binaryString));
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
