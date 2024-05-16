import {Sections} from '../models';

/**
 * Generate a complete Sections object for use with tests.
 * @param sections A partial (or complete) Sections object.
 */
export function givenSections(sections?: Partial<Sections>) {
  const data = Object.assign(
    {
      formid: 'do a thing',
      Section: 'There are some things that need doing',
    },
    sections,
  );
  return new Sections(data);
}
