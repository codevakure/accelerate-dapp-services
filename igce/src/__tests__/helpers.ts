import {Igce} from '../models';

/**
 * Generate a complete Igce object for use with tests.
 * @param igce A partial (or complete) Igce object.
 */
export function givenIgce(igce?: Partial<Igce>) {
  const data = Object.assign({}, igce);
  return new Igce(data);
}
