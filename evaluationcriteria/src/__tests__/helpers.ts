import {EvaluationCriteria} from '../models';

/**
 * Generate a complete EvaluationCriteria object for use with tests.
 * @param evaluationCriteria A partial (or complete) EvaluationCriteria object.
 */
export function givenEvaluationCriteria(
  evaluationCriteria?: Partial<EvaluationCriteria>,
) {
  const data = Object.assign(
    {
      description: 'do a thing',
      technicalEvaluationCriteria: 'There are some things that need doing',
    },
    evaluationCriteria,
  );
  return new EvaluationCriteria(data);
}
