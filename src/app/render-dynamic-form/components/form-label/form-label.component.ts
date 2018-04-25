import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-label',
  styleUrls: ['form-label.component.scss'],
  template: `
      <label>{{ config.label }}</label>
  `
})
export class FormLabelComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
