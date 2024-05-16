import {DefaultCrudRepository} from '@loopback/repository';
import {Clauses} from '../models';
import {ClausesDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClausesRepository extends DefaultCrudRepository<
  Clauses,
  typeof Clauses.prototype.id
> {
  constructor(
    @inject('datasources.clausesDs') dataSource: ClausesDsDataSource,
  ) {
    super(Clauses, dataSource);
  }
}
