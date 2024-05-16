import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Consideration extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;


  @property({
    type: 'string',
   })
  proposedCOR:  string;


  @property({
    type: 'string',
   })
  tradeOff:  string;


  @property({
    type: 'string',
   })
  majorComponents:  string;



  @property({
    type: 'string',
   })
  govtPerformance:  string;

  
  @property({
    type: 'string',
   })
  makeBuy:  string ;


  @property({
    type: 'string',
   })
  priorities:  string; 


  @property({
    type: 'string',
   })
  testEvaluation:  string; 


  @property({
    type: 'string',
   })
  contractorData:  string; 


  @property({
    type: 'string',
   })
  contractorAgency:  string ;


  @property({
    type: 'string',
   })
  assuranceRequirements:  string ;

  
  
  @property({
    type: 'string',
   })
  standardizationConcepts:  string; 


  @property({
    type: 'string',
   })
  conservationObjectives:  string;


  @property({
    type: 'string',
   })
  otherConsiderations:  string; 

  constructor(data?: Partial<Consideration>) {
    super(data);
  }
}

export interface ConsiderationRelations {
  // describe navigational properties here
}

export type ConsiderationWithRelations = Consideration & ConsiderationRelations;
