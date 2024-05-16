import {DefaultCrudRepository} from '@loopback/repository';
import {Requisition, RequisitionRelations} from '../models';
import {RequisitionDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RequisitionRepository extends DefaultCrudRepository<
  Requisition,
  typeof Requisition.prototype.id,
  RequisitionRelations
> {
  constructor(
    @inject('datasources.requisition') dataSource: RequisitionDataSource,
  ) {
    super(Requisition, dataSource);
  }
}
