//import {aLocation, givenAp} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { Ap } from '../../../models';
import { ApRepository } from '../../../repositories';
import { ApController } from '../../../controllers';
import { givenAp } from '../../helpers';
import { Filter } from '@loopback/repository';

describe('ApController (unit)', () => {
  let apRepo: StubbedInstanceWithSinonAccessor<ApRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let controller: ApController;
  let aAp: Ap;
  let aApWithId: Ap;
  let aChangedAp: Ap;
  let aListOfAps: Ap[];

  beforeEach(resetRepositories);
  describe('createAp', () => {
    it('creates a Ap', async () => {
      create.resolves(aApWithId);
      const result = await controller.create(aAp);
      expect(result).to.eql(aApWithId);
      sinon.assert.calledWith(create, aAp);
    });
  });

  // describe('findApById', () => {
  //   it('returns a ap if it exists', async () => {
  //     findById.resolves(aApWithId);
  //     expect(await controller.findById(aApWithId.id as string)).to.eql(
  //       aApWithId,
  //     );
  //     sinon.assert.calledWith(findById, aApWithId.id);
  //   });
  // });

  describe('findAps', () => {
    it('returns multiple aps if they exist', async () => {
      find.resolves(aListOfAps);
      expect(await controller.find({})).to.eql(aListOfAps);
      sinon.assert.called(find);
    });

    it('returns empty list if no aps exist', async () => {
      const find = apRepo.stubs.find;
      const expected: Ap[] = [];
      find.resolves(expected);
      expect(await controller.find({ where: { id: 'hgfhjfghjfjs' } })).to.eql(
        expected,
      );
      sinon.assert.called(find);
    });

    it('uses the provided filter', async () => {
      const filter: Filter<Ap> = { where: { projectTitle: 'do a thing' } };
      find.resolves(aListOfAps);
      await controller.find(filter);
      sinon.assert.calledWith(find, filter);
    });
  });

  // describe('replaceAp', () => {
  //   it('successfully replaces existing items', async () => {
  //     replaceById.resolves();
  //     await controller.replaceById(aApWithId.id as string, aChangedAp);
  //     sinon.assert.calledWith(replaceById, aApWithId.id, aChangedAp);
  //   });
  // });

  describe('updateAp', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(aApWithId.id as string, aChangedAp);
      sinon.assert.calledWith(updateById, aApWithId.id, aChangedAp);
    });
  });

  // describe('deleteById()', () => {
  //   it('successfully deletes existing items', async () => {
  //     deleteById.resolves();
  //     await controller.deleteById(aApWithId.id as string);
  //     sinon.assert.calledWith(deleteById, aApWithId.id);
  //   });
  // });

  // describe('count()', () => {
  //   it('returns the number of existing apLists', async () => {
  //     count.resolves(aListOfAps.length);
  //     expect(await controller.count()).to.eql(aListOfAps.length);
  //     sinon.assert.called(count);
  //   });
  // });

  // describe('updateAll()', () => {
  //   it('returns a number of aps updated', async () => {
  //     updateAll.resolves([aListOfAps].length);
  //     const where = {projectTitle: aApWithId.projectTitle};
  //     expect(await controller.updateAll(aChangedAp, where)).to.eql(1);
  //     sinon.assert.calledWith(updateAll, aChangedAp, where);
  //   });
  // });

  function resetRepositories() {
    apRepo = createStubInstance(ApRepository);
    aAp = givenAp();
    aApWithId = givenAp({
      id: '6364hfhfhfgr1',
    });
    aListOfAps = [
      aApWithId,
      givenAp({
        id: '77r74ygrfhfhr',
        projectTitle: 'so many things to do',
      }),
    ] as Ap[];
    aChangedAp = givenAp({
      id: aApWithId.id,
      projectTitle: 'Do some important things',
    });

    controller = new ApController(apRepo);
  }
});
