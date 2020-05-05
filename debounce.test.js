const debounce = require('./debounce');
const sinon = require('sinon');

let clock;

beforeEach(() => {
    clock = sinon.useFakeTimers();
});

afterEach(() => {
    clock.restore();
});

test('debounce', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    // Call it immediately
    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // Call it several times with 500ms between each call
    for (let i = 0; i < 10; i++) {
        clock.tick(500);
        debouncedFunc();
    }
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // wait 1000ms
    clock.tick(1000);
    expect(func).toHaveBeenCalledTimes(1);  // func called
});

test('should debounce a function', () => {
    let callCount = 0;

    const debounced = debounce((value) => {
        ++callCount;
        return value;
    }, 32);

    let results = [debounced('a'), debounced('b'), debounced('c')];
    expect(results).toEqual([undefined, undefined, undefined]);
    expect(callCount).toEqual(0);

    clock.tick(128);

    expect(callCount).toEqual(1);

    let results2 = [debounced('d'), debounced('e'), debounced('f')];
    expect(results2).toEqual([undefined, undefined, undefined]);
    expect(callCount).toEqual(1)

    clock.tick(128);

    expect(callCount).toEqual(2)
});
