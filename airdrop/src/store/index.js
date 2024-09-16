import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    menu: [],
    path: '',
    wsObj: {
      ws: null,
      ip: '',
      port: 8888,
      wsPort: 8089
    }
  }),
  actions: {
    update({ key, value }) {
      this[key] = value
    },
  }
})
