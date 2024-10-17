public class SalesforceConnect {
	 @AuraEnabled
    public static void getCasesFromSalesforceOrgB(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:SFDCB/services/apexrest/CasesTest/*');
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
                  //  System.debug(response.getStatusCode());
        if (response.getStatusCode() == 200) {
            List<Object> results = (List<Object>)JSON.deserializeUntyped(response.getBody());
            for(Object result : results){
                Map<String, Object> caseProps = (Map<String, Object>) result;
                System.debug('CaseNumber: '+caseProps.get('CaseNumber')+' - Subject:'+caseProps.get('Subject'));
            }
           // System.debug(response.getBody());
           // return response.getBody();
        }
        //return '';
    }
    public static void createCasesInSalesforceOrgB(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:SFDCB/services/apexrest/CasesTest/*');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBOdy('{"subject":"Case from Salesforce orgA","status":"New","origin":"Web","priority":"Medium"}');
        
        HttpResponse response = http.send(request);
        System.debug(response.getBody());
        if (response.getStatusCode() == 200) {
         	System.debug(response.getBody());

            }
           // return response.getBody();
        //return '';
    }
}