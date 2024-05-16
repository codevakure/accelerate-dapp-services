import {DefaultCrudRepository} from '@loopback/repository';
import {Security, SecurityRelations} from '../models';
import {SecurityDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SecurityRepository extends DefaultCrudRepository<
  Security,
  typeof Security.prototype.id,
  SecurityRelations
> {
  constructor(
    @inject('datasources.security') dataSource: SecurityDataSource,
  ) {
    super(Security, dataSource);
  }
}
