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
    const href = e.target.href;
    const title = e.target.innerHTML;
    const category = e.target.dataset.category;
    window.history.pushState({}, title, href);

    const event = new CustomEvent(`history:change`, {
      detail: {title, href, category},
      bubbles: true, composed: true }
    );

    document.dispatchEvent(event);
    e.preventDefault();
  }

  go(e){
    e.preventDefault();
    const {direction} = e.currentTarget.dataset;
    const {position} = this.data.configs;
    const event = new CustomEvent(`item_container:change_direction`, { detail: {direction, position}, bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-menu')) {
  customElements.define('app-menu', Menu);
}
