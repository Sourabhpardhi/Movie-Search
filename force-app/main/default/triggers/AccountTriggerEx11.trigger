trigger AccountTriggerEx11 on Account (before insert) {
    if(Trigger.isInsert && Trigger.isBefore){
        for(Account acc : Trigger.new){
            if(acc.Industry!=NULL && acc.Industry == 'Insurance'){
                acc.Rating = 'HOT';
            }
        }
    }
}