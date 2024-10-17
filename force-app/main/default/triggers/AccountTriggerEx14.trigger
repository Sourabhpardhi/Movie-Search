trigger AccountTriggerEx14 on Account (before insert) {
    if(Trigger.isInsert && Trigger.IsBefore){
        for(Account acc : Trigger.new){
            if(acc.CopyBillingToShipping__c){
                acc.ShippingCity = acc.BillingCity;
                acc.ShippingCountry = acc.BillingCountry;
                acc.ShippingPostalCode = acc.BillingPostalCode;
                acc.ShippingState = acc.BillingState;
                acc.ShippingStreet = acc.BillingStreet;
            }
        }
    }
}