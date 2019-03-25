import { Image, BitDepth, ImageKind } from '../Image';

describe('create new images', () => {
  it('should create a 8-bit image', () => {
    const img = new Image(10, 20);
    expect(img).toMatchObject({
      width: 10,
      height: 20,
      size: 200,
      bitDepth: BitDepth.UINT8,
      kind: ImageKind.RGB,
      components: 3,
      channels: 3,
      alpha: false,
      maxValue: 255
    });
  });

  it('should create a 16-bit image', () => {
    const img = new Image(10, 20, { bitDepth: BitDepth.UINT16 });
    expect(img).toMatchObject({
      width: 10,
      height: 20,
      size: 200,
      bitDepth: BitDepth.UINT16,
      kind: ImageKind.RGB,
      components: 3,
      channels: 3,
      alpha: false,
      maxValue: 65535
    });
  });

  it('should create a 32-bit image', () => {
    const img = new Image(10, 20, { bitDepth: BitDepth.FLOAT32 });
    expect(img).toMatchObject({
      width: 10,
      height: 20,
      size: 200,
      bitDepth: BitDepth.FLOAT32,
      kind: ImageKind.RGB,
      components: 3,
      channels: 3,
      alpha: false,
      maxValue: 1
    });
  });

  it('should create a grey image with alpha', () => {
    const img = new Image(10, 20, { kind: ImageKind.GREYA });
    expect(img).toMatchObject({
      bitDepth: BitDepth.UINT8,
      kind: ImageKind.GREYA,
      components: 1,
      channels: 2,
      alpha: true
    });
  });

  it('should create from existing data array', () => {
    const data = Uint8Array.of(0, 1, 2, 3, 4, 5);
    const img = new Image(3, 2, { data, kind: ImageKind.GREY });
    expect(img.getValue(1, 0, 0)).toBe(3);
  });

  it('should throw on wrong width', () => {
    expect(() => new Image(0, 1)).toThrowError(
      /width must be an integer and at least 1. Received 0./
    );
    expect(() => new Image(0.5, 1)).toThrowError(
      /width must be an integer and at least 1. Received 0.5./
    );
  });

  it('should throw on wrong height', () => {
    expect(() => new Image(1, 0)).toThrowError(
      /height must be an integer and at least 1. Received 0./
    );
    expect(() => new Image(1, 0.5)).toThrowError(
      /height must be an integer and at least 1. Received 0.5./
    );
  });

  it('should throw on wrong data size', () => {
    const data = new Uint16Array(2);
    expect(
      () => new Image(2, 2, { data, bitDepth: BitDepth.UINT16 })
    ).toThrowError(/incorrect data size: 2. Expected 12./);
  });

  it('should throw on wrong bit depth', () => {
    expect(() => new Image(1, 1, { bitDepth: 20 })).toThrowError(
      /unexpected bit depth: 20/
    );
  });
});

describe('get and set pixels', () => {
  it('should get and set', () => {
    const img = new Image(10, 20);
    expect(img.get(15, 5)).toStrictEqual([0, 0, 0]);
    img.set(15, 5, [1, 3, 5]);
    expect(img.get(15, 5)).toStrictEqual([1, 3, 5]);
  });

  it('should getValue and setValue', () => {
    const img = new Image(10, 20);
    expect(img.getValue(15, 5, 0)).toBe(0);
    img.setValue(15, 5, 0, 50);
    expect(img.getValue(15, 5, 0)).toBe(50);
  });
});
