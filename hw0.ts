abstract class Animal {
  constructor(public name: string) {}
  abstract speak(): void;
}

abstract class Mammal extends Animal {}

class Dog extends Mammal {
  speak() {
    console.log(`${this.name} says: Woof!`);
  }
}

class Cat extends Mammal {
  speak() {
    console.log(`${this.name} says: Meow!`);
  }
}

class Horse extends Mammal {
  speak() {
    console.log(`${this.name} says: Neigh!`);
  }
}

abstract class Bird extends Animal {}

class Eagle extends Bird {
  speak() {
    console.log(`${this.name} screeches`);
  }
}

class Penguin extends Bird {
  speak() {
    console.log(`${this.name} honks`);
  }
}

abstract class Reptile extends Animal {}

class Snake extends Reptile {
  speak() {
    console.log(`${this.name} hisses`);
  }
}

class Turtle extends Reptile {
  speak() {
    console.log(`${this.name} is quiet`);
  }
}
