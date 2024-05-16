import {Entity, model, property} from '@loopback/repository';

@model()
export class Clauses extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  ForH?: string;

  @property({
    type: 'string',
  })
  clauseNo?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  date?: string;

  @property({
    type: 'string',
  })
  sno?: string;

  @property({
    type: 'string',
  })
  p48CFR?: string;

  @property({
    type: 'string',
  })
  prescription?: string;

  @property({
    type: 'string',
  })
  PorC?: string;

  @property({
    type: 'string',
  })
  IBR?: string;

  @property({
    type: 'string',
  })
  UCF?: string;

  @property({
    type: 'string',
  })
  commSVC?: string;

  @property({
    type: 'string',
  })
  useClause?: string;

  @property({
    type: 'string',
  })
  useCause?: string;

  @property({
    type: 'string',
  })
  inclusionF?: string;

  @property({
    type: 'string',
  })
  thresholdAmt?: string;

  constructor(data?: Partial<Clauses>) {
    super(data);
  }
}
