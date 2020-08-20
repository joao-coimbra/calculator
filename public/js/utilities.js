export function addEventListenerAll(element, events, fn) {

    events.split(' ').forEach(event => {

        element.addEventListener(event, fn, false);

    })

};

export function roundedFloat(value, maxRounded) {

    let rounded = maxRounded + 1, resultRounded, n, x, h = 0;

    value = value.toString();

    resultRounded = value.split('');

    for (let i = resultRounded.length - 1; i >= 0; i--) {

        if (isPoint(resultRounded[i])) {
            n = resultRounded.length - 1 - i;

            if (n > rounded) {

                for (let j = n; j > rounded; j--) resultRounded.pop();

                if (parseInt(lastNumberResult()) < maxRounded) { resultRounded.pop() }
                else {	
                    resultRounded.pop();	

                    while (h < Infinity) { 	

                        if(isPoint(lastNumberResult())) { x = 2 }	
                        else { x = 1 }	

                        if(resultRounded[resultRounded.length - x] == "9") { resultRounded.pop() }
                        else {	
                            resultRounded[resultRounded.length - x] = parseInt(resultRounded[resultRounded.length - x]) + 1;	
                            break;	
                        }

                    }

                }

                for (let k = rounded; k > 0; k--) {
                    if (lastNumberResult() == "0") resultRounded.pop();
                }

                if (isPoint(lastNumberResult())) resultRounded.pop();

            }

        }

    }

    return resultRounded.join('');

    // adjunct
    function isPoint(value) {

        return (['.'].indexOf(value) > -1);

    }

    function lastNumberResult() {	

        return resultRounded[resultRounded.length - 1];

    }

}