import {Clauses} from '../models';

/**
 * Generate a complete Clauses object for use with tests.
 * @param clauses A partial (or complete) Clauses object.
 */
export function givenClauses(clauses?: Partial<Clauses>) {
  const data = Object.assign(
    {
      title: 'do a thing',
      prescription: 'There are some things that need doing',
    },
    clauses,
  );
  return new Clauses(data);
}
