import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: true } })
export class Dapp extends Entity {
  // @property({
  //   type: 'string',
  //   id: true,
  // })
  // id?: string;

  @property({
    type: 'string',
    id: true,
  })
  ap_no?: string;

  @property({
    type: 'string',
  })
  apId?: string;

  @property({
    type: 'string',
  })
  sowid?: string;

  @property({
    type: 'string',
  })
  evaluationCriteriaId?: string;

  @property({
    type: 'string',
  })
  igceId?: string;

  @property({
    type: 'string',
  })
  estimateId?: string;

  @property({
    type: 'string',
  })
  competitionId?: string;

  @property({
    type: 'string',
  })
  compatibilityId?: string;

  @property({
    type: 'string',
  })
  constraintId?: string;

  @property({
    type: 'string',
  })
  tradeoffId?: string;

  @property({
    type: 'string',
  })
  requisitionId?: string;

  @property({
    type: 'string',
  })
  attachmentId?: string;

  @property({
    type: 'string',
  })
  collaboratorId?: string;

  @property({
    type: 'string',
  })
  section508Id?: string;

  @property({
    type: 'string',
  })
  considerationId?: string;

  @property({
    type: 'string',
  })
  securityId?: string;

  @property({
    type: 'string',
  })
  resourceId?: string;

  @property({
    type: 'string',
  })
  pocId?: string;

  constructor(data?: Partial<Dapp>) {
    super(data);
  }
}


export interface DappRelations {
  // describe navigational properties here
}

export type DappWithRelations = Dapp & DappRelations;
