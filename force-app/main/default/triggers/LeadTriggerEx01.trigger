trigger LeadTriggerEx01 on Lead (before insert) {
// Get email addresses of Leads being inserted
    Set<String> leadEmails = new Set<String>();
    for (Lead newLead : Trigger.new) {
        leadEmails.add(newLead.Email);
    }
    
    // Query Contacts with email addresses matching those of the Leads
    List<Contact> matchingContacts = [SELECT Email FROM Contact WHERE Email IN :leadEmails];
    
    // If matchingContacts is not empty, it means there are duplicate email addresses
    if (!matchingContacts.isEmpty()) {
        for (Lead newLead : Trigger.new) {
            newLead.addError('Email is present in Contact use diffrent one');
        }
    }
}