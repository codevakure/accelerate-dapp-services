//import {aLocation, givenAp} from '../../helpers';

import {expect} from '@loopback/testlab';
import {Ap} from '../../../models';
import {givenAp} from '../../helpers';

describe('Ap (unit)', () => {
  //we recommend to tests by properties
  describe('getProjectTitle()', () => {
    it('uses all three parts when present', () => {
      const ap = apData({
        projectTitle: 'Do, what I say',
      });

      const projectTitle = ap.projectTitle;
      expect(projectTitle).to.equal('Do, what I say');
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

  function apData(data: Partial<Ap>) {
    return new Ap(givenAp(data));
  }
});
