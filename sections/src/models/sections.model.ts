import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Sections extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  description: string;


  
  // @property({
  //   type: 'string',
  // })
  // formid?: string;

  // @property({
  //   type: 'string',
  // })
  // Section?: string;

  // @property({
  //   type: 'string',
  // })
  // SectionText?: string;

  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // clauses?: string[];

  constructor(data?: Partial<Sections>) {
    super(data);
  }
}
