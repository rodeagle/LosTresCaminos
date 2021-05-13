'use strict';
export class AddressLight {
    Template(){
        return `
            <div class="text-center">
                {{Street}}<br>
                <strong>{{City}} {{State}} {{Zipcode}}</strong> <br>
                {{{Phone}}} <br><br> 
                {{{Hours}}}
            </div>
        `;
    }
}