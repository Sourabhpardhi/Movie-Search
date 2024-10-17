trigger AccountTriggerEx16 on Account (after insert) {
    if (Trigger.isAfter && Trigger.isInsert) {
        List<Opportunity> oppList = new List<Opportunity>();
        for (Account acc : Trigger.new) {
            Opportunity opp = new Opportunity();
            opp.Name = 'Testing Trigger1';
            opp.CloseDate = Date.newInstance(2024, 4, 30); // Assigning a Date value
            opp.StageName = 'Prospecting'; // Use StageName instead of Stage
            opp.AccountId = acc.Id;
            oppList.add(opp);
        }
        insert oppList; // Corrected variable name from oopList to oppList
    }
}