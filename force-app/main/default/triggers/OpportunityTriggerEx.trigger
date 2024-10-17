Trigger OpportunityTriggerEx on Opportunity (before update) {
    if(Trigger.isBefore && Trigger.isUpdate){
        for(Opportunity opp : Trigger.new){
            if(opp.StageName!=Trigger.oldMap.get(opp.Id).StageName){
            
            if(opp.StageName == 'Closed Lost'){
                opp.Description = 'Opportunity is closed Lost';
            }
            else if(opp.StageName == 'Closed Won'){
                opp.Description = 'Opportunity is closed won';
            }
            else{
                opp.Description = 'Opportunity is open';
            }
            
            }
        }
    }
}