import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserMenuService } from './user-menu.service';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';


@Component({
  selector: 'app-configuration',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  providers:[UserMenuService]
})
export class UserMenuComponent {

 dropdownEnabled = true;
    items: TreeviewItem[];
    values: number[];
    config = TreeviewConfig.create({
        hasAllCheckBox: true,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 400
    });

    buttonClasses = [
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-success',
        'btn-outline-danger',
        'btn-outline-warning',
        'btn-outline-info',
        'btn-outline-light',
        'btn-outline-dark'
    ];
    buttonClass = this.buttonClasses[0];

    constructor(
        private service: UserMenuService
    ) { }

    ngOnInit() {
        this.items = this.service.getBooks();
    }
}
