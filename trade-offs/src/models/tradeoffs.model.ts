import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Tradeoffs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  igceDescription?: string;


  @property({
    type: 'string',
  })
  coastGoals?: string;

  @property({
    type: 'string',
  })
  funding?: string;


  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Tradeoffs>) {
    super(data);
  }
}

export interface TradeoffsRelations {
  // describe navigational properties here
}

export type TradeoffsWithRelations = Tradeoffs & TradeoffsRelations;
