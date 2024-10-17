trigger PositionTriggerEx1 on Position__c (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        List<Position__c> posList = new List<Position__c>();
        for(Position__c pos:Trigger.new){
            pos.Open_Date__c = System.Today();
            pos.Min_Pay__c = 10000;
            pos.Max_Pay__c = 15000;
            posList.add(pos);
        }
        insert posList;
    }
}