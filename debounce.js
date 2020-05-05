/**
 * Debounce function
 * 
 * We usually have event listeners which gets called a lot because a lot of events are generated.
 * But processing all events might not be useful.
 * 
 * For example :- we have a autocomplete, where we enter city name to find details about it.
 * 
 * Hence if a person wants to search for Agra
 * 
 * Events generated are on input keypress
 * 
 * 1. A
 * 2. Ag
 * 3. Agra
 * 4. Agra
 * 
 * The above events come in a short burst of time. And only processing the last event should be enough.
 * 
 * Hence a debounce function waits till N secs/milliseconds of inactivity to call a function.
 * In some cases it might be required to call a function at first and then wait for some time.
 */

/**
 * 
 * @param {*} func (function which has to be called)
 * @param {*} wait (inn milliseconds)
 * @param {*} shouldCallFunctionImmedietly 
 */
 const debounce = (func, wait, shouldCallFunctionImmedietly) => {
    let timeoutId;

    return function() {
        const funcCall = () => {
            timeoutId = null;
            if (!shouldCallFunctionImmedietly) {
                func.apply(this, arguments);
            }
        };

        if (shouldCallFunctionImmedietly && !timeoutId) {
            func.apply(this, arguments);
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(funcCall, wait);
    }
 };


module.exports = debounce;