//import {aLocation, givenEvaluationCriteria} from '../../helpers';

import {expect} from '@loopback/testlab';
import {EvaluationCriteria} from '../../../models';
import {givenEvaluationCriteria} from '../../helpers';

describe('EvaluationCriteria (unit)', () => {
  //we recommend to tests by properties
  describe('getDescription()', () => {
    // it('uses all three parts when present', () => {
    //   const evaluationCriteria = evaluationCriteriaData({
    //   //  description: 'Do, what I say',
    //   });

    //   const description = evaluationCriteria.description;
    //   expect(description).to.equal('Do, what I say');
    // });
  });
  //   it('omits middlename when not present', () => {
  //     const person = givenPerson({
  //       firstname: 'Mark',
  //       surname: 'Twain',
  //     });

  //     const fullName = person.getFullName();
  //     expect(fullName).to.equal('Mark Twain');
  //   });
  // });

  function evaluationCriteriaData(data: Partial<EvaluationCriteria>) {
    return new EvaluationCriteria(givenEvaluationCriteria(data));
  }
});
