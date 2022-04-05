class Dep {
  private subscribers: Array<any>;

  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach((fn: any) => fn());
  }
}

const data: any = {
  price: 10,
  quantity: 1,
}

let total: number = 0;
let discount: number = 0;
let target: any = null;

Object.keys(data).forEach((property: string) => {
  const dep = new Dep();
  let initialValue = data[property];

  Object.defineProperty(data, property, {
    get() {
      dep.depend();

      return initialValue;
    },
    set(newVal) {
      initialValue = newVal;

      dep.notify();
    }
  });
})


const watcher = (fn: any): void => {
  target = fn;
  target();
  target = null;
};

const computed: any = {
  calculateTotal: () => {
    total = data.price * data.quantity;
  },
  discountFn: () => {
    discount = data.quantity - 20;
  }
};

Object.keys(computed).forEach((fn: any) => {
  watcher(computed[fn]);
});

// .load reactivity/reactivity.v2.ts
