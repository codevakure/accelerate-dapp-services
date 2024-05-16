import { DefaultCrudRepository } from '@loopback/repository';
import { Dapp, DappRelations } from '../models';
import { DappDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class DappRepository extends DefaultCrudRepository<
  Dapp,
  typeof Dapp.prototype.ap_no,
  DappRelations
  > {
  constructor(
    @inject('datasources.dapp') dataSource: DappDataSource,
  ) {
    super(Dapp, dataSource);
  }

}
