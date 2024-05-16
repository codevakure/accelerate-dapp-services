import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Section508 extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  description?: string;
  
  constructor(data?: Partial<Section508>) {
    super(data);
  }
}

export interface Section508Relations {
  // describe navigational properties here
}

export type Section508WithRelations = Section508 & Section508Relations;
