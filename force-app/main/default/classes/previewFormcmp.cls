public without sharing class previewFormcmp {

    @AuraEnabled
    public static Form__c formdetails(Id id){
        try{
        Form__c nform = [SELECT Id,Name,Progress_Indicator__c,Captcha_Type__c,Button_CSS__c,Button_Position__c,
        Page_CSS__c,Form_Styling__c, All_Field_Hover__c, All_Field_Focus__c,All_Field_Styling__c,Label_CSS__c,FormBgID__c,PageBgID__c  FROM Form__c WHERE Id =: id];
        return nform;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formdetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String bgimages(Id id, String data){
        try{
            String result = '';
            ContentVersion cv = [SELECT Id,VersionData FROM ContentVersion WHERE Id =: id];
            result += 'url("data:image/png;base64,'+ EncodingUtil.base64Encode(cv.VersionData);
            String str = data.split('background-image:')[0];
            str += 'background-image:'+result+'");'; 
            System.debug('base64 data image --> '+ str);

            return str;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formdetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Fields__c> formfielddetails(Id id){
        try{
        List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c,Field_Validations__c,Field_Mapping__c FROM Form_Fields__c WHERE Form__c =: id ORDER BY Field_Order__c ASC];
        return fieldList;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formfielddetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Page__c> formpagedetails(String id){
        try {
            List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:id ORDER BY Page_Number__c ASC];
            return pageList;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formpagedetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string sendemailaftersubmission(Id formid, Id submissionid){
        try {
            Notification__c notify = [SELECT Id,To_Recipients__c,CC_Recipients__c,BCC_Recipients__c,Subject__c,Email_Body__c,Attachment__c FROM Notification__c WHERE Form__c =: formid];
            String recipientList = notify.To_Recipients__c;
            String ccmaillist = notify.CC_Recipients__c;
            String messageBody = notify.Email_Body__c;
            String messageSubject = notify.Subject__c;
            boolean attachmentpdf = notify.Attachment__c;
            List<String> ccAddresses = new List<String>();
            List<String> toAddresses = recipientList.split(',');

            // ccmaillist = ccmaillist.replace('[','').replace(']','').replace('"','');
            if(String.isNotBlank(ccmaillist)){
            ccAddresses = ccmaillist.split(',');
            }

            if(toAddresses.size() != 0 ){
                Messaging.SingleEmailMessage emailNotification = new Messaging.SingleEmailMessage();
                emailNotification.setToAddresses(toAddresses);
                // emailNotification.setReplyTo(replyToEmail);
                if(ccAddresses.size() > 0){
                    emailNotification.setCCaddresses(ccAddresses);
                }
                // else if(ccAddresses.size() != 1){
                //     emailNotification.setCCaddresses(ccAddresses);
                // }
                emailNotification.setSubject(messageSubject);
                emailNotification.setHtmlBody(messageBody);

                if(attachmentpdf == true){
                    String pdf_url = '/apex/PDFGenerator?Id='+submissionid;
                    PageReference pdfPage = new PageReference(pdf_url);
                    Blob pdfContent;
                    if(Test.isRunningTest()) { 
                        pdfContent = blob.valueOf('Unit.Test');
                    }
                    else{
                        pdfContent = pdfPage.getContentAsPDF();
                    }
                    Messaging.EmailFileAttachment emailAttachment = new Messaging.EmailFileAttachment();
                    emailAttachment.setFileName('testpdf.pdf');
                    emailAttachment.setBody(pdfContent);
                    emailNotification.setFileAttachments(new Messaging.EmailFileAttachment[]{emailAttachment});
                }
                Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {emailNotification});
            }
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}