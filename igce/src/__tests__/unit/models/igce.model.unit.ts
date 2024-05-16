//import {aLocation, givenIgce} from '../../helpers';

import {expect} from '@loopback/testlab';
import {Igce} from '../../../models';
import {givenIgce} from '../../helpers';

describe('Igce (unit)', () => {
  //we recommend to tests by properties
  describe('getId()', () => {
    it('uses all three parts when present', () => {
      const igce = igceData({
        id: 'Do, what I say',
      });

      const id = igce.id;
      expect(id).to.equal('Do, what I say');
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

  function igceData(data: Partial<Igce>) {
    return new Igce(givenIgce(data));
  }
});
