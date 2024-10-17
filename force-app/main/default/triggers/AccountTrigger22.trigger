trigger AccountTrigger22 on Account (before update) {
    if(Trigger.isBefore && Trigger.isUpdate){
        for(Account acc : Trigger.new){
            Account oldRec = Trigger.oldMap.get(acc.Id);
            if(oldRec.Phone != acc.Phone){
                acc.Description = 'Phone no is changed';
            } 
        }
    }
}