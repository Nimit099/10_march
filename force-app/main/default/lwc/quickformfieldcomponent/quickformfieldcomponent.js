import getFieldCSS from '@salesforce/apex/FormBuilderController.getFieldCSS';
import getLabelCSS from '@salesforce/apex/FormBuilderController.getLabelCSS';
import getHoverCSS from '@salesforce/apex/FormBuilderController.getHoverCSS';
import getFocusCSS from '@salesforce/apex/FormBuilderController.getFocusCSS';
import { LightningElement, api, wire, track } from 'lwc';
import EmojiRating1 from '@salesforce/resourceUrl/EmojiRating1';
import EmojiRating5 from '@salesforce/resourceUrl/EmojiRating5';
import EmojiRating2 from '@salesforce/resourceUrl/EmojiRating2';
import EmojiRating3 from '@salesforce/resourceUrl/EmojiRating3';
import EmojiRating4 from '@salesforce/resourceUrl/EmojiRating4';
import getScaleRating from '@salesforce/apex/FormBuilderController.getScaleRating';

export default class Quickformfieldcomponent extends LightningElement {

    // icons
    emojiRating1 = EmojiRating1;
    emojiRating2 = EmojiRating2;
    emojiRating3 = EmojiRating3;
    emojiRating4 = EmojiRating4;
    emojiRating5 = EmojiRating5;

    @api compview = '';
    @api tView = '';
    @api disableField = '';
    @api fieldAttribute = '';
    @api fieldAttributeValue = '';
    @api fieldId = '';
    @api formid = '';
    @track scaleRating = [];
    @track isFieldDesabled = false;

    @track FieldShown = true;
    @track LabelShown = true;
    // @api isReqired;
    @api isReqired = '';
    @track fieldHelpText = 'please fill the help text';
    @track fieldValidations = '';
    FieldLabel = '';
    FieldType = '';
    count = '';
    @track Address = 'Address';
    @track onfocus = false;
    @api getLabelCSS1 = '';
    @api hovercssproperty = '';
    @api focuscssproperty ='';
    @api labelvalue = '';
    @api labelcheck = '';
    @api salutationvalue = '';
    @api helptextcheck = '';
    @api helptextvalue = '';
    @api isdisabled = '';
    @api placeholder = '';
    @api fieldtype = '';
    @api termsAndConditionValue = '';
    @track focused = '';
    @api fieldcss = '';
    @track updatedfieldcss = this.fieldcss;

    connectedCallback() {
        getScaleRating()
            .then(result => {
                if(result != undefined) {
                    this.scaleRating = result;
                    console.log(result);
                }
            }).catch(err => {
                console.log(err);
            })
        console.log('c callback ');

        this.onfocus = false;
    }

    renderedCallback() {
        console.log('quickformfield rendered callback!');
        if (this.formid != undefined){
            console.log('formid --> ' + this.formid);
        }


        try {
            if( this.fieldcss != undefined){   
                console.log('fieldcss rendered callback -->> '+ this.fieldcss);
                let array = this.template.querySelectorAll('.slds-input');
                let str = this.fieldcss;
                this.updatedfieldcss = str;
                console.log(this.fieldcss + 'split');
                if (str != undefined){
                    let Arr = str.split(';color:');
                    let Arr2 = Arr[1].split(';');
                    console.log('OUTPUT ARR2: ',JSON.stringify(Arr2));
                    let pcolor = Arr2[0];
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        element.style = str;
                        element.style.setProperty("--c", pcolor);
                    }
                }
   
                array = this.template.querySelectorAll('.flabel');
                if (this.labelcss != undefined){
                    str = this.labelcss;
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        element.style = 'display:flex;' + str;
                    }
                    let array2 = this.template.querySelectorAll('.slds-popover--tooltip ');
                    let str2 = ((this.labelcss.split('margin-top:'))[1].split(';'))[0];
                    console.log('OUTPUT STR2: ',str2);
                    for (let j = 0; j < array2.length; j++) {
                        const element = array2[j];
                        element.style = 'margin:top:' + str2;
                    }
                }
            }
        } catch (error) {
            console.log('fielderror' + error);
        }        


        // getFieldCSS({ id: this.formid })
        //     .then(result => {
        //         console.log(result);
        //         this.getFieldCSS1 = result;
        //         this.fieldcss = result;
        //         console.log('renderedCallback fieldcss --> '+this.fieldcss);
        //         console.log('FieldCSS->> ' + this.getFieldCSS1);
        //         console.log(this.template.querySelectorAll('.slds-input'));
        //         console.log(this.template.querySelectorAll('.areatext'));
        //         let array = this.template.querySelectorAll('.slds-input');
        //         console.log(array.length);
        //         let str = this.getFieldCSS1;
        //         let Arr = str.split(';color:');
        //         let Arr2 = Arr[1].split(';');
        //         let pcolor = Arr2[0];
        //         for (let i = 0; i < array.length; i++) {
        //             const element = array[i];
        //             element.style = str;
        //             element.style.setProperty("--c", pcolor);
        //         }
        //         this.template.querySelector('select').style = str;
        //     }).catch(error => {
        //         console.log('quickformfield --> ' + { error });
        //     })

        getLabelCSS({ id: this.formid })
            .then(result => {
                console.log(result);
                if (result != undefined){
                    this.getLabelCSS1 = result;
                    console.log('rendered LabelCSS->> ' + this.getLabelCSS1);
                    console.log(this.template.querySelectorAll('.flabel'));
                    let array = this.template.querySelectorAll('.flabel');
                    console.log(array.length);
                    let str = this.getLabelCSS1;
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        element.style = 'display:flex;' + str;
                    }
                    let array2 = this.template.querySelectorAll('.slds-popover--tooltip ');
                    console.log(array2.length);
                    let str2 = ((this.getLabelCSS1.split('margin-top:'))[1].split(';'))[0];
                    for (let j = 0; j < array2.length; j++) {
                        const element = array2[j];
                        element.style = 'margin:top:' + str2;
                    }
                    const event1 = CustomEvent('startsppiner');
                    this.dispatchEvent(event1);
                }
            }).catch(error => {
                console.log({ error });
                const event1 = CustomEvent('startsppiner');
                this.dispatchEvent(event1);
            })

    }

    @api FieldCSSUpdate(CSSString) {
        if (CSSString != undefined ){
            console.log('FieldCSSUpdate FieldCSS->> checking ' + CSSString);
            try {
                this.updatedfieldcss = CSSString;
                console.log(this.template.querySelectorAll('.slds-input'));
                let array = this.template.querySelectorAll('.slds-input');
                console.log(array.length);
                let str = '';
                if (CSSString == undefined || CSSString == null || CSSString == '') {
                    console.log('FieldCSSUpdate inside IF');
                    if (this.fieldcss != undefined){
                        str = this.fieldcss;
                    }
                } else {
                    console.log('FieldCSSUpdate inside ELSE');
                    str = CSSString;
                }
                console.log('str ===> ',JSON.stringify(str));
                if (str != undefined){
                    let Arr = str.split(';color:');
                    let Arr2 = Arr[1].split(';');
                    let pcolor = Arr2[0];
                    if (pcolor != undefined || pcolor != null){
                        for (let i = 0; i < array.length; i++) {
                            const element = array[i];
                            element.style = str;
                        element.style.setProperty("--c", pcolor);
                        }
                    }
                }
                // this.template.querySelector('select').style = str;
            } catch (error) {
                console.log("In the catch block ==> Method :** FieldCSSUpdate ** || LWC:** quickformfieldcomponent ** ==>", { error });
                console.log('above error ==>' + error);
            }
        }
    }

    @api LabelCSSUpdate(CSSString) {
        getLabelCSS({ id: this.formid })
            .then(result => {
                console.log(result);
                if (result != undefined){
                    this.getLabelCSS1 = result;
                    console.log('LabelCSS->> ' + this.getLabelCSS1);
                    console.log(this.template.querySelectorAll('.flabel'));
                    let array = this.template.querySelectorAll('.flabel');
                    console.log(array.length);
                    let str = this.getLabelCSS1;
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        element.style = 'display:flex;' + str;
                    }
                    let array2 = this.template.querySelectorAll('.slds-popover--tooltip');
                    console.log(array2.length);
                    let str2 = ((this.getLabelCSS1.split('margin-top:'))[1].split(';'))[0];
                    if (str2 != undefined){
                        for (let j = 0; j < array2.length; j++) {
                            const element = array2[j];
                            element.style = 'margin:top:' + str2;
                        }
                    }
                }
            }).catch(error => {
                console.log({ error });
            })
    }

    @api handleeffect(type, property) {
        if (type !=  null && type != undefined && property != null && property != undefined){
            if (type == 'hover') {
                this.hovercssproperty = property;
            }
            else if (type == 'focus') {
                this.focuscssproperty = property;
            }
        }
    }

    handlehover(event) {
        if (this.hovercssproperty != undefined){
        console.log('onhover hovercssproperty --> '+this.hovercssproperty);
        let str = this.hovercssproperty;
        console.log('onhover str --> '+str);
        console.log('target id -->>>> '+event.target.dataset.id);
        if (this.onfocus) {
            if (event.target.dataset.id == undefined || event.target.dataset.id == null) {
                this.handlefocus(event)
            } else {
                if (event.target.dataset.id == this.focused){
                    this.handlefocus(event)
                } else {
                    event.target.style = str;
                }
            }
            } else {
                event.target.style = str;
            }
        }
    }

    handlefocus(event) {
            if (this.focuscssproperty != undefined){
            console.log('handlefocus ***');
            console.log('this.onfocus --> ', this.onfocus);
            console.log('focus FieldCSS->> ' + this.focuscssproperty);
            if (event.target.dataset.id != undefined && event.target.dataset.id != null) {
                this.focused = event.target.dataset.id;
            }
            let str = this.focuscssproperty;
            event.target.style = str;
            this.onfocus = true;
            console.log('this.onfocus --> ', this.onfocus);
        }
    }

    handleblur(event) {
        console.log('Blur On Field');
        console.log(event);
        if (this.onfocus != undefined){
            console.log('this.onfocus --> ', this.onfocus);
            if (this.onfocus) {
                if (event.target.dataset.id == undefined || event.target.dataset.id == null) {
                    this.handlefocus(event)
                } else {
                    if (event.target.dataset.id == this.focused){
                        this.handlefocus(event)
                    } else {
                        console.log('handleblur fieldcss --> '+this.fieldccs);
                        event.target.style = this.fieldcss;
                    }
                }
            } else {
                console.log('handleblur fieldcss --> '+this.fieldccs);
                event.target.style = this.fieldcss;
            }
        }
    }

    handleblur1(event) {
        console.log('Blur On Field');
        console.log(event);
        console.log('this.onfocus --> ', this.onfocus);
        this.onfocus = false;
        console.log('handleblur1 updatedfieldcss --> '+this.updatedfieldcss);
        if (this.fieldcss != undefined){
            event.target.style = this.fieldcss
        }
        if (this.updatedfieldcss != undefined){
            this.FieldCSSUpdate(this.updatedfieldcss)
        }
    }

    get CheckBoxOp() {
        return [
            { label: 'first', value: 'option1' },
            { label: 'second', value: 'option2' },
        ];
    }
    
   
    @track placeHolder = 'New Field';
    get isFieldCompView() {
        return this.compview == 'Field';
    }
    get isFullView() {
        return this.compview == 'Full';
    }
    get isTrueEmail() {
        this.tView = this.tView.split(',')[0];
        return this.tView == 'QFEMAILID' || this.FieldLabel == 'QFEMAILID';
    }

    get isTrueFullName() {

        return this.tView == 'QFFULLNAME' || this.FieldLabel == 'QFFULLNAME';
    }
    get isTrueName() {
        return this.tView == 'QFNAME' || this.FieldLabel == 'QFNAME';
    }
    get isTrueAddress() {
        return this.tView == 'QFADDRESS' || this.FieldLabel == 'QFADDRESS';
    }
    get isTruePhone() {
        return this.tView == 'QFPHONE';
    }
    get isTrueCheckBox() {
        return this.tView == 'QFCHECKBOX';
    }
    get isTruePageBreak() {
        return this.tView == 'QFPAGEBREAK';
    }
    get isTrueShortText() {
        return this.tView == 'QFSHORTTEXT';
    }
    get isTrueLongText() {
        return this.tView == 'QFLONGTEXT';
    }
    get isTrueFileUpload() {
        return this.tView == 'QFFILEUPLOAD';
    }
    get isTrueRadioButton() {
        return this.tView == 'QFRADIOBUTTON';
    }
    get isTrueDropDown() {
        return this.tView == 'QFDROPDOWN';
    }
    get isTrueNumber() {
        return this.tView == 'QFNUMBER';
    }
    get isTruePrice() {
        return this.tView == 'QFPRICE';
    }


    get isTrueDate() {
        return this.tView == 'QFDATE';
    }

    get isTrueTime() {
        return this.tView == 'QFTIME';
    }
    get isTrueDateTime() {
        return this.tView == 'QFDATETIME';
    }
    get isTrueRating() {
        return this.tView == 'QFRATING';
    }
    get isTrueEmojiRating() {
        return this.tView == 'QFEMOJIRATING';
    }
    get isTrueScaleRating() {
        return this.tView == 'QFSCALERATING';
    }
    get isTrueTerms() {
        return this.tView == 'QFTERMSOFSERVICE';
    }
    get isTrueLink() {
        return this.tView == 'QFLINK';
    }
    get isTrueSign() {
        return this.tView == 'QFSIGNATURE';
    }
    get isTrueRichText() {
        console.log('inside the true rich text');
        return this.tView == 'QFRICHTEXT';
    }

    get isTruePageBreak() {
        return this.tView == 'QFPAGEBREAK';
    }

    OnFieldClick(event) {

    }

    signInit(event) {
        var canvas, ctx, flag = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            dot_flag = false;
        var x = "black",
            y = 2,
            w, h;
        canvas = this.template.querySelector('signaturefield');
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        w = canvas.width * ratio;
        h = canvas.height * ratio;
        ctx = canvas.getContext("2d");



        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);

        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();
        }, false);
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();

        }, false);

        function findxy(res, e) {
            const rect = canvas.getBoundingClientRect();
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;
                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = x;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                flag = false;
            }
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - rect.left;
                    currY = e.clientY - rect.top;
                    draw(component, ctx);
                }
            }
        }

        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }

    } catch(error) {
        console.log({ error });
    }

    emojiRatingValue(event) {
        try {
            var emojiValue = event.target.value;
            var emojiName = event.target.name;
            if (emojiName != undefined && emojiValue != undefined){
                console.log('emoji Name ==>', emojiName);
                console.log("rating ==>", emojiValue);

                var emojiSelectedEle = this.template.querySelectorAll('.emoji-ratingfield-Selected');
                emojiSelectedEle.forEach(element => {
                    element.classList.remove('emoji-ratingfield-Selected');
                });
                var emojiEle = this.template.querySelector('label[title="' + emojiName + '"]');
                emojiEle.classList.add('emoji-ratingfield-Selected');
            }
        } catch (error) {
            console.log('In the catch part of emojiRatingValue ==>', { error });
        }
    }
}