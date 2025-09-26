// 保存すると自動整形されてしまうので、1行で記述するコードはコメント形式で記載
// export const  fizzBuzz = (): string =>  Array.from({ length: 100 }, (_, i) => (i + 1) % 15 === 0 ? 'FizzBuzz' : (i + 1) % 3 === 0 ? 'Fizz' : (i + 1) % 5 === 0 ? 'Buzz' : (i + 1).toString()).join('\n') + '\n';;
// 上記コードを自動整形したコード
export const fizzBuzz = () => Array.from({ length: 100 }, (_, i) => (i + 1) % 15 === 0
    ? 'FizzBuzz'
    : (i + 1) % 3 === 0
        ? 'Fizz'
        : (i + 1) % 5 === 0
            ? 'Buzz'
            : (i + 1).toString()).join('\n') + '\n';
console.log(fizzBuzz());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsb05BQW9OO0FBRXBOLGtCQUFrQjtBQUNsQixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsR0FBVyxFQUFFLENBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDbkMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDaEIsQ0FBQyxDQUFDLFVBQVU7SUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbkIsQ0FBQyxDQUFDLE1BQU07UUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ3ZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUV0QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMifQ==