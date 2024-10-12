import { Component, OnInit, OnDestroy } from '@angular/core'
import { Dialogs } from '@nativescript/core'

@Component({
  selector: 'ns-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnDestroy {
  workTime = 25 * 60
  breakTime = 5 * 60
  currentTime: number
  isWorking = true
  isRunning = false
  timer: any

  ngOnInit() {
    this.resetTimer()
  }

  ngOnDestroy() {
    this.stopTimer()
  }

  resetTimer() {
    this.currentTime = this.isWorking ? this.workTime : this.breakTime
  }

  startTimer() {
    this.isRunning = true
    this.timer = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--
      } else {
        this.stopTimer()
        this.isWorking = !this.isWorking
        this.resetTimer()
        this.showNotification()
      }
    }, 1000)
  }

  stopTimer() {
    this.isRunning = false
    clearInterval(this.timer)
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  showNotification() {
    Dialogs.alert({
      title: this.isWorking ? '休憩時間です' : '作業時間です',
      message: this.isWorking ? '休憩を始めましょう' : '作業を再開しましょう',
      okButtonText: 'OK'
    })
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}