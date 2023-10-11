import { Component, Listen, Prop, h, Event, EventEmitter, getAssetPath } from '@stencil/core';

@Component({
  tag: 'stencil-button',
  styleUrl: 'stencil-button.css',
  shadow: true,
})
export class StencilButton {
  @Prop() type!: 'primary-1' | 'primary-2' | 'secondary' | 'danger';

  @Prop() text!: string;

  @Prop() iconPath!: string;

  @Event() btnClick: EventEmitter;

  @Listen('click')
  onClick() {
    this.btnClick.emit();
  }

  render() {
    const imageSrc = getAssetPath(this.iconPath);

    return (
      <button
        class={{
          'btn': true,
          'btn--primary-1': this.type === 'primary-1',
          'btn--primary-2': this.type === 'primary-2',
          'btn--secondary': this.type === 'secondary',
          'btn--danger': this.type === 'danger',
        }}
      >
        {this.iconPath ? <img src={imageSrc} alt="" /> : ''}

        {this.text}
      </button>
    );
  }
}
