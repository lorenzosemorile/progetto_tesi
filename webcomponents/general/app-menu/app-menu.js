import {LitElement, html, css, unsafeCSS} from "lit-element";

export default class Menu extends LitElement {
  constructor(){
    super();
    this.menu = [
      {
        'title' : 'Home',
        'href' : '/',
        'category' : 'all'
      },
      {
        'title' : 'Lavoro',
        'href' : '/lavoro',
        'category' : 'business'
      },
      {
        'title' : 'Salute',
        'href' : '/salute',
        'category' : 'health'
      },
      {
        'title' : 'Scienza',
        'href' : '/scienza',
        'category' : 'science'
      },
      {
        'title' : 'Sport',
        'href' : '/sport',
        'category' : 'sport'
      },
      {
        'title' : 'Intrattenimento',
        'href' : '/intrattenimento',
        'category' : 'entertainment'
      },
      {
        'title' : 'Tecnologia',
        'href' : '/tecnologia',
        'category' : 'technology'
      }
    ]
  }

  render() {
    return html`
      <div id="nav">
        <ul @click="${this.route}">
          ${this.menu.map(item => {
            return html`
              <li><a href="${item.href}" data-category="${item.category}">${item.title}</a></li>    
            `  
          })}       
        </ul>
      </div>
    `;
  }

  route(e){
    const title = e.target.innerHTML;
    const {href} = e.target;
    const {category} = e.target.dataset;
    window.history.pushState({}, title, href);

    const event = new CustomEvent(`history:change`, {
      detail: {title, href, category},
      bubbles: true, composed: true }
    );

    document.dispatchEvent(event);
    e.preventDefault();
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-menu')) {
  customElements.define('app-menu', Menu);
}
