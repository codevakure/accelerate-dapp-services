import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Compatibility extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  description1?: string;

  constructor(data?: Partial<Compatibility>) {
    super(data);
  }
}

export interface CompatibilityRelations {
  // describe navigational properties here
}

export type CompatibilityWithRelations = Compatibility & CompatibilityRelations;
