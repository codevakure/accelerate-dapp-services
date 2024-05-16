import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Security extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;


  @property({
     type: 'string',
  })
  securityConsiderations: string ;

  
  @property({
    type: 'string',
  })
  securityConsiderationsText: string ;

      
  @property({
    type: 'string',
  })
  contractorFacility: string ;

  
  @property({
    type: 'string',
  })
  informationSecurity: string;



  @property({
    type: 'string',
  })
  informationSecurity1: string;



  @property({
    type: 'string',
  })
  informationSecurity2: string;



  @property({
    type: 'string',
  })
  informationSecurity3: string;

      
  @property({
    type: 'string',
  })
  informationSecurity4: string;

  
  @property({
   type: 'string',
  })
  classifiedMatters: string;

 
 @property({
  type: 'string',
 })
 informationTechnology: string;

      
 @property({
  type: 'string',
 })
 optionFFP: string;


  constructor(data?: Partial<Security>) {
    super(data);
  }
}

export interface SecurityRelations {
  // describe navigational properties here
}

export type SecurityWithRelations = Security & SecurityRelations;
