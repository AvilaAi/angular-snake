import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Petit Snake ';
  numbers = Array(30);
  snake = [
    [5, 22],
    [6, 22],
    [7, 22],
    [8, 22],
  ];

  snakeBody = [''];
  direction = 'E';
  score = 0;
  gameOver = false;

  randomFruit(max: number) {
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);
    return x + '-' + y;
  }
  fruit = this.randomFruit(30);

  toSnakeString = (x: number, y: number) => x + '-' + y;

  snakeGo(dir: string) {
    var newSnakeCase = [0, 0];
    switch (dir) {
      case 'E':
        newSnakeCase = [this.snake[0][0] + 1, this.snake[0][1]];
        break;
      case 'S':
        newSnakeCase = [this.snake[0][0], this.snake[0][1] + 1];

        break;
      case 'W':
        newSnakeCase = [this.snake[0][0] - 1, this.snake[0][1]];

        break;
      case 'N':
        newSnakeCase = [this.snake[0][0], this.snake[0][1] - 1];

        break;

      default: {
        break;
      }
    }

    this.snake.unshift(newSnakeCase);

    if (this.snakeBody.indexOf(this.fruit) !== -1) {
      this.fruit = this.randomFruit(30);
      this.score++;
    } else {
      this.snake.pop();
    }

    this.snakeBody = this.snake.map((s) => {
      if (Math.max(...s) > 29 || Math.min(...s) < 0) {
        this.gameOver = true;
        this.ngOnDestroy();
      }
      return s.join('-');
    });
  }
  // ngAfterContentInit() {
  //   // ...
  //   // this.snakeGo(this.direction);

  // }
  autoMove = setTimeout(() => {}, 100);
  ngOnInit() {
    this.snakeGo(this.direction);
    this.autoMove = setInterval(() => {
      this.snakeGo(this.direction);
    }, 100);
  }

  ngOnDestroy() {
    if (this.autoMove) {
      clearInterval(this.autoMove);
    }
  }

  reStart() {
    this.snake = [
      [5, 22],
      [6, 22],
      [7, 22],
      [8, 22],
    ];
    this.snakeBody = [''];
    this.direction = 'E';
    this.score = 0;
    this.gameOver = false;
    this.ngOnInit();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.keyCode === 39) {
      switch (this.direction) {
        case 'E':
          this.direction = 'S';
          break;
        case 'S':
          this.direction = 'W';
          break;
        case 'W':
          this.direction = 'N';

          break;
        case 'N':
          this.direction = 'E';
          break;

        default: {
          break;
        }
      }
    } else if (event.keyCode === 37) {
      switch (this.direction) {
        case 'E':
          this.direction = 'N';
          break;
        case 'N':
          this.direction = 'W';
          break;
        case 'W':
          this.direction = 'S';

          break;
        case 'S':
          this.direction = 'E';
          break;

        default: {
          break;
        }
      }
    } else if (event.keyCode === 38) {
      this.snakeGo(this.direction);
    } else if (event.keyCode === 32) {
      this.ngOnDestroy();
    }
  }
}
