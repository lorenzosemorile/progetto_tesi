import {LitElement, html, css, unsafeCSS} from "lit-element";
import {year_format} from "../../utilities/date";

export default class Sidebar extends LitElement {

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
    if (!this.books){
      this.get_books();
    }
    return true;
  }

  async get_books() {

    let param = this.data[0].title.split(' ');
    param = param.slice(0, 2);
    param = param.join(' ');

    const options = {
      'printType': 'BOOKS',
      'orderBy' : 'newest',
      'langRestrict' : 'it',
      'q' : param,
      'maxResults' : 8,
      'key' : 'AIzaSyAgL1fR92j2dr5MoJY_Q_qu1N-HdDrYC8E'
    };

    const url = new URL('https://content.googleapis.com/books/v1/volumes');
    for (let key in options){
      url.searchParams.append(key, options[key]);
    }

    let resp;
    const call = await fetch(url);

    if (call.ok) {
      resp = call.json();
    } else {
      return null;
    }

    if (resp) {
      this.books = await resp;
    }

    return null;
  }

  render() {
    const article = this.data[0];
    const articles = this.data.slice(1, 3);
    return html`
      <!-- BEGIN SIDEBARS -->
        <div id="sidebars">
          <!-- BEGIN ADS -->
          <a href="#"><img src="/assets/img/side-ad.png" alt="" class="ad" /></a> 
          <a href="#"><img src="/assets/img/side-ad.png" alt="" class="ad-right" /></a> 
          <a href="#"><img src="/assets/img/side-ad.png" alt="" class="ad" /></a> 
          <a href="#"><img src="/assets/img/side-ad.png" alt="" class="ad-right" /></a>
          <!-- END ADS -->
          <h2 class="heading-blue">Focus</h2>
          <img src="${article.urlToImage}" alt="" width="279"/>
          <h3><a href="${article.url}">${article.title}</a></h3>
          <p>${article.description}</p>
          ${article.author && html`<p class="author">di ${article.author}</p>` || ''}
          <h2 class="heading">Altre notizie</h2>
          ${articles.map((article) => {
            return html`
              <h4><a href="${article.url}">${article.title}</a></h4>    
            `  
          })}
          ${this.books && this.renderBooks() || ''}          
        </div>
        <!-- END SIDEBARS -->
    `;
  }

  renderBooks() {
    let books = this.books.items.filter((b) => {return b.volumeInfo.imageLinks});
    books = books.splice(0, 2);
    return html`      
      <h2 class="heading">LIBRI</h2>
      ${books.map( (book) => {
        const authors = book.volumeInfo.authors.join(', ');
        const year = year_format(book.volumeInfo.publishedDate);
        return html`
          <div class="book">
            <a href="${book.volumeInfo.canonicalVolumeLink}">
              <img src="${book.volumeInfo.imageLinks.thumbnail}" width="128"/>
            </a>
            <p><strong>${book.volumeInfo.title}</strong></p>
            <p>di ${authors}</p>          
            <p><em><small>${book.volumeInfo.subtitle}</small></em></p>
            <P><small>${book.volumeInfo.publisher}</small></p>
            <P><small>${year}</small></p>
          </div>
        `   
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-sidebar')) {
  customElements.define('app-sidebar', Sidebar);
}
