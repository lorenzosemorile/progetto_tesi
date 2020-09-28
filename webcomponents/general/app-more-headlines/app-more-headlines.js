import {LitElement, html, css, unsafeCSS} from "lit-element";
import {date_format} from "../../utilities/date";

export default class MoreHeadlines extends LitElement {

  constructor(){
    super();
    this.data = null;
  }

  static get properties() {
    return {
      data: {type: Object},
      books: {type: Object}
    }
  };

  shouldUpdate(){
    if (!this.data) return false;
    return true;
  }



  render() {
    return html`
      <!-- BEGIN MORE HEADLINES -->
      <div id="more-headlines">
        <h2 class="heading">Altre Notizie</h2>
        ${this.data.map((article) => {
          const date = date_format(article.publishedAt);
          return html`
            <h3><a href="${article.url}">${article.title}</a></h3>
            <p class="author">${article.source.name} | <span>${date}</span></p>
            ${article.author && html`<p class="author">di ${article.author}</p>` || ''} 
            <p>${article.description}</p>
            <p><a href="${article.url}">Full article &raquo;</a></p>
          `
        })}
        
      </div>
      <!-- END MORE HEADLINES -->
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-more-headlines')) {
  customElements.define('app-more-headlines', MoreHeadlines);
}
