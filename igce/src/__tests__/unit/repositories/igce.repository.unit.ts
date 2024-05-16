//import {aLocation, givenIgce} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {Igce} from '../../../models';
import {IgceRepository} from '../../../repositories';
import {givenIgce} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('IgceRepository (unit)', () => {
  let igceRepo: StubbedInstanceWithSinonAccessor<IgceRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let aIgce: Igce;
  let aIgceWithId: Igce;
  let aChangedIgce: Igce;
  let aListOfIgces: Igce[];

  beforeEach(resetRepositories);
  describe('createIgce', () => {
    it('creates a Igce', async () => {
      create.resolves(aIgceWithId);
      const result = await igceRepo.create(aIgce);
      expect(result).to.eql(aIgceWithId);
      sinon.assert.calledWith(create, aIgce);
    });
  });

  describe('findIgceById', () => {
    it('returns a igce if it exists', async () => {
      findById.resolves(aIgceWithId);
      expect(await igceRepo.findById(aIgceWithId.id as string)).to.eql(
        aIgceWithId,
      );
      sinon.assert.calledWith(findById, aIgceWithId.id);
    });
  });

  describe('findIgces', () => {
    it('returns multiple igces if they exist', async () => {
      find.resolves(aListOfIgces);
      expect(await igceRepo.find({})).to.eql(aListOfIgces);
      sinon.assert.called(find);
    });

    it('returns empty list if no igces exist', async () => {
      const expected: Igce[] = [];
      find.resolves(expected);
      expect(await igceRepo.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
        expected,
      );
      sinon.assert.called(find);
    });

    it('uses the provided filter', async () => {
    const filter: Filter<Igce> = {where: {id: 'do a thing'}};
      find.resolves(aListOfIgces);
      await igceRepo.find(filter);
      sinon.assert.calledWith(find, filter);
    });
  });

  describe('replaceIgce', () => {
    it('successfully replaces existing items', async () => {
      replaceById.resolves();
      await igceRepo.replaceById(aIgceWithId.id as string, aChangedIgce);
      sinon.assert.calledWith(replaceById, aIgceWithId.id, aChangedIgce);
    });
  });

  describe('updateIgce', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await igceRepo.updateById(aIgceWithId.id as string, aChangedIgce);
      sinon.assert.calledWith(updateById, aIgceWithId.id, aChangedIgce);
    });
  });

  describe('deleteById()', () => {
    it('successfully deletes existing items', async () => {
      deleteById.resolves();
      await igceRepo.deleteById(aIgceWithId.id as string);
      sinon.assert.calledWith(deleteById, aIgceWithId.id);
    });
  });

  describe('count()', () => {
    it('returns the number of existing igceLists', async () => {
      count.resolves(aListOfIgces.length);
      expect(await igceRepo.count()).to.eql(aListOfIgces.length);
      sinon.assert.called(count);
    });
  });

  describe('updateAll()', () => {
    it('returns a number of igces updated', async () => {
      updateAll.resolves([aListOfIgces].length);
      const where = {id: aIgceWithId.id};
      expect(await igceRepo.updateAll(aChangedIgce, where)).to.eql(1);
      sinon.assert.calledWith(updateAll, aChangedIgce, where);
    });
  });

  function resetRepositories() {
    igceRepo = createStubInstance(IgceRepository);
    aIgce = givenIgce();
    aIgceWithId = givenIgce({
      id: '6364hfhfhfgr1',
    });
    aListOfIgces = [
      aIgceWithId,
      givenIgce({
        id: '77r74ygrfhfhr',
      }),
    ] as Igce[];
    aChangedIgce = givenIgce({
      id: aIgceWithId.id,
    });

  }
});
