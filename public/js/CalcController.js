import { addEventListenerAll } from './utilities.js';
import { roundedFloat } from './utilities.js';

export class CalcController {

    constructor() {

        this._lastOperatorMemory = '';
        this._arrayOfLastNumber = [];
        this._lastNumber = '';
        this._operation = [];
        this._lastOperator = [];
        this._locale = navigator.language;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#time');
        this._memoryEl = document.querySelector('#memory');
        this._lastDisplayCalc = '';
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        setInterval(() => {

            this.setDisplayDateTime();

        });

        this.setLastNumberToDisplay();

    }

    clearAll(value) {

        this._operation = [];
        this._arrayOfLastNumber = [];

        if (!value) {
            this.setLastNumberToDisplay();
        }

        this._lastOperator = [];

    }

    clearEntry() {

        this._operation.pop();
        this._arrayOfLastNumber = [];

        this._lastOperator = [];

        this.setLastNumberToDisplay();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%', '='].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) this.calc();

    }

    getResult() {
        return eval(this._operation.join(''));
    }

    calc() {

        console.log(this._lastOperator)

        let lastOperator = this._operation[1];

        if (this._operation.length > 3) {

            let last = this._operation.pop();

            this._lastNumber = this.getResult();

            if (last == '%') {

                switch (lastOperator) {
                    case '+':
                        this._lastNumber = this._operation[0] + this._operation[0] * this._operation[2] / 100;
                        break;
                    case '-':
                        this._lastNumber = this._operation[0] - this._operation[0] * this._operation[2] / 100;
                        break;
                    case '/':
                        this._lastNumber *= 100;
                        break;
                    case '*':
                        this._lastNumber /= 100;
                        break;
                    
                    default:
                        this.setError();
                        break;
                    }

                this._operation = [roundedFloat(this._lastNumber, 5)];

            } else { 

                this._operation = [roundedFloat(this._lastNumber, 5), last];

            }

        } else if (this._operation.length <= 2) {

            if (this.isOperator(this._lastOperator[this._lastOperator.length - 2])) {

                if (this._lastOperator[this._lastOperator.length - 2] == "=") {

                    this._operation.push(this._lastOperatorMemory, this._lastDisplayCalc);

                    this._lastNumber = this.getResult();

                    this.calc();

                    this._operation = [roundedFloat(this._lastNumber, 5)];

                } else {

                    this._lastDisplayCalc = this.displayCalc;
                    this._lastOperatorMemory = this._operation[1];

                    this.pushOperation(this._lastDisplayCalc);

                    this._lastNumber = this.getResult();

                    this.calc();

                }
            }

        } else {

            this._lastDisplayCalc = this._operation[this._operation.length - 1];
            this._lastOperatorMemory = this._operation[this._operation.length - 2];

            if (lastOperator == '%') {
    
                this._lastNumber = this._operation[0] * this._operation[2] / 100;

            } else {

                if (!this._lastOperator[this._lastOperator.length - 2] == "=") {

                    this._lastDisplayCalc = this.displayCalc;
                    this._lastOperatorMemory = this._operation[1];

                }
            
                this._lastNumber = this.getResult();

            }

            this._operation = [roundedFloat(this._lastNumber, 5)];

        }

        this.setLastNumberToDisplay();

    }

    updateCalculator(value) {

        this.setLastOperation(value);
        this.setLastNumberToDisplay();
        this.setMemoryDisplay();

    }

    squared() {

        let last;

        if(this._operation.length == 0) {
            this._operation = ["0"];
            last = this._operation[0];
        } else {
            last = this._operation[this._operation.length - 1];
        }

        if(isNaN(last)) {
            //string
            return false;
        } else {

            last **= 2;

        }

        this.updateCalculator(roundedFloat(last, 2));

    }

    divX() {

        let last;

        if(this._operation.length == 0) {
            return false;
        } else {
            last = this._operation[this._operation.length - 1];
        }

        if(isNaN(last)) {
            //string
            return false;
        } else if(last == 0){ 
            this.setError();
        } else { 
            last = 1 / last;
        }

        this.updateCalculator(roundedFloat(last, 2));

    }

    invertValue() {

        let last;

        if(this._operation.length == 0) {
            this._operation = ["0"];
            last = this._operation[0];
        } else {
            last = this._operation[this._operation.length - 1];
        }

        if(isNaN(last)) {
            //string
            return false;
        } else {

            last *= -1;

        }

        this.updateCalculator(last);

    }

    squareRoot() {

        let last;

        if(this._operation.length == 0) {
            this._operation = ["0"];
            last = this._operation[0];
        } else {
            last = this._operation[this._operation.length - 1].toString();
        }

        if(isNaN(last)) {
            //string
            return false;
        } else {

            if(last < 0) {
                this.setError();
            } else {
                last = Math.sqrt(last);
            }

        }

        this.updateCalculator(roundedFloat(last, 2));

    }

    backspace() {

        let last = this._operation[this._operation.length - 1].toString();

        if(isNaN(last)) {
            //string
            return false;
        } else {
            //number
            let backLastNumber = last.split('');

            if(backLastNumber[0] === '-') {

                if(backLastNumber.length > 2) {

                    backLastNumber.pop();
    
                } else {
    
                    if(backLastNumber[backLastNumber.length - 1] != "0") {
    
                        backLastNumber[backLastNumber.length - 1] = "0";
                        this.setMemoryDisplay();
    
                    } else { return false }

                }

            } else {

                if(backLastNumber.length > 1) {

                    backLastNumber.pop();
    
                } else {
    
                    if(backLastNumber[backLastNumber.length - 1] != "0") {
    
                        backLastNumber[backLastNumber.length - 1] = "0";
                        this.setMemoryDisplay();
    
                    } else { return false }

                }

            }          

            last = parseInt(backLastNumber.join(''));

            this.updateCalculator(last);
        }

        this.updateCalculator(roundedFloat(last, 5));

    }

    divX() {

        let last;

        if(this._operation.length == 0) {
            return false;
        } else {
            last = this._operation[this._operation.length - 1];
        }

        if(isNaN(last)) {
            //string
            return false;
        } else if(last == 0){ 
            this.setError();
        } else { 
            last = 1 / last;
        }

        this.updateCalculator(roundedFloat(last, 5));

    }

    invertValue() {

        let last;

        if(this._operation.length == 0) {
            this._operation = ["0"];
            last = this._operation[0];
        } else {
            last = this._operation[this._operation.length - 1];
        }

        if(isNaN(last)) {
            //string
            return false;
        } else {

            last *= -1;

        }

        this.updateCalculator(last);

    }

    squareRoot() {

        let last;

        if(this._operation.length == 0) {
            this._operation = ["0"];
            last = this._operation[0];
        } else {
            last = this._operation[this._operation.length - 1].toString();
        }

        if(isNaN(last)) {
            //string
            return false;
        } else {

            if(last < 0) {
                this.setError();
            } else {
                last = Math.sqrt(last);
            }

        }

        this.updateCalculator(roundedFloat(last, 5));

    }

    backspace() {

        let last = this._operation[this._operation.length - 1].toString();

        if(isNaN(last)) {
            //string
            return false;
        } else {
            //number
            let backLastNumber = last.split('');

            if(backLastNumber[0] === '-') {

                if(backLastNumber.length > 2) {

                    backLastNumber.pop();
    
                } else {
    
                    if(backLastNumber[backLastNumber.length - 1] != "0") {
    
                        backLastNumber[backLastNumber.length - 1] = "0";
                        this.setMemoryDisplay();
    
                    } else { return false }

                }

            } else {

                if(backLastNumber.length > 1) {

                    backLastNumber.pop();
    
                } else {
    
                    if(backLastNumber[backLastNumber.length - 1] != "0") {
    
                        backLastNumber[backLastNumber.length - 1] = "0";
                        this.setMemoryDisplay();
    
                    } else { return false }

                }

            }          

            last = parseInt(backLastNumber.join(''));

            this.updateCalculator(last);
        }

    }

    setLastNumberToDisplay() {

        let lastNumber;

        for(let i = this._operation.length-1; i >= 0; i--) {

            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }

        }

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    setMemoryDisplay() {

        let memory = this._operation.join(' ');

        this.displayMemory = memory;

    }

    addOperation(value) {

        if(this.displayCalc.split('').length > 11) {
            this.isOverEleven();
        } else {

            if (isNaN(this.getLastOperation())) {
                // string
                if (this.isOperator(value)) {
                    //change operator
                    this.setLastOperation(value);

                } else {

                    this.pushOperation(value);

                    this.setLastNumberToDisplay();

                }

            } else {
                //number
                if(this.isOperator(value)) {

                    this.pushOperation(value);

                } else {

                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(parseFloat(newValue));

                    this.setLastNumberToDisplay();

                }

            }

        }

        this.setMemoryDisplay();

    }

    setError() {

        this.displayCalc = "Error";

    }

    execBtn(value, bool) {

        switch (value) {

            case 'c':
                this.clearAll();
                this.setMemoryDisplay();
                break;
            case 'ce':
                this.clearEntry();
                this.setMemoryDisplay();
                break;
            case '+':
                this.addOperation('+');
                break;
            case '-':
                this.addOperation('-');
                break;
            case '*':
                this.addOperation('*');
                break;
            case '/':
                this.addOperation('/');
                break;
            case '=':
                this.calc();
                this.setMemoryDisplay();
                break;
            case '%':
                this.addOperation('%');
                break;
            case '√':
                this.squareRoot();
                break;
            case 'x²':
                this.squared();
                break;
            case '¹/x':
                this.divX();
                break;
            case ',':
                this.addPoint(',');
                break;
            case '±':
                this.invertValue();
                break;

            case 'backspace':
                this.backspace();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (bool) this.clearAll('=');
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll('.container button');

        buttons.forEach((btn, index) => {

            addEventListenerAll(btn, 'click drop', e => {

                let txtBtn = btn.className.split(' ')[1].replace('btn-','');

                this._lastOperator.push(txtBtn);

                if (this.isOperator(this._lastOperator[this._lastOperator.length - 1])) this._arrayOfLastNumber = [];

                if (this._lastOperator[this._lastOperator.length - 2] == "=") {

                    if (this._lastOperator[this._lastOperator.length - 1] == "=") {

                        this.execBtn(txtBtn);

                    } else {

                        this.execBtn(txtBtn, true);

                    }

                } else {
                    this.execBtn(txtBtn);
                }
    
            })

        })

    }

    isPoint(value) {

        return (['.'].indexOf(value) > -1);

    }

    aPointHere(value) {

        for (let i = 0; i <= value.length; i++) {

            if (this.isPoint(value[i])) {

                return true;

            }

        }

    }

    addPoint() {

        let lastOperation = this.getLastOperation();

        console.log("antes dos coiso " + this._arrayOfLastNumber);

        if (!this.aPointHere(this._arrayOfLastNumber)) {

            if (this.isOperator(lastOperation) || !lastOperation) {

                this.pushOperation('0.');

            } else {

                this.setLastOperation(lastOperation.toString() + '.');

            }

        }

        let lastNumberMemory = this._operation[0].toString();
        this._arrayOfLastNumber = lastNumberMemory.split('');

        console.log("depois dos coiso " + this._arrayOfLastNumber);

        this.setLastNumberToDisplay();

    }

    setDisplayDateTime() {

        this.displayDate = new Date().toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = new Date().toLocaleTimeString(this._locale);

    }

    get displayMemory() { 
        return this._memoryEl.innerHTML;
    }

    set displayMemory(value) {
        return this._memoryEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        return this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        return this._currentDate = value;
    }

}