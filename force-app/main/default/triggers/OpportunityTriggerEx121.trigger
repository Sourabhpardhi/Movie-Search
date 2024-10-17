trigger OpportunityTriggerEx121 on Opportunity (after insert) {
    if(Trigger.isAfter && Trigger.isInsert){
        List<Account> accList = new List<Account>();
        for(Opportunity opp:Trigger.new){
            Account acc = new Account();
            acc.Recent_Opportunity_Amount__c = opp.Amount;
            acc.Id = opp.AccountId;
            accList.add(acc);
        }
        update accList;
    }
}