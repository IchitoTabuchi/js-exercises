customElements.define(
  'inline-circle',
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = 'inline-block';
      if (!this.hasAttribute('border-style') && !this.style.borderStyle)
        this.style.borderStyle = 'solid';
      if (!this.hasAttribute('border-width') && !this.style.borderWidth)
        this.style.borderWidth = '1px';
      if (!this.hasAttribute('border-color') && !this.style.borderColor)
        this.style.borderColor = 'black';
      this.style.borderRadius = '50%';
      this.style.verticalAlign = 'middle';

      if (!this.style.width) {
        this.style.width = '0.8em';
        this.style.height = '0.8em';
      }
    }

    static get observedAttributes() {
      return [
        'diameter',
        'color',
        'border-color',
        'border-width',
        'border-style',
      ];
    }

    attributeChangedCallback(name, _oldValue, newValue) {
      switch (name) {
        case 'diameter':
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case 'color':
          this.style.backgroundColor = newValue;
          break;
        case 'border-color':
          this.style.borderColor = newValue;
          break;
        case 'border-width':
          this.style.borderWidth = newValue;
          break;
        case 'border-style':
          this.style.borderStyle = newValue;
          break;
      }
    }

    get diameter() {
      return this.getAttribute('diameter');
    }
    set diameter(diameter) {
      this.setAttribute('diameter', diameter);
    }
    get color() {
      return this.getAttribute('color');
    }
    set color(color) {
      this.setAttribute('color', color);
    }
    get borderColor() {
      return this.getAttribute('border-color');
    }
    set borderColor(borderColor) {
      this.setAttribute('border-color', borderColor);
    }
    get borderWidth() {
      return this.getAttribute('border-width');
    }
    set borderWidth(borderWidth) {
      this.setAttribute('border-width', borderWidth);
    }
    get borderStyle() {
      return this.getAttribute('border-style');
    }
    set borderStyle(borderStyle) {
      this.setAttribute('border-style', borderStyle);
    }
  }
);
