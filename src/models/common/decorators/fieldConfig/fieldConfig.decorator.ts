import 'reflect-metadata';
import { IDescribeTsType } from '../../../layerMetadata';
import { IFieldConfigClassInfo } from './classFieldConfig.decorator';

const fieldConfigMetadataKey = Symbol('fieldconfig');

export enum FieldCategory {
  MAIN = 'MAIN',
  GENERAL = 'GENERAL',
  GEO_INFO = 'GEO_INFO',
}
export interface IValidationConfigInfo {
  errorMsgCode: string;
  valueType?: 'value' | 'field';
  min?: number | string | '$NOW';
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  required?: boolean;
  json?: boolean;
}

export interface IFieldConfigInfo {
  category: FieldCategory; // field category
  complexType?: IDescribeTsType; // complex type subfields
  subFields?: IFieldConfigClassInfo; // complex type subfields
  isManuallyEditable?: boolean; // is field can be modified via form after ingestion.
  isFilterable?: boolean; // is field might participate in filter/search params
  isSortable?: boolean; // is field might participate in sorting
  isRequired?: boolean; // is field mandatory, deprecated should be implemeted by validation type='required'
  isAutoGenerated?: boolean; // is field non relevant as input field for ingestion, but should be presented as a part of the model.
  isLifecycleEnvolved?: boolean; // is field might be changed during external processes, outside of the app's form.
  autocomplete?: {
    type: 'domain' | 'service';
    value: string;
  };
  infoMsgCode?: string[];
  validation?: IValidationConfigInfo[];
  default?: string | number;
}

export interface IPropFieldConfigInfo extends IFieldConfigInfo {
  prop: string;
}

export function fieldConfig(fieldConfigInfo: IFieldConfigInfo): PropertyDecorator {
  return Reflect.metadata(fieldConfigMetadataKey, fieldConfigInfo);
}

export function getFieldConfig<T>(target: T, propertyKey: string): IFieldConfigInfo | undefined {
  return Reflect.getMetadata(fieldConfigMetadataKey, target, propertyKey) as IFieldConfigInfo;
}
