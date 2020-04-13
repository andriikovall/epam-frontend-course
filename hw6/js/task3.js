$(document).ready(function() {
    let isTicking = false;
    let time;
    const stepMseconds = 10;

    resetTime();

    function resetTime() {
        time = new Date(0);
    }

    $('#reset').click(function() {
        resetTime();
        setTimerValue(0, 0);
        isTicking = false;
    });

    $('#go-stop').click(function() {
        isTicking = !isTicking;
    });

    function updateTimer() {
        if (isTicking) {
            time.setMilliseconds(time.getMilliseconds() + stepMseconds);
            setTimerValue(time.getSeconds(), time.getMilliseconds());
        }
    }

    function setTimerValue(seconds, milliseconds) {
        $('.screen').text(`${normalizeNumberToString(seconds, 2)}:${normalizeNumberToString(milliseconds, 2)}`);
    }

    function normalizeNumberToString(num, length) {
        const numberStringified = num.toString();
        if (numberStringified.length > length) {
            return numberStringified.slice(0, length);
        } else if (numberStringified.length < length) {
            return '0'.repeat(length - numberStringified.length) + numberStringified;
        }
        return numberStringified;
    }

    setInterval(updateTimer, stepMseconds);

});