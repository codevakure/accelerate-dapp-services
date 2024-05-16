import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SowDsDataSource} from '../datasources';
import {Sow, SowRelations} from '../models';

export class SowRepository extends DefaultCrudRepository<
  Sow,
  typeof Sow.prototype.id,
  SowRelations

  > {
  constructor(
    @inject('datasources.sowDs') dataSource: SowDsDataSource,
  ) {
    super(Sow, dataSource);
  }
}
