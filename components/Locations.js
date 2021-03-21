import { AddressLight } from "./AddressLight.min.js";

'use strict';
export class Locations{
    Template(){
        return `
            <hr>
            <div class="p-0 p-md-5">
                ${new AddressLight().Template()}
            </div>
        `;
    }
}