import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class EmailModel extends Model {
  @property({
    type: 'string',
  })
  from?: string;

  // @property({
  //   type: 'string',
  // })
  // to?: string;

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

  @property({
    type: 'string',
  })
  templateName?: string;


  constructor(data?: Partial<EmailModel>) {
    super(data);
  }
}
