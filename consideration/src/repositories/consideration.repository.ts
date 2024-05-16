import {DefaultCrudRepository} from '@loopback/repository';
import {Consideration, ConsiderationRelations} from '../models';
import {ConsiderationDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConsiderationRepository extends DefaultCrudRepository<
  Consideration,
  typeof Consideration.prototype.id,
  ConsiderationRelations
> {
  constructor(
    @inject('datasources.consideration') dataSource: ConsiderationDataSource,
  ) {
    super(Consideration, dataSource);
  }
}
