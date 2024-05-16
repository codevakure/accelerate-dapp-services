//import {aLocation, givenSow} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {Sow} from '../../../models';
import {SowRepository} from '../../../repositories';
import {SowController} from '../../../controllers';
import {givenSow} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('SowController (unit)', () => {
  let sowRepo: StubbedInstanceWithSinonAccessor<SowRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let controller: SowController;
  let aSow: Sow;
  let aSowWithId: Sow;
  let aChangedSow: Sow;
  let aListOfSows: Sow[];

  beforeEach(resetRepositories);
  describe('createSow', () => {
    it('creates a Sow', async () => {
      create.resolves(aSowWithId);
      const result = await controller.create(aSow);
      expect(result).to.eql(aSowWithId);
      sinon.assert.calledWith(create, aSow);
    });
  });

  describe('findSowById', () => {
    it('returns a sow if it exists', async () => {
      findById.resolves(aSowWithId);
      expect(await controller.findById(aSowWithId.id as string)).to.eql(
        aSowWithId,
      );
      sinon.assert.calledWith(findById, aSowWithId.id);
    });
  });

  describe('findSows', () => {
    // it('returns multiple sows if they exist', async () => {
    //   find.resolves(aListOfSows);
    //   expect(await controller.find({})).to.eql(aListOfSows);
    //   sinon.assert.called(find);
    // });

    // it('returns empty list if no sows exist', async () => {
    //   const expected: Sow[] = [];
    //   find.resolves(expected);
    //   expect(await controller.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
    //     expected,
    //   );
    //   sinon.assert.called(find);
    // });

    // it('uses the provided filter', async () => {
    // const filter: Filter<Sow> = {where: {performanceWorkStatement: 'do a thing'}};
    //   find.resolves(aListOfSows);
    //   await controller.find(filter);
    //   sinon.assert.calledWith(find, filter);
    // });
  });


  describe('updateSow', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(aSowWithId.id as string, aChangedSow);
      sinon.assert.calledWith(updateById, aSowWithId.id, aChangedSow);
    });
  });







  function resetRepositories() {
    sowRepo = createStubInstance(SowRepository);
    aSow = givenSow();
    aSowWithId = givenSow({
      id: '6364hfhfhfgr1',
    });
    aListOfSows = [
      aSowWithId,
      givenSow({
        id: '77r74ygrfhfhr',
       // performanceWorkStatement: 'so many things to do',
      }),
    ] as Sow[];
    aChangedSow = givenSow({
      id: aSowWithId.id,
      //performanceWorkStatement: 'Do some important things',
    });

    controller = new SowController(sowRepo);
  }
});
