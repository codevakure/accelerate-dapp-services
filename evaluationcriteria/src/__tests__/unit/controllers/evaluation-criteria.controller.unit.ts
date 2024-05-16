//import {aLocation, givenEvaluationCriteria} from '../../helpers';

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {EvaluationCriteria} from '../../../models';
import {EvaluationCriteriaRepository} from '../../../repositories';
import {EvaluationCriteriaController} from '../../../controllers';
import {givenEvaluationCriteria} from '../../helpers';
import {Filter} from '@loopback/repository';

describe('EvaluationCriteriaController (unit)', () => {
  let evaluationCriteriaRepo: StubbedInstanceWithSinonAccessor<
    EvaluationCriteriaRepository
  >;
  let create: sinon.SinonStub;
  let count: sinon.SinonStub;
  let updateAll: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  let controller: EvaluationCriteriaController;
  let aEvaluationCriteria: EvaluationCriteria;
  let aEvaluationCriteriaWithId: EvaluationCriteria;
  let aChangedEvaluationCriteria: EvaluationCriteria;
  let aListOfEvaluationCriterias: EvaluationCriteria[];

  beforeEach(resetRepositories);
  describe('createEvaluationCriteria', () => {
    it('creates a EvaluationCriteria', async () => {
      create.resolves(aEvaluationCriteriaWithId);
      const result = await controller.create(aEvaluationCriteria);
      expect(result).to.eql(aEvaluationCriteriaWithId);
      sinon.assert.calledWith(create, aEvaluationCriteria);
    });
  });

  describe('findEvaluationCriteriaById', () => {
    it('returns a evaluationCriteria if it exists', async () => {
      findById.resolves(aEvaluationCriteriaWithId);
      expect(
        await controller.findById(aEvaluationCriteriaWithId.id as string),
      ).to.eql(aEvaluationCriteriaWithId);
      sinon.assert.calledWith(findById, aEvaluationCriteriaWithId.id);
    });
  });

  describe('findEvaluationCriterias', () => {
    // it('returns multiple evaluationCriterias if they exist', async () => {
    //   find.resolves(aListOfEvaluationCriterias);
    //   expect(await controller.find({})).to.eql(aListOfEvaluationCriterias);
    //   sinon.assert.called(find);
    // });

    // it('returns empty list if no evaluationCriterias exist', async () => {
    //   const expected: EvaluationCriteria[] = [];
    //   find.resolves(expected);
    //   expect(await controller.find({where: {id: 'hgfhjfghjfjs'}})).to.eql(
    //     expected,
    //   );
    //   sinon.assert.called(find);
    // });

    // it('uses the provided filter', async () => {
    // const filter: Filter<EvaluationCriteria> = {where: {description: 'do a thing'}};
    //   find.resolves(aListOfEvaluationCriterias);
    //   await controller.find(filter);
    //   sinon.assert.calledWith(find, filter);
    // });
  });



  describe('updateEvaluationCriteria', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(
        aEvaluationCriteriaWithId.id as string,
        aChangedEvaluationCriteria,
      );
      sinon.assert.calledWith(
        updateById,
        aEvaluationCriteriaWithId.id,
        aChangedEvaluationCriteria,
      );
    });
  });





  function resetRepositories() {
    evaluationCriteriaRepo = createStubInstance(EvaluationCriteriaRepository);
    aEvaluationCriteria = givenEvaluationCriteria();
    aEvaluationCriteriaWithId = givenEvaluationCriteria({
      id: '6364hfhfhfgr1',
    });
    aListOfEvaluationCriterias = [
      aEvaluationCriteriaWithId,
      givenEvaluationCriteria({
        id: '77r74ygrfhfhr',
       // description: 'so many things to do',
      }),
    ] as EvaluationCriteria[];
    aChangedEvaluationCriteria = givenEvaluationCriteria({
      id: aEvaluationCriteriaWithId.id,
     // description: 'Do some important things',
    });

    controller = new EvaluationCriteriaController(evaluationCriteriaRepo);
  }
});
