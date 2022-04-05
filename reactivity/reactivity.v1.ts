export {};

const storage: any = [];
let price: number = 10;
let quantity: number = 1;
let total: number = 0;

const target = (): void => { total = price * quantity };

const record = (): void => {
  storage.push(target);
};

const replay = (): void => {
  storage.forEach((fn: any) => fn());
};

target();
record();

console.log('total:', total);

quantity = 2;

console.log('total:', total);

replay();

console.log('total:', total);
