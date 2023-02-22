import type { WriteStream } from 'fs';
export class Writer {
  writer: WriteStream;

  constructor(writer: WriteStream) {
    this.writer = writer;
  }

  setMagicNumber(magic: number): Writer {
    const buffer = Buffer.allocUnsafe(4);

    buffer.writeInt32BE(magic);
    this.writer.write(buffer);

    return this;
  }

  setVersion(major: number, minor: number, revision: number): Writer {
    const buffer = Buffer.allocUnsafe(3);

    buffer.writeInt8(major);
    buffer.writeInt8(minor);
    buffer.writeInt8(revision);

    this.writer.write(buffer);

    return this;
  }

  setChecksum(size: number): Writer {
    const buffer = Buffer.allocUnsafe(8);
    buffer.writeBigInt64BE(BigInt(size));

    return this;
  }

  setMetadata(metadata: Record<string, any>): Writer {
    const content = JSON.stringify(metadata);
    const c = Buffer.from(content, 'base64');
    const length = c.length;

    const s = Buffer.allocUnsafe(8);
    s.writeBigInt64BE(BigInt(length));

    const chunk = Buffer.allocUnsafe(8 + length);
    s.copy(chunk, 0, 0);
    c.copy(chunk, 8, 0);

    this.writer.write(chunk);

    return this;
  }
}
