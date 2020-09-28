import {html} from 'lit-element';
import {render} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
/**
 * @typedef {ChildNode & { contentFor?: string}} AdoptedNode
 */
/**
 * @param {typeof import('lit-element').LitElement} Base
 */
export const Shadowless = Base =>
  class extends Base {
    /**
     * @protected
     * @type {Object<string, AdoptedNode[] | undefined>} slots
     */
    slots = {};

    /**
     * @protected
     */
    willYield = false;

    /**
     * @protected
     */
    createRenderRoot() {
      return this;
    }

    /**
     * @protected
     */
    adoptChildren() {
      Array.from(this.childNodes).forEach((/** @type {AdoptedNode} */ child) => {
        const slotName = this.getSlotNameForChild(child);
        const {[slotName]: content = []} = this.slots;

        if (child instanceof HTMLTemplateElement) {
          child = child.content;
        }
        if (('HTMLSlotElement' in window && child instanceof HTMLSlotElement) || child.nodeName === 'slot') {
          const component = child.getAttribute('tag');
          const slot = child.name;
          /**
           * @type {HTMLTemplateElement}
           */
          const template = this.querySelector(`template[slot=${slot}]`);
          if (template) {
            const clone = document.importNode(template.content, true);
            if (component) {
              const el = document.createElement('div');
              render(
                html`
                  ${unsafeHTML(`<${component}></${component}>`)}
                `,
                el,
              );
              child = el.children.item(0);
              child.appendChild(clone);
            } else {
              child = clone;
            }
          }
        }
        Object.assign(this.slots, {
          [slotName]: [...content, child],
        });
      });
    }

    /**
     * @protected
     * @param {AdoptedNode} child
     * @returns {string}
     */
    getSlotNameForChild(child) {
      if (child instanceof Comment && child.nextSibling instanceof Element) {
        return this.getSlotNameForChild(child.nextSibling);
      }

      if ('contentFor' in child) {
        return child.contentFor || '';
      }

      if (child instanceof Element && child.hasAttribute('content-for')) {
        return child.getAttribute('content-for') || '';
      }

      return '';
    }

    /**
     * @protected
     * @param {Text} node
     * @returns {boolean}
     */
    // eslint-disable-next-line class-methods-use-this
    isTextNodeEmpty(node) {
      return !node.textContent || !node.textContent.trim();
    }

    /**
     * @protected
     * @param {string} slot
     * @returns {boolean}
     */
    isSlotEmpty(slot) {
      const content = this.slots[slot];

      return (
        !content ||
        content.every(
          child =>
            child instanceof Comment || (child instanceof Text && this.isTextNodeEmpty(child)),
        )
      );
    }

    /**
     * @param {import('lit-element/lib/updating-element').PropertyValues} changedProperties
     */
    update(changedProperties) {
      if (!this.hasUpdated && this.willYield) {
        this.adoptChildren();
      }
      super.update(changedProperties);
    }

    /**
     * @param {string} slot
     * @param {any} [defaultContent]
     */
    yield(slot, defaultContent) {
      const slotContent = this.slots[slot];

      return html`
        ${slotContent} ${this.isSlotEmpty(slot) ? defaultContent : undefined}
      `;
    }
  };
