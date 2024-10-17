trigger AccountTriggerEx01 on Account (before delete) {
    if(Trigger.isbefore && Trigger.isdelete){
        List<Contact> conList = [select id, AccountId from Contact where AccountId IN: Trigger.OldMap.KeySet()];
    if(!conList.isEmpty()){
        for(Contact con:conList){
            con.AccountId = null;
		}
    }
    update conList;
    }
}