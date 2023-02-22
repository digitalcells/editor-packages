import { Writer } from './writer';
import * as fs from 'fs';

describe('writer', () => {
  it('instance', () => {
    const MAGIC_NUMBER = 0x6C9E1F7D;

    const writer = new Writer(fs.createWriteStream('./test.bin'));
    writer
      .setMagicNumber(MAGIC_NUMBER)
      .setVersion(0, 0, 1)
      .setMetadata({ message: 'this is a message!' })
  });
})
