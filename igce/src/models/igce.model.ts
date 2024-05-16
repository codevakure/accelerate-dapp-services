import { Entity, model, property, DateType } from '@loopback/repository';

@model({ settings: { strict: true } })
export class Igce extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;



  // @property({
  //   type: 'array',
  //   itemType: 'any',
  // })
  // optionYears: any[];

  @property.array(Object, {
    name: 'optionYears',
    required: false
  })
  optionYears: any[];

  // @property({
  //   type: 'string',
  // })
  // minDate: string;

  // @property({
  //   type: 'string',
  // })
  // maxDate: string;
  constructor(data?: Partial<Igce>) {
    super(data);
  }
}
