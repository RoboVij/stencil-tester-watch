import { Component, Prop, h, Watch } from '@stencil/core';
import { format } from '../../utils/utils';
import { ItemsCollectionDescriptor } from '../../utils/types';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;
  @Prop() test: number = 3;
  @Prop() tester: ItemsCollectionDescriptor = [{x: 3, y:4}, {x: 6, y:14}];
  protected _test: number = this.test;
  protected _tester: ItemsCollectionDescriptor = this.tester;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>{this.getText()} {this._tester}</div>;
  }

  componentDidLoad() {
    this.onTestChanged(this.test);
    this.onTesterChanged(this.tester);
  }

  @Watch('test')
  onTestChanged(num: number): void {
    console.log(num)
    this._test = num;
  }

  @Watch('tester')
  onTesterChanged(arr: ItemsCollectionDescriptor): void {
    console.log(arr)
    const parsed = typeof arr === 'string' ? arr.trim() ? JSON.parse(arr) : [] : arr;
    const source = Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
    this._tester = source;
  }
}
