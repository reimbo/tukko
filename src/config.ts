declare global {
  interface Window { API_URL: string}
}

export class Config {
  static api = window.API_URL
}
