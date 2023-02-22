import { createWriteStream, rmSync } from 'fs';
import { Chunk } from './chunk';

describe('Chunk', () => {
  let chunk: Chunk<Record<string, any>>;

  beforeEach(() => {
    chunk = new Chunk();
    chunk.setContent({ message: 'this is a message!' });
  });

  describe('write', () => {
    it('should write data to a file', () => {
      const binaryfile = './chunk.bin';
      const writer = createWriteStream(binaryfile);

      const buffer = chunk.toBuffer();
      writer.write(buffer);
      writer.end();

      rmSync(binaryfile);
    });
  });
});
