// 1. 単一責任の原則 (Single Responsibility Principle)

// 満たさないコード
class Report {
  generate() {
    console.log('Generating report...');
  }

  print() {
    console.log('Printing report...');
  }
}

// 満たすコード
class ReportGenerator {
  generate() {
    console.log('Generating report...');
  }
}

class ReportPrinter {
  print(report: string) {
    console.log('Printing report:', report);
  }
}

// 2. 開放閉鎖の原則 (Open/Closed Principle)

// 満たさないコード
class Shape {
  draw(type: string) {
    if (type === 'circle') {
      console.log('Drawing a circle');
    } else if (type === 'square') {
      console.log('Drawing a square');
    }
  }
}

// 満たすコード
interface Drawable {
  draw(): void;
}

class Circle implements Drawable {
  draw() {
    console.log('Drawing a circle');
  }
}

class Square implements Drawable {
  draw() {
    console.log('Drawing a square');
  }
}

class ShapeDrawer {
  drawShape(shape: Drawable) {
    shape.draw();
  }
}

// 3. リスコフの置換原則 (Liskov Substitution Principle)

// 満たさないコード
class Vehicle {
  startEngine() {
    console.log('Engine started');
  }
}

class Bicycle extends Vehicle {
  startEngine() {
    throw new Error('Bicycles do not have engines');
  }
}

// 満たすコード
class Vehicle {
  move() {
    console.log('Moving');
  }
}

class Car extends Vehicle {
  move() {
    console.log('Driving');
  }
}

class Bicycle extends Vehicle {
  move() {
    console.log('Pedaling');
  }
}

// 4. インターフェース分離の原則 (Interface Segregation Principle)

// 満たさないコード
interface Machine {
  start(): void;
  stop(): void;
  brewCoffee(): void;
}

class Printer implements Machine {
  start() {
    console.log('Printer started');
  }

  stop() {
    console.log('Printer stopped');
  }

  brewCoffee() {
    throw new Error('Printers cannot brew coffee');
  }
}

// 満たすコード
interface Startable {
  start(): void;
  stop(): void;
}

interface CoffeeMachine {
  brewCoffee(): void;
}

class Printer implements Startable {
  start() {
    console.log('Printer started');
  }

  stop() {
    console.log('Printer stopped');
  }
}

class CoffeeMaker implements Startable, CoffeeMachine {
  start() {
    console.log('Coffee maker started');
  }

  stop() {
    console.log('Coffee maker stopped');
  }

  brewCoffee() {
    console.log('Brewing coffee');
  }
}

// 5. 依存関係逆転の原則 (Dependency Inversion Principle)

// 満たさないコード
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class Application {
  private logger = new Logger();

  run() {
    this.logger.log('Application is running');
  }
}

interface Logger {
  log(message: string): void;
}

// 満たすコード
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

class Application {
  constructor(private logger: Logger) {}

  run() {
    this.logger.log('Application is running');
  }
}
