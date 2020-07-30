export function addEventListenerAll(element, events, fn) {

    events.split(' ').forEach(event => {

        element.addEventListener(event, fn, false);

    })

};

export function roundedFloat(value, maxRounded) {

    let result;
    let n;

    value = value.toString();

    result = value.split('');

    for (let i = result.length - 1; i >= 0; i--) {

        if (isPoint(result[i])) {
            n = result.length - 1 - i;

            if (n > maxRounded) {

                for (let j = n; j > maxRounded; j--) {
                    result.pop();
                }

                for (let k = maxRounded; k > 0; k--) {
                    if (result[result.length - 1] == "0") {
                        result.pop();
                    } else {
                        break
                    }
                }

                if (isPoint(result[result.length - 1])) {
                    result.pop();
                }

            }

        }

    }

    return result.join('');

    // adjunct
    function isPoint(value) {

        return (['.'].indexOf(value) > -1);

    }

}