import * as bycrpt from 'bcrypt';

const toHash = async (value: string): Promise<string> =>
  await bycrpt.hash(value, 10);

const toCompare = async (data: string | Buffer, encrypted: string) =>
  await bycrpt.compare(data, encrypted);

export { toHash, toCompare };
