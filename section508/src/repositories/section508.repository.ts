import {DefaultCrudRepository} from '@loopback/repository';
import {Section508, Section508Relations} from '../models';
import {Section508DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Section508Repository extends DefaultCrudRepository<
  Section508,
  typeof Section508.prototype.id,
  Section508Relations
> {
  constructor(
    @inject('datasources.section508') dataSource: Section508DataSource,
  ) {
    super(Section508, dataSource);
  }
}
