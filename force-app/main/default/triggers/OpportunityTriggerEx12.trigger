trigger OpportunityTriggerEx12 on Opportunity (before insert) {
    for(Opportunity opp:Trigger.new){
        if(opp.Amount!=NULL && opp.Amount>100000){
            opp.Description = 'HOT OPPORTUNITY';
        }
    }
}