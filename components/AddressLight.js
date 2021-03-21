'use strict';
export class AddressLight {
    Template(){
        return `
            <div class="text-center">
                {{Street}}<br>
                {{City}} {{State}} {{Zipcode}} <br>
                {{Phone}} <br><br> 
                {{{Hours}}}
            </div>
        `;
    }
}