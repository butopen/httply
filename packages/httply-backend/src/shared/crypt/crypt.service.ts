import { Injectable } from '@nestjs/common';
import Hashids from './hash-id.function';

const sha512 = require('js-sha512');

/**
 * Provide hashing of passwords using SHA 512
 *
 * You can pass a secret to be used in the constructor or directly on the method
 *
 *
 * @example
 *
 * // returns the hashed password
 * const hash = cryptService.hash("my-pwd")
 *
 * cryptService.check("my-pwd", hash) //true
 *
 */
@Injectable()
export class CryptService {
  private hashid: Hashids;
  private secret = '';

  constructor() {
    this.hashid = new Hashids(this.secret, 6, 'abcdefghijklmnopqrstuvwxyz');
  }

  setSecret(s: string) {
    this.secret = s;
    this.hashid = new Hashids(this.secret, 6, 'abcdefghijklmnopqrstuvwxyz');
  }

  /**
   * Encodes a number to string. Ex. to hide the id of users
   * @param input
   */
  encode(input: number): string {//changes
    return this.hashid.encode(input);
  }

  /**
   * Decodes an encoded string back to its number. Ex. to hide the id of users
   * @param input
   */
  decode(input: string): number {
    return this.hashid.decode(input)[0] as number;
  }

  /**
   *
   * @param rawPassword
   * @param secret (optional)
   *
   * @example
   *
   * // returns the hashed password
   * const hash = cryptService.hash("my-pwd")
   */
  hash(rawPassword: string, secret: string = ''): string {//chan ges
    const s = secret || this.secret;
    return sha512(rawPassword + s);
  }

  /**
   *
   * @param rawPassword
   * @param hash
   * @param secret (optional)
   *
   * @example
   * cryptService.check("my-pwd", hash) //returns true if hashes match
   */
  check(rawPassword: string, hash, secret: string = ''): boolean {
    const s = secret || this.secret;
    return sha512(rawPassword + s) == hash;
  }
}
