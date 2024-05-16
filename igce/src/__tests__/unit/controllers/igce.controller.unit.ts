//import {aLocation, givenIgce} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {Igce} from '../../../models';
import {IgceRepository} from '../../../repositories';
import {IgceController} from '../../../controllers';
import {givenIgce} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('IgceController (unit)', () => {
  let igceRepo: StubbedInstanceWithSinonAccessor<IgceRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let controller: IgceController;
  let aIgce: Igce;
  let aIgceWithId: Igce;
  let aChangedIgce: Igce;
  let aListOfIgces: Igce[];

  beforeEach(resetRepositories);
  describe('createIgce', () => {
    it('creates a Igce', async () => {
      create.resolves(aIgceWithId);
      const result = await controller.create(aIgce);
      expect(result).to.eql(aIgceWithId);
      sinon.assert.calledWith(create, aIgce);
    });
  });

  describe('findIgceById', () => {
    it('returns a igce if it exists', async () => {
      findById.resolves(aIgceWithId);
      expect(await controller.findById(aIgceWithId.id as string)).to.eql(
        aIgceWithId,
      );
      sinon.assert.calledWith(findById, aIgceWithId.id);
    });
  });

  describe('findIgces', () => {
    // it('returns multiple igces if they exist', async () => {
    //   find.resolves(aListOfIgces);
    //   expect(await controller.find({})).to.eql(aListOfIgces);
    //   sinon.assert.called(find);
    // });

    // it('returns empty list if no igces exist', async () => {
    //   const expected: Igce[] = [];
    //   find.resolves(expected);
    //   expect(await controller.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
    //     expected,
    //   );
    //   sinon.assert.called(find);
    // });

    // it('uses the provided filter', async () => {
    // const filter: Filter<Igce> = {where: {id: 'do a thing'}};
    //   find.resolves(aListOfIgces);
    //   await controller.find(filter);
    //   sinon.assert.calledWith(find, filter);
    // });
  });


  describe('updateIgce', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(aIgceWithId.id as string, aChangedIgce);
      sinon.assert.calledWith(updateById, aIgceWithId.id, aChangedIgce);
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

    controller = new IgceController(igceRepo);
  }
});
