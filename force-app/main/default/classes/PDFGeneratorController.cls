public with sharing class PDFGeneratorController {
    
    public Form_Submission__c fromSubmisionData {get; set;}
    public formDataWrapper formData {get; set;}
    public boolean isFirstObject {get; set;}
    public boolean isSecondObject {get; set;}
    public boolean isThirdObject {get; set;}
    public boolean isOtherObject {get; set;}

    public void getPagesOfForm() {
        fromSubmisionData = new Form_Submission__c();
        formData = new formDataWrapper();
        Map<String, Object> mapofFirstObject = new Map<String, Object>();
        Map<String, String> mapofFirstObjectData = new Map<String, String>();

        Map<String, Object> mapofSecondObject = new Map<String, Object>();
        Map<String, String> mapofSecondObjectData = new Map<String, String>();

        Map<String, Object> mapofThirdObject = new Map<String, Object>();
        Map<String, String> mapofThirdObjectData = new Map<String, String>();

        Map<String, Object> mapofOtherObject = new Map<String, Object>();
        Map<String, String> mapofOtherObjectData = new Map<String, String>();

        try {
            String submissionId = ApexPages.currentPage().getParameters().get('Id');
            System.debug('Id from PageReference ==>' + submissionId);


            Form_Submission__c formSubmissionRecord = [SELECT Id, Name, Form__c, Form__r.Name, First_object_data__c, Second_object_data__c, Third_object_data__c, Other_fields_data__c FROM Form_Submission__c WHERE Id =: submissionId];
            fromSubmisionData = formSubmissionRecord;

            // Stroring First object fields submitted data into Map<String, String>
            mapofFirstObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.First_object_data__c);
            List<Form_Fields__c> firstfields = [SELECT Id, Field_Mapping__c, Field_Label__c FROM Form_Fields__c WHERE Form__c =: formSubmissionRecord.Form__c];
            for (String key : mapofFirstObject.keySet()) {
                Object value = mapofFirstObject.get(key);

                if(!key.contains('sobjectType')){
                    for(Form_Fields__c field : firstfields){
                        String api = field.Field_Mapping__c.split('<!@!>')[0];
                        if(api == key){
                            key = field.Field_Label__c;
                            if (value != null) {
                                mapofFirstObjectData.put(key, String.valueOf(value));
                            }
                        }                        
                    }
                } else{
                    if (value != null) {
                        mapofFirstObjectData.put(key, String.valueOf(value));
                    }
                }

                isFirstObject = true;
            }
            System.debug('*** mapofFirstObjectData ==>' + mapofFirstObjectData);

            // Stroring Second object fields submitted data into Map<String, String>
            mapofSecondObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.Second_object_data__c);
            List<Form_Fields__c> secondfields = [SELECT Id, Field_Mapping__c, Field_Label__c FROM Form_Fields__c WHERE Form__c =: formSubmissionRecord.Form__c];
            for (String key : mapofSecondObject.keySet()) {
                Object value = mapofSecondObject.get(key);
                // if (value != null) {
                //     mapofSecondObjectData.put(key, String.valueOf(value));
                // }

                if(!key.contains('sobjectType')){
                    for(Form_Fields__c field : secondfields){
                        String api = field.Field_Mapping__c.split('<!@!>')[0];
                        if(api == key){
                            key = field.Field_Label__c;
                            if (value != null) {
                                mapofSecondObjectData.put(key, String.valueOf(value));
                            }
                        }                        
                    }
                } else{
                    if (value != null) {
                        mapofSecondObjectData.put(key, String.valueOf(value));
                    }
                }


                isSecondObject = true;
            }
            System.debug('*** mapofSecondObjectData ==>' + mapofSecondObjectData);

            // Stroring Third object fields submitted data into Map<String, String>
            mapofThirdObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.Third_object_data__c);
            List<Form_Fields__c> thirdfields = [SELECT Id, Field_Mapping__c, Field_Label__c FROM Form_Fields__c WHERE Form__c =: formSubmissionRecord.Form__c];

            for (String key : mapofThirdObject.keySet()) {
                Object value = mapofThirdObject.get(key);
                // if (value != null) {
                //     mapofThirdObjectData.put(key, String.valueOf(value));
                // }

                if(!key.contains('sobjectType')){
                    for(Form_Fields__c field : thirdfields){
                        String api = field.Field_Mapping__c.split('<!@!>')[0];
                        if(api == key){
                            key = field.Field_Label__c;
                            if (value != null) {
                                mapofThirdObjectData.put(key, String.valueOf(value));
                            }
                        }                        
                    }
                } else{
                    if (value != null) {
                        mapofThirdObjectData.put(key, String.valueOf(value));
                    }
                }

                isThirdObject = true;
            }
            System.debug('*** mapofThirdObjectData ==>' + mapofThirdObjectData);

             // Stroring Other object fields submitted data into Map<String, String>
             mapofOtherObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.Other_fields_data__c);
             
             for (String key : mapofOtherObject.keySet()) {
              
              
                 Object value = mapofOtherObject.get(key);
                 if(!key.contains('sobjectType')){
                    Form_Fields__c fieldlabel = [SELECT Id, Field_Label__c FROM Form_Fields__c WHERE Id =: key];
                    key = fieldlabel.Field_Label__c;
                    if (value != null) {
                        mapofOtherObjectData.put(key, String.valueOf(value));
                    }
                } else {
                    if (value != null) {
                        mapofOtherObjectData.put(key, String.valueOf(value));
                    }
                }
               
                 isOtherObject = true;
             }

             System.debug('*** mapofFirstObjectData ==>' + mapofOtherObjectData);

            List<Form_Page__c> formpageList = new List<Form_Page__c>();
            formpageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c =: formSubmissionRecord.Form__c ORDER BY Page_Number__c ASC];

            formData.formName = formSubmissionRecord.Form__r.Name;
            formData.formPages = formpageList;
            formData.firstObjectFieldMap = mapofFirstObjectData;
            formData.secondObjectFieldMap = mapofSecondObjectData;
            formData.thirdObjectFieldMap = mapofThirdObjectData;
            formData.OtherObjectFieldMap = mapofOtherObjectData;
        } catch (Exception e) {
            System.debug('In the catch block of getPagesOfForm ==>');
            System.debug('--Line number ==>' + e.getLineNumber() + '-- Message ==>' + e.getMessage());
        }
    }

    // This wrapper used to show all datat in pdf 
    public class formDataWrapper {
        public String formName {get; set;} // form name of submmited data
        public List<Form_Page__c> formPages {get; set;}   //List of pages of form
        public Map<String, String> firstObjectFieldMap {get; set;} //
        public Map<String, String> secondObjectFieldMap {get; set;} //
        public Map<String, String> thirdObjectFieldMap {get; set;} //
        public Map<String, String> OtherObjectFieldMap {get; set;} //
    }

}