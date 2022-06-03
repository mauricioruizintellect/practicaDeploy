import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import LEAD_CODE_FIELD from '@salesforce/schema/Lead.leadCode__c';
import fieldByActionCode from '@salesforce/apex/FieldsByActionController.fieldByActionCode';

export default class Fields extends LightningElement {

    fields = [];

    @api recordId;
    @api objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: [LEAD_CODE_FIELD]})
    wiredFields({ error, data }) {
        if (data) {
            const actionCode = data.fields.leadCode__c.value;
            fieldByActionCode({
                actionCode: 'c'+actionCode
            })
            .then((result) => {
                console.log(result);
                const fieldSeparted = result.split(',');
                this.fields = fieldSeparted.map( field => {
                    let fieldObject = {};
                    fieldObject.fieldApiName = field;
                    fieldObject.objectApiName = this.objectApiName;
                    return fieldObject;
                })
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
        } else if (error) {
            console.log(error);
        }
    }
}