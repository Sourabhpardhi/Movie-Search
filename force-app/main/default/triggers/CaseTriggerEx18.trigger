trigger CaseTriggerEx18 on Case (after insert) {
    List<Account> accList = new List<Account>();
    for(Case cs : Trigger.new){
        if(cs.AccountId!=NULL){
            Account acc = new Account();
            acc.Latest_Case_Number__c = cs.CaseNumber;
            acc.Id = cs.AccountId;
            accList.add(acc);
        }
    }
    if(!accList.isEmpty()){
        update accList;
    }
}