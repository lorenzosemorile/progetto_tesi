import {LitElement, html, css, unsafeCSS} from "lit-element";
import data from '../../../data/hero-1.json';
import {read_cookie} from "../../utilities/cookies";

export default class Hero extends LitElement {

  constructor(){
    super();
    this.data = null;
  }

  static get properties() {
    return {
      data: {type: Object}
    }
  };

  shouldUpdate(){
    if (!this.data) return false;
    return true;
  }

  render() {
    const article = this.data;
    return html`
      <div id="hero">
        <div class="hero_container">
          <img src="${article.urlToImage}" alt="" width="980"/>
          <div class="hero_info">
            <h1><a href="${article.url}">${article.title}</a></h1>
            <p class="summary"><p>${article.description}</p></p>
            ${article.author && html`<p class="author">di ${article.author}</p>` || ''}
          </div>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-hero')) {
  customElements.define('app-hero', Hero);
}
