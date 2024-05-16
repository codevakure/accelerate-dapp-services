//import {aLocation, givenSections} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {Sections} from '../../../models';
import {SectionsRepository} from '../../../repositories';
import {givenSections} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('SectionsRepository (unit)', () => {
  let sectionsRepo: StubbedInstanceWithSinonAccessor<SectionsRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let aSections: Sections;
  let aSectionsWithId: Sections;
  let aChangedSections: Sections;
  let aListOfSectionss: Sections[];

  beforeEach(resetRepositories);
  describe('createSections', () => {
    it('creates a Sections', async () => {
      create.resolves(aSectionsWithId);
      const result = await sectionsRepo.create(aSections);
      expect(result).to.eql(aSectionsWithId);
      sinon.assert.calledWith(create, aSections);
    });
  });

  describe('findSectionsById', () => {
    it('returns a sections if it exists', async () => {
      findById.resolves(aSectionsWithId);
      expect(await sectionsRepo.findById(aSectionsWithId.id as string)).to.eql(
        aSectionsWithId,
      );
      sinon.assert.calledWith(findById, aSectionsWithId.id);
    });
  });

  describe('findSectionss', () => {
    it('returns multiple sectionss if they exist', async () => {
      find.resolves(aListOfSectionss);
      expect(await sectionsRepo.find({})).to.eql(aListOfSectionss);
      sinon.assert.called(find);
    });

    it('returns empty list if no sectionss exist', async () => {
      const expected: Sections[] = [];
      find.resolves(expected);
      expect(await sectionsRepo.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
        expected,
      );
      sinon.assert.called(find);
    });

    // it('uses the provided filter', async () => {
    // const filter: Filter<Sections> = {where: {formid: 'do a thing'}};
    //   find.resolves(aListOfSectionss);
    //   await sectionsRepo.find(filter);
    //   sinon.assert.calledWith(find, filter);
    // });
  });

  describe('replaceSections', () => {
    it('successfully replaces existing items', async () => {
      replaceById.resolves();
      await sectionsRepo.replaceById(
        aSectionsWithId.id as string,
        aChangedSections,
      );
      sinon.assert.calledWith(
        replaceById,
        aSectionsWithId.id,
        aChangedSections,
      );
    });
  });

  describe('updateSections', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await sectionsRepo.updateById(
        aSectionsWithId.id as string,
        aChangedSections,
      );
      sinon.assert.calledWith(updateById, aSectionsWithId.id, aChangedSections);
    });
  });

  describe('deleteById()', () => {
    it('successfully deletes existing items', async () => {
      deleteById.resolves();
      await sectionsRepo.deleteById(aSectionsWithId.id as string);
      sinon.assert.calledWith(deleteById, aSectionsWithId.id);
    });
  });

  describe('count()', () => {
    it('returns the number of existing sectionsLists', async () => {
      count.resolves(aListOfSectionss.length);
      expect(await sectionsRepo.count()).to.eql(aListOfSectionss.length);
      sinon.assert.called(count);
    });
  });

  // describe('updateAll()', () => {
  //   // it('returns a number of sectionss updated', async () => {
  //   //   updateAll.resolves([aListOfSectionss].length);
  //   //   const where = {formid: aSectionsWithId.formid};
  //   //   expect(await sectionsRepo.updateAll(aChangedSections, where)).to.eql(1);
  //   //   sinon.assert.calledWith(updateAll, aChangedSections, where);
  //   // });
  // });

  function resetRepositories() {
    sectionsRepo = createStubInstance(SectionsRepository);
    aSections = givenSections();
    aSectionsWithId = givenSections({
      id: '6364hfhfhfgr1',
    });
    aListOfSectionss = [
      aSectionsWithId,
      givenSections({
        id: '77r74ygrfhfhr',
        //formid: 'so many things to do',
      }),
    ] as Sections[];
    aChangedSections = givenSections({
      id: aSectionsWithId.id,
      //formid: 'Do some important things',
    });

  }
});
