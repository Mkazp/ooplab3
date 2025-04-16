interface DataSource {
  write(data: any): void;
  read(): any;
}

class TextFile implements DataSource {
  private filename: string;
  private content: string;

  constructor(filename: string) {
    this.filename = filename;
    this.content = "";
  }

  write(data: string): void {
    this.content = data;
    console.log(`TextFile [${this.filename}] записал: ${data}`);
  }

  read(): string {
    console.log(`TextFile [${this.filename}] читает...`);
    return this.content;
  }
}

class Database implements DataSource {
  private dbName: string;
  private storage: Record<string, any>;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.storage = {};
  }

  write(data: Record<string, any>): void {
    this.storage = { ...this.storage, ...data };
    console.log(`Database [${this.dbName}] записал:`, data);
  }

  read(): Record<string, any> {
    console.log(`Database [${this.dbName}] читает...`);
    return this.storage;
  }
}

class NetworkResource implements DataSource {
  private url: string;
  private lastSent: any;

  constructor(url: string) {
    this.url = url;
    this.lastSent = null;
  }

  write(data: any): void {
    this.lastSent = data;
    console.log(`NetworkResource [${this.url}] отправил:`, data);
  }

  read(): string {
    console.log(`NetworkResource [${this.url}] читает...`);
    return `Ответ от ${this.url} на '${this.lastSent}'`;
  }
}

function processData(dataSource: DataSource, data?: any): any {
  if (data) {
    dataSource.write(data);
  }
  return dataSource.read();
}

const textFile = new TextFile("document.txt");
const database = new Database("users.db");
const network = new NetworkResource("http://example.com/api");

console.log(processData(textFile, "Новый текст"));
console.log(processData(database, { name: "Иван", age: 25 }));
console.log(processData(network, "POST data"));
