const body = document.querySelector('body');
import timerMarkup from './timer.js';

body.insertAdjacentHTML('afterbegin', timerMarkup());

const refs = {
    days:document.querySelector('span[data-value="days"]'),
    hours:document.querySelector('span[data-value="hours"]'),
    mins:document.querySelector('span[data-value="mins"]'),
    secs:document.querySelector('span[data-value="secs"]')
}

class CountdownTimer{
    constructor({ targetDate, onTick }) {
        this.intervalId = null;
        this.targetDate = targetDate;
        this.onTick = onTick;
        this.start();
    }

    start() {
        this.intervalId = setInterval(() => {
            const realTime = Date.now();
            const differenceTime = this.targetDate - realTime;
            const time = this.getTime(differenceTime);
            this.onTick(time);
            if (differenceTime <= 0) {
                this.stop();
            }
        },1000)
    }

    stop() {
        clearInterval(this.intervalId);
        const time = this.getTime(0);
        this.onTick(time);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getTime(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }
}

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jan 08, 2022'),
    onTick: newTimer,
  
});

function newTimer({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}:`;
    refs.hours.textContent = `${hours}:`;
    refs.mins.textContent = `${mins}:`;
    refs.secs.textContent = `${secs}`;
}