import {DefaultCrudRepository} from '@loopback/repository';
import {Compatibility, CompatibilityRelations} from '../models';
import {CompatibilityDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CompatibilityRepository extends DefaultCrudRepository<
  Compatibility,
  typeof Compatibility.prototype.id,
  CompatibilityRelations
> {
  constructor(
    @inject('datasources.compatibility') dataSource: CompatibilityDataSource,
  ) {
    super(Compatibility, dataSource);
  }
}
