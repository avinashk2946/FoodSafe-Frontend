import { Component, ElementRef, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation,Directive,
  Renderer, HostListener, HostBinding} from '@angular/core';




@Directive({
  selector: '[appDocumentUpload]'
})
export class DocumentUploadDirective {

  constructor(
    // private el: ElementRef,
    // private renderer: Renderer
      ) {

   // this.ChangeBgColor("green");
  }
 // @HostListener('click', ['$event'])
 //  handleClick(event: Event) {
 //  	alert("clicked");
 //    if (this.el.nativeElement.contains(event.target)) {
 //      this.highlight('green');
 //    } 
 //    // else {
 //    //   this.highlight(null);
 //    // }
 //  }

 //  highlight(color) {
 //    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
 //  }

}
