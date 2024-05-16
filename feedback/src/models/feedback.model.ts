import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: true } })
export class Feedback extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  ap_no: string;

  @property({
    type: 'string',
  })
  user: string;


  @property({
    type: 'string',
  })
  keyword: string;


  @property({
    type: 'boolean',
  })
  is_commercial: boolean;

  @property({
    type: 'number',
  })
  estimatedBudgett: number;

  @property({
    type: 'string',
  })
  contractType: string;

  @property({
    type: 'string',
  })
  productService: string;

  @property({
    type: 'array',
    itemType: Object,
  })
  eval?: {}[];


  @property({
    type: 'array',
    itemType: Object,
  })
  sow?: {}[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Feedback>) {
    super(data);
  }
}

export interface FeedbackRelations {
  // describe navigational properties here
}

export type FeedbackWithRelations = Feedback & FeedbackRelations;
