public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks(Id caseId) {
        return [SELECT Id, Description, Subject, Status, Priority, ActivityDate, WhatId
                FROM Task where WhatId =:caseId];
    }
     
    @AuraEnabled
    public static void updateTaskStatus(List<Id> taskIds, String status) {
        try {
            List<Task> tasksToUpdate = [SELECT Id, Status FROM Task WHERE Id IN :taskIds];
            for (Task task : tasksToUpdate) {
                task.Status = status;
            }
            update tasksToUpdate;
        } catch (Exception e) {
            System.debug('Error updating task status: ' + e.getMessage());
            throw new AuraHandledException('Failed to update task status: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Task> updateTaskWhatId(List<Id> taskIds, Id caseId) {
        try {
            List<Task> tasksToUpdate = [SELECT Id, WhatId FROM Task WHERE Id IN :taskIds];
            for (Task task : tasksToUpdate) {
                task.WhatId = caseId;
            }
            update tasksToUpdate;
            return [SELECT Id, Subject, Status, Priority, WhatId FROM Task WHERE Id IN :taskIds];
        } catch (Exception e) {
            System.debug('Error updating task WhatId: ' + e.getMessage());
            throw new AuraHandledException('Failed to update task WhatId: ' + e.getMessage());
            
        }
        //return [SELECT Id, Subject, Status, Priority, WhatId FROM Task WHERE Id IN :taskIds];
    }
}