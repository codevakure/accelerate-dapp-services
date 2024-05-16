import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Requisition extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;


  @property.array(Object, {
    name: 'optionYears',
    required: false
  })
  lineItems: any[];

  @property({
    type: 'number',
  })
  lineTotal: number;

  @property({
   type: 'string',
  })
  option: string;

  @property({
    type: 'string',
  })
  description?: string;
  
  constructor(data?: Partial<Requisition>) {
    super(data);
  }
}

export interface RequisitionRelations {
  // describe navigational properties here
}

export type RequisitionWithRelations = Requisition & RequisitionRelations;
