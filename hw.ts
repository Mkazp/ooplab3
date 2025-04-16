abstract class GameObject {
  constructor(public x: number, public y: number, public name: string) {}

  abstract update(): void;

  toString(): string {
    return `${this.name} at (${this.x}, ${this.y})`;
  }
}

abstract class Movable {
  abstract move(dx: number, dy: number): void;
}

class Character extends GameObject implements Movable {
  health: number;

  constructor(x: number, y: number, name: string, health: number) {
    super(x, y, name);
    this.health = health;
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
    console.log(`${this.name} moved to (${this.x}, ${this.y})`);
  }

  update(): void {
    console.log(`${this.name} updated, health: ${this.health}`);
  }

  isAlive(): boolean {
    return this.health > 0;
  }
}

class Player extends Character {
  score: number;

  constructor(
    x: number,
    y: number,
    name: string,
    health: number,
    score: number = 0
  ) {
    super(x, y, name, health);
    this.score = score;
  }

  update(): void {
    super.update();
    console.log(`Player score: ${this.score}`);
  }

  collectItem(item: Item): void {
    this.score += item.value;
    console.log(`Collected ${item.name}, score: ${this.score}`);
  }
}

class Enemy extends Character {
  damage: number;

  constructor(
    x: number,
    y: number,
    name: string,
    health: number,
    damage: number
  ) {
    super(x, y, name, health);
    this.damage = damage;
  }

  update(): void {
    super.update();
    console.log(`Enemy ready to attack with damage: ${this.damage}`);
  }

  attack(target: Player): void {
    target.health -= this.damage;
    console.log(
      `${this.name} attacked ${target.name} for ${this.damage} damage`
    );
  }
}

class Item extends GameObject {
  value: number;

  constructor(x: number, y: number, name: string, value: number) {
    super(x, y, name);
    this.value = value;
  }

  update(): void {
    console.log(`Item ${this.name} waiting to be collected`);
  }
}

class Boss extends Enemy {
  private healAmount: number;

  constructor(
    x: number,
    y: number,
    name: string,
    health: number,
    damage: number,
    healAmount: number
  ) {
    super(x, y, name, health, damage);
    this.healAmount = healAmount;
  }

  update(): void {
    super.update();
    console.log(`${this.name} is preparing to use special abilities`);
  }

  specialAttack(target: Player): void {
    const specialDamage = this.damage * 2;
    target.health -= specialDamage;
    console.log(
      `${this.name} used special attack on ${target.name} for ${specialDamage} damage`
    );
  }

  heal(): void {
    this.health += this.healAmount;
    console.log(
      `${this.name} healed for ${this.healAmount}, current health: ${this.health}`
    );
  }

  summonAllies(): Enemy {
    const newEnemy = new Enemy(this.x + 1, this.y + 1, "Minion", 50, 10);
    console.log(`${this.name} summoned an ally: ${newEnemy.name}`);
    return newEnemy;
  }
}

function gameLoop(
  player: Player,
  enemies: Enemy[],
  items: Item[],
  turns: number = 5
): void {
  console.log("\n=== GAME START ===\n");

  for (let turn = 1; turn <= turns; turn++) {
    console.log(`\n--- Turn ${turn} ---`);

    player.update();
    for (const enemy of enemies) {
      enemy.update();
    }
    for (const item of items) {
      item.update();
    }

    for (const enemy of enemies) {
      if (enemy.isAlive()) {
        enemy.attack(player);
      }
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (item.x === player.x && item.y === player.y) {
        player.collectItem(item);
        items.splice(i, 1);
      }
    }

    if (!player.isAlive()) {
      console.log("\nИгрок погиб! Игра окончена.");
      break;
    }

    const dx = Math.floor(Math.random() * 3) - 1;
    const dy = Math.floor(Math.random() * 3) - 1;
    player.move(dx, dy);
  }

  console.log("\n=== GAME END ===");
  console.log(`Final score: ${player.score}`);
  console.log(`Player health: ${player.health}`);
}

const player = new Player(0, 0, "Hero", 100);
const enemies = [
  new Enemy(1, 1, "Goblin", 50, 10),
  new Boss(2, 2, "Dragon", 200, 30, 20),
];
const items = [new Item(1, 0, "Gold", 50), new Item(0, 1, "Health Potion", 0)];

gameLoop(player, enemies, items);
