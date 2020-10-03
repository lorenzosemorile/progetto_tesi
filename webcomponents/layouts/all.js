import {LitElement, html} from "lit-element";
import './app-layout-soft/app-layout-soft';
import './app-layout-soft/app-layout-medium';
import './app-layout-soft/app-layout-hard';
import {read_cookie} from "../utilities/cookies";
import {get_sources_for_profile} from "../utilities/sources";

export default class Portal extends LitElement {

  constructor(){
    super();
    this.key = '07ee10d2a94a4182a2b1985bebbb1d23';
    this.data = null;

    document.addEventListener('history:change', (e) => {

      let category = e.detail.category;
      if (e.detail.category === 'all'){
        category = null;
      }

      this.category = category;
      this.data = null;
    });
  }

  static get properties() {
    return {
      data: {type: Object}
    }
  };

  get url (){
    let base = 'http://newsapi.org/v2/top-headlines';
    let qs = `?pageSize=50&country=it&apiKey=${this.key}`;
    if (this.category){
      return `${base}${qs}&category=${this.category}`;
    }
    return `${base}${qs}`;
  }

  async get_data(url = null) {
    url = url || this.url;
    let resp;
    const call = await fetch(url);

    if (call.ok) {
      resp = call.json();
    } else {
      return null;
    }

    if (resp) {
      this.data = await resp;
    }
    return null;
  }

  get type(){
    const cookie = read_cookie();
    return cookie.layout || 'soft';
  }

  get data_type(){
    const cookie = read_cookie();
    return cookie.data || 'soft';
  }

  get data() {
    return this._data;
  }

  set data(value) {
    const oldValue = this._data;

    if (value && !this.category) {
      const sources = get_sources_for_profile(this.data_type);
      console.log(this.data_type);
      console.log(sources);
      value.articles = value.articles.filter((article) => {
        return sources.includes(article.source.name);
      });
    }
    this._data = value;
    this.requestUpdate('data', oldValue);
  }


  shouldUpdate(){
    if (!this.data){
      this.get_data();
      return false;
    }
    console.log(this.data);
    return true;
  }

  render() {
    switch (this.type){
      case 'soft':
        return html`<app-layout-soft .data=${this.data}></app-layout-soft>`;
      case 'medium':
        return html`<app-layout-medium .data=${this.data}></app-layout-medium>`;
      case 'hard':
        return html`<app-layout-hard .data=${this.data}></app-layout-hard>`;
    }
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-portal')) {
  customElements.define('app-portal', Portal);
}
