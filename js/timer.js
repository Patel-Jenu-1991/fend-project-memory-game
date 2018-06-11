class Timer {
  constructor(hours, minutes, seconds, timerId, timer) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.timerId = timerId;
    this.timer = timer;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timer = document.getElementById("display-timer");
  }

  start() {
    this.timerId = setTimeout(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes === 60) {
        this.hours++;
        this.minutes = 0;
      }
      this.timer.textContent = `${this.hours} Hrs : ${this.minutes} Mins :
      ${this.seconds} Secs`;
      // this.start.bind(this) or () => this.start()
      // to pass the function as an argument
      setTimeout(() => this.start(), 0);
    }, 1000);
  }

  stop() {
    clearTimeout(this.timerId);
  }

  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timer.textContent = `${this.hours} Hrs : ${this.minutes} Mins :
    ${this.seconds} Secs`;
  }
}
