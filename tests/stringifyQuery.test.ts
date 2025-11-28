// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Arcade } from '@arcadeai/arcadejs';

const { stringifyQuery } = Arcade.prototype as any;

describe(stringifyQuery, () => {
  for (const [input, expected] of [
    [{ a: '1', b: 2, c: true }, 'a=1&b=2&c=true'],
    [{ a: null, b: false, c: undefined }, 'a=&b=false'],
    [{ 'a/b': 1.28341 }, `${encodeURIComponent('a/b')}=1.28341`],
    [
      { 'a/b': 'c/d', 'e=f': 'g&h' },
      `${encodeURIComponent('a/b')}=${encodeURIComponent('c/d')}&${encodeURIComponent(
        'e=f',
      )}=${encodeURIComponent('g&h')}`,
    ],
    // Test nested objects (issue #148)
    [{ user: { id: 'user123' } }, 'user%5Bid%5D=user123'],
    [{ provider: { id: 'provider456' } }, 'provider%5Bid%5D=provider456'],
    [{ user: { id: 'user123' }, provider: { id: 'provider456' } }, 'user%5Bid%5D=user123&provider%5Bid%5D=provider456'],
    [{ limit: 10, offset: 0, user: { id: 'user123' } }, 'limit=10&offset=0&user%5Bid%5D=user123'],
    // Test deeply nested objects
    [{ filter: { user: { id: 'user123' } } }, 'filter%5Buser%5D%5Bid%5D=user123'],
    // Test nested objects with multiple properties
    [{ user: { id: 'user123', name: 'John' } }, 'user%5Bid%5D=user123&user%5Bname%5D=John'],
  ]) {
    it(`${JSON.stringify(input)} -> ${expected}`, () => {
      expect(stringifyQuery(input)).toEqual(expected);
    });
  }
});
