import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Sow extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  description?: string;


  @property({
    type: 'string',
  })
  description1?: string;


  @property.array(Object, {
    name: 'clause',
    required: false
  })
  clause: any[];


  // @property({
  //   type: 'string',
  // })
  // performanceWorkStatement?: string;

  // @property({
  //   type: 'string',
  // })
  // backgroundStatement?: string;

  // @property({
  //   type: 'string',
  // })
  // contractAdministration?: string;

  constructor(data?: Partial<Sow>) {
    super(data);
  }
}

export interface SowRelations {
  // describe navigational properties here
}

export type SowWithRelations = Sow & SowRelations;
