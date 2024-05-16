//import {aLocation, givenClauses} from '../../helpers';

import {expect} from '@loopback/testlab';
import {Clauses} from '../../../models';
import {givenClauses} from '../../helpers';

describe('Clauses (unit)', () => {
  //we recommend to tests by properties
  describe('getTitle()', () => {
    it('uses all three parts when present', () => {
      const clauses = clausesData({
        title: 'Do, what I say',
      });

      const title = clauses.title;
      expect(title).to.equal('Do, what I say');
    });
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

  function clausesData(data: Partial<Clauses>) {
    return new Clauses(givenClauses(data));
  }
});
