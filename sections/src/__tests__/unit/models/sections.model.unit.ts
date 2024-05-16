//import {aLocation, givenSections} from '../../helpers';

import {expect} from '@loopback/testlab';
import {Sections} from '../../../models';
import {givenSections} from '../../helpers';

describe('Sections (unit)', () => {
  //we recommend to tests by properties
  describe('getId()', () => {
    it('uses all three parts when present', () => {
      const sections = sectionsData({
        id: 'Do, what I say',
      });

      const id = sections.id;
      expect(id).to.equal('Do, what I say');
    });
  });
  // describe('getFormid()', () => {
  //   // it('uses all three parts when present', () => {
  //   //   const sections = sectionsData({
  //   //     //formid: 'Do, what I say',
  //   //   });

  //   //   //const formid = sections.formid;
  //   //   expect(formid).to.equal('Do, what I say');
  //   // });
  // });
  //   it('omits middlename when not present', () => {
  //     const person = givenPerson({
  //       firstname: 'Mark',
  //       surname: 'Twain',
  //     });

  //     const fullName = person.getFullName();
  //     expect(fullName).to.equal('Mark Twain');
  //   });
  // });

  function sectionsData(data: Partial<Sections>) {
    return new Sections(givenSections(data));
  }
});
