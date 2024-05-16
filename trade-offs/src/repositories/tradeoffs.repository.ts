import {DefaultCrudRepository} from '@loopback/repository';
import {Tradeoffs, TradeoffsRelations} from '../models';
import {TradeoffsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TradeoffsRepository extends DefaultCrudRepository<
  Tradeoffs,
  typeof Tradeoffs.prototype.id,
  TradeoffsRelations
> {
  constructor(
    @inject('datasources.tradeoffs') dataSource: TradeoffsDataSource,
  ) {
    super(Tradeoffs, dataSource);
  }
}
