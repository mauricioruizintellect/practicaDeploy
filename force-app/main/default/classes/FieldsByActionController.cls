public with sharing class FieldsByActionController {
    
    @AuraEnabled(Cacheable = true)
    public static string fieldByActionCode (String actionCode){
        try {
            setupFields__mdt currentActionCode = [SELECT Lista_de_campos__c
                                                                FROM setupFields__mdt
                                                                WHERE DeveloperName =: actionCode];
            return currentActionCode.Lista_de_campos__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}