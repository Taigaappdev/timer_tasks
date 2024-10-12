import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ns-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  totalWorkTime = 0
  totalTasks = 0
  completedTasks = 0

  ngOnInit() {
    // ここで実際のデータを取得する処理を実装します
    this.totalWorkTime = 120 // 仮の値：2時間
    this.totalTasks = 10
    this.completedTasks = 7
  }

  getCompletionRate(): number {
    return this.totalTasks > 0 ? (this.completedTasks / this.totalTasks) * 100 : 0
  }
}