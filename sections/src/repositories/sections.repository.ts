import {DefaultCrudRepository} from '@loopback/repository';
import {Sections} from '../models';
import {SectionsDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SectionsRepository extends DefaultCrudRepository<
  Sections,
  typeof Sections.prototype.id
> {
  constructor(
    @inject('datasources.sectionsDs') dataSource: SectionsDsDataSource,
  ) {
    super(Sections, dataSource);
  }
}
