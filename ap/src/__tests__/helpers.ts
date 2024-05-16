import {Ap} from '../models';

/**
 * Generate a complete Ap object for use with tests.
 * @param ap A partial (or complete) Ap object.
 */
export function givenAp(ap?: Partial<Ap>) {
  const data = Object.assign(
    {
      projectTitle: 'do a thing',
      description: 'There are some things that need doing',
    },
    ap,
  );
  return new Ap(data);
}
