// src/stores/counter-store.tsx
import { observable, action } from 'mobx'

export default class CounterStore {
  @observable
  count = 0

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }
  
  toJson() {
    return {
      count: this.count
    }
  }
}
