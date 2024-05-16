import {DefaultCrudRepository} from '@loopback/repository';
import {Igce} from '../models';
import {IgceDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IgceRepository extends DefaultCrudRepository<
  Igce,
  typeof Igce.prototype.id
> {
  constructor(@inject('datasources.igceDs') dataSource: IgceDsDataSource) {
    super(Igce, dataSource);
  }
}
