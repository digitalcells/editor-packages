import type { ReadStream } from 'fs';

export class Reader {
  reader: ReadStream;

  constructor(reader: ReadStream) {
    this.reader = reader;
  }

  getMagicNumber(): number {
    return 0;
  }

  getVersion(): string {
    return '';
  }
}
