import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { TradeoffsController } from '../../../controllers';
import { TradeoffsRepository } from '../../../repositories';
import { Tradeoffs } from '../../../models/tradeoffs.model';


describe('TradeoffsController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<TradeoffsRepository>;
  let tradeoffs: StubbedInstanceWithSinonAccessor<Tradeoffs>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new TradeoffsController(repository);
      const testObj = new Tradeoffs();
      testObj.id = '123';
      testObj.igceDescription = 'test_description';
        repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });



  describe('updatebyid', () => {
    it('update by id ', async () => {
      const controller = new TradeoffsController(repository);
      const testObj = new Tradeoffs();
      testObj.id = '123';
      testObj.igceDescription = 'test_description';
      repository.stubs.updateById.resolves();
      const result = await controller.updateById('123', testObj);
      expect(result).to.undefined;

    });
  });





  function givenStubbedRepository() {
    repository = createStubInstance(TradeoffsRepository);
  }

});


