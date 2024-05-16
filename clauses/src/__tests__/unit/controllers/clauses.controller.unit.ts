//import {aLocation, givenClauses} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {Clauses} from '../../../models';
import {ClausesRepository} from '../../../repositories';
import {ClausesController} from '../../../controllers';
import {givenClauses} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('ClausesController (unit)', () => {
  let clausesRepo: StubbedInstanceWithSinonAccessor<ClausesRepository>;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let controller: ClausesController;
  let aClauses: Clauses;
  let aClausesWithId: Clauses;
  let aChangedClauses: Clauses;
  let aListOfClausess: Clauses[];

  beforeEach(resetRepositories);
  describe('createClauses', () => {
    it('creates a Clauses', async () => {
      create.resolves(aClausesWithId);
      const result = await controller.create(aClauses);
      expect(result).to.eql(aClausesWithId);
      sinon.assert.calledWith(create, aClauses);
    });
  });

  // describe('findClausesById', () => {
  //   it('returns a clauses if it exists', async () => {
  //     findById.resolves(aClausesWithId);
  //     expect(await controller.findById(aClausesWithId.id as string)).to.eql(
  //       aClausesWithId,
  //     );
  //     sinon.assert.calledWith(findById, aClausesWithId.id);
  //   });
  // });

  describe('findClausess', () => {
    // it('returns multiple clausess if they exist', async () => {
    //   find.resolves(aListOfClausess);
    //   expect(await controller.find({})).to.eql(aListOfClausess);
    //   sinon.assert.called(find);
    // });

    // it('returns empty list if no clausess exist', async () => {
    //   const expected: Clauses[] = [];
    //   find.resolves(expected);
    //   expect(await controller.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
    //     expected,
    //   );
    //   sinon.assert.called(find);
    // });

    // it('uses the provided filter', async () => {
    // const filter: Filter<Clauses> = {where: {title: 'do a thing'}};
    //   find.resolves(aListOfClausess);
    //   await controller.find(filter);
    //   sinon.assert.calledWith(find, filter);
    // });
  });

  // describe('replaceClauses', () => {
  //   it('successfully replaces existing items', async () => {
  //     replaceById.resolves();
  //     await controller.replaceById(
  //       aClausesWithId.id as string,
  //       aChangedClauses,
  //     );
  //     sinon.assert.calledWith(replaceById, aClausesWithId.id, aChangedClauses);
  //   });
  // });

  describe('updateClauses', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(aClausesWithId.id as string, aChangedClauses);
      sinon.assert.calledWith(updateById, aClausesWithId.id, aChangedClauses);
    });
  });

  // describe('deleteById()', () => {
  //   it('successfully deletes existing items', async () => {
  //     deleteById.resolves();
  //     await controller.deleteById(aClausesWithId.id as string);
  //     sinon.assert.calledWith(deleteById, aClausesWithId.id);
  //   });
  // });

  // describe('count()', () => {
  //   it('returns the number of existing clausesLists', async () => {
  //     count.resolves(aListOfClausess.length);
  //     expect(await controller.count()).to.eql(aListOfClausess.length);
  //     sinon.assert.called(count);
  //   });
  // });

  // describe('updateAll()', () => {
  //   it('returns a number of clausess updated', async () => {
  //     updateAll.resolves([aListOfClausess].length);
  //     const where = {title: aClausesWithId.title};
  //     expect(await controller.updateAll(aChangedClauses, where)).to.eql(1);
  //     sinon.assert.calledWith(updateAll, aChangedClauses, where);
  //   });
  // });

  function resetRepositories() {
    clausesRepo = createStubInstance(ClausesRepository);
    aClauses = givenClauses();
    aClausesWithId = givenClauses({
      id: '6364hfhfhfgr1',
    });
    aListOfClausess = [
      aClausesWithId,
      givenClauses({
        id: '77r74ygrfhfhr',
        title: 'so many things to do',
      }),
    ] as Clauses[];
    aChangedClauses = givenClauses({
      id: aClausesWithId.id,
      title: 'Do some important things',
    });

    controller = new ClausesController(clausesRepo);
  }
});
