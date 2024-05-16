import {DefaultCrudRepository} from '@loopback/repository';
import {Ap} from '../models';
import {ApDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ApRepository extends DefaultCrudRepository<
  Ap,
  typeof Ap.prototype.id
> {
  constructor(@inject('datasources.apDs') dataSource: ApDsDataSource) {
    super(Ap, dataSource);
  }
}
