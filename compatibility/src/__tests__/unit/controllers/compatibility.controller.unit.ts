import { Filter } from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { CompatibilityController } from '../../../controllers';
import { CompatibilityRepository } from '../../../repositories';
import { Compatibility } from '../../../models/compatibility.model';


describe('CompatibilityController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<CompatibilityRepository>;
  let tradeoffs: StubbedInstanceWithSinonAccessor<Compatibility>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new CompatibilityController(repository);
      const testObj = new Compatibility();
      testObj.id = '123';
      testObj.description = 'test_description';
        repository.stubs.findById.resolves(testObj);

      // const result = await controller.findById('123');
     // expect(result).to.containEql(testObj);

    });

  });



  describe('updatebyid', () => {
    it('update by id ', async () => {
      const controller = new CompatibilityController(repository);
      const testObj = new Compatibility();
      testObj.id = '123';
      testObj.description = 'test_description';
      repository.stubs.updateById.resolves();
      const result = await controller.updateById('123', testObj);
      expect(result).to.undefined;

    });
  });





  function givenStubbedRepository() {
    repository = createStubInstance(CompatibilityRepository);
  }

});


