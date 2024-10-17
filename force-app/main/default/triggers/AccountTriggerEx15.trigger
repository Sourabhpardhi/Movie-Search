trigger AccountTriggerEx15 on Account (after insert) {
    List<Contact> conList = new List<Contact>();
    for (Account acc : Trigger.new) {
        Contact con = new Contact();
        con.LastName = 'Sita';
        // You may want to assign other fields of the contact here
        con.AccountId = acc.Id; // Associate the contact with the account
        conList.add(con);
    }
    insert conList;
}