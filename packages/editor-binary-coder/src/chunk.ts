export class Chunk<T> {
  private content: any;

  constructor() {
    this.content = '';
  }

  getContent(): T {
    return this.content;
  }

  setContent(value: T): Chunk<T> {
    this.content = value;
    return this;
  }

  toBuffer(endian: 'BE' | 'LE' = 'BE'): Buffer {
    let _content = this.content;
    if (typeof this.content !== 'string') {
      _content = JSON.stringify(_content);
    }

    const tmp = Buffer.from(_content);
    const l = tmp.length;

    const chunk = Buffer.alloc(8 + tmp.length);
    tmp.copy(chunk, 8, 0);

    if (endian === 'BE') {
      chunk.writeBigInt64BE(BigInt(l), 0);
    } else {
      chunk.writeBigInt64LE(BigInt(l), 0);
    }

    return chunk;
  }
}
