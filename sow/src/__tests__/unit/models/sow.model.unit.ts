//import {aLocation, givenSow} from '../../helpers';

import {expect} from '@loopback/testlab';
import {Sow} from '../../../models';
import {givenSow} from '../../helpers';

describe('Sow (unit)', () => {
  //we recommend to tests by properties
  describe('getPerformanceWorkStatement()', () => {
    // it('uses all three parts when present', () => {
    //   // const sow = sowData({
    //   //   performanceWorkStatement: 'Do, what I say',
    //   // });

    //   //const performanceWorkStatement = sow.performanceWorkStatement;
    //   //expect(performanceWorkStatement).to.equal('Do, what I say');
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

  function sowData(data: Partial<Sow>) {
    return new Sow(givenSow(data));
  }
});
