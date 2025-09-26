"use strict";
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
    print(report) {
        console.log('Printing report:', report);
    }
}
// 2. 開放閉鎖の原則 (Open/Closed Principle)
// 満たさないコード
class Shape {
    draw(type) {
        if (type === 'circle') {
            console.log('Drawing a circle');
        }
        else if (type === 'square') {
            console.log('Drawing a square');
        }
    }
}
class Circle {
    draw() {
        console.log('Drawing a circle');
    }
}
class Square {
    draw() {
        console.log('Drawing a square');
    }
}
class ShapeDrawer {
    drawShape(shape) {
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
class Printer {
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
class Printer {
    start() {
        console.log('Printer started');
    }
    stop() {
        console.log('Printer stopped');
    }
}
class CoffeeMaker {
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
    log(message) {
        console.log(message);
    }
}
class Application {
    logger = new Logger();
    run() {
        this.logger.log('Application is running');
    }
}
// 満たすコード
class ConsoleLogger {
    log(message) {
        console.log(message);
    }
}
class Application {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    run() {
        this.logger.log('Application is running');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBRS9DLFdBQVc7QUFDWCxNQUFNLE1BQU07SUFDVixRQUFRO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQUVELFNBQVM7QUFDVCxNQUFNLGVBQWU7SUFDbkIsUUFBUTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLGFBQWE7SUFDakIsS0FBSyxDQUFDLE1BQWM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFFRCxxQ0FBcUM7QUFFckMsV0FBVztBQUNYLE1BQU0sS0FBSztJQUNULElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7Q0FDRjtBQU9ELE1BQU0sTUFBTTtJQUNWLElBQUk7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBRUQsTUFBTSxNQUFNO0lBQ1YsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLFdBQVc7SUFDZixT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