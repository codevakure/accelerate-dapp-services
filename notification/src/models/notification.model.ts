import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Notification extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  from?: string;

  // @property({
  //   type: 'string',
  // })
  @property({ 
    type: 'array', 
    itemType: 'string', 
  }) 
  to?: string;

  @property({
    type: 'string',
  })
  subject?: string;

  @property({
    type: 'string',
  })
  body?: string;

  // @property({
  //   type: 'string',
  // })
  // templateName?: string;

  constructor(data?: Partial<Notification>) {
    super(data);
  }
}

export interface NotificationRelations {
  // describe navigational properties here
}

export type NotificationWithRelations = Notification & NotificationRelations;
