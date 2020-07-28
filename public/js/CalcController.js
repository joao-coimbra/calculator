import { addEventListenerAll } from './utilities.js';

export class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#time');
        this._memoryEl = document.querySelector('#memory');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        this.displayCalc = 0;

        setInterval(() => {

            this.setDisplayDateTime();

        });

    }

    clearAll() {

        this._operation = [];

        this.displayCalc = 0;

    }

    clearEntry() {

        this._operation.pop();

        this.displayCalc = 0;

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    calc() {

        if (this._operation.length > 3) {

            let last = this._operation.pop();

            let result = eval(this._operation.join(''));

            this._operation = [result, last];

            this.setLastNumberToDisplay();

        } else {

            let result = eval(this._operation.join(''));

            this._operation = [result];

            this.setLastNumberToDisplay();

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

        this.displayCalc = lastNumber;

    }

    setMemoryDisplay() {

        let memory = this._operation.join(' ');

        console.log(memory);

        this.displayMemory = memory;

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            // string
            if (this.isOperator(value)) {
                //change operator
                this.setLastOperation(value);

            } else if(isNaN(value)) {

                console.log('other' + value);

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
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

        console.log(this._operation);

        this.setMemoryDisplay();

    }

    setError() {

        this.displayCalc = "Error";

    }

    execBtn(value) {

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
            case ',':
                this.addOperation(',');
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

                console.log(txtBtn);
                this.execBtn(txtBtn);
    
            })

        })

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