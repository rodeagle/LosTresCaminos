'use strict';
export class AddressLight {
    Template(){
        return `
            <div class="text-center">
                {{street}}<br>
                {{city}} {{state}} {{zipcode}} <br>
                {{phone}} <br><br> 
                {{{hours}}}
            </div>
        `;
    }
}