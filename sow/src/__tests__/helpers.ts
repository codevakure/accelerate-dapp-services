import {Sow} from '../models';

/**
 * Generate a complete Sow object for use with tests.
 * @param sow A partial (or complete) Sow object.
 */
export function givenSow(sow?: Partial<Sow>) {
  const data = Object.assign(
    {
      performanceWorkStatement: 'do a thing',
      backgroundStatement: 'There are some things that need doing',
    },
    sow,
  );
  return new Sow(data);
}
