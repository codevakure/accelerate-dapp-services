import {DefaultCrudRepository} from '@loopback/repository';
import {EvaluationCriteria} from '../models';
import {EvaluationCriteriaDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EvaluationCriteriaRepository extends DefaultCrudRepository<
  EvaluationCriteria,
  typeof EvaluationCriteria.prototype.id
> {
  constructor(
    @inject('datasources.evaluationCriteriaDs')
    dataSource: EvaluationCriteriaDsDataSource,
  ) {
    super(EvaluationCriteria, dataSource);
  }
}
