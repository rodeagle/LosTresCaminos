import { AddressLight } from "./AddressLight.min";

'use strict';
export class Locations{
    Template(){
        return `
            {{#each locations}}
                <hr>
                <div class="p-0 p-md-5">
                    ${new AddressLight().Template()}
                </div>
            {{/each}}
        `;
    }
}