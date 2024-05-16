import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class EvaluationCriteria extends Entity {
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
  // evaluationCriteria: any[];


  @property.array(Object, {
    name: 'evaluationCriteria',
    required: false
  })
  evaluationCriteria: any[];



  @property({
     type: 'string',
  })
  sourceSelectionPlan: string;


  @property({
    type: 'string',
  })
  mandatoryCriterias: string;

  @property({
    type: 'string',
  })
  scoringMechanism: string ;

  @property.array(Object, {
    name: 'clause',
    required: false
  })
  clause: any[];

  @property({
    type: 'string',
  })
  description?: string;
  
  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // description: string;

  // @property({
  //   type: 'string',
  // })
  // technicalEvaluationCriteria?: string;

  // @property({
  //   type: 'string',
  // })
  // mandatoryCriteria?: string;

  // @property({
  //   type: 'string',
  // })
  // pastPerformance?: string;

  // @property({
  //   type: 'string',
  // })
  // smallBusinessSubContractingAndDisadvantagedParticipationPlans?: string;

  // @property({
  //   type: 'string',
  // })
  // sourceSelectionProcedures?: string;

  constructor(data?: Partial<EvaluationCriteria>) {
    super(data);
  }
}
