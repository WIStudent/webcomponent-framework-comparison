import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    count: number;
    increase(): void;
    decrease(): void;
    render(): import("lit-html").TemplateResult<1>;
    protected firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
