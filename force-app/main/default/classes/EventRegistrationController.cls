// EventRegistrationController.cls
public with sharing class EventRegistrationController {
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() {
        return [SELECT Id, Name, Date__c, Location__c FROM Event__c ORDER BY Date__c];
    }

    @AuraEnabled
    public static void registerForEvent(Id eventId, String participantName, String email) {
        Registration__c registration = new Registration__c();
        registration.Event__c = eventId;
        registration.Participant_Name__c = participantName;
        registration.Email__c = email;
        insert registration;
    }
}