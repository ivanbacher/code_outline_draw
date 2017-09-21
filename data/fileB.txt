//https://github.com/angus-c/just

function array_manipulator() {

    function compact(arr) {
        if (!Array.isArray(arr)) {
            return undefined;
        }
        var result = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var elem = arr[i];
            if (elem) {
                result.push(elem);
            }
        }
        return result;
    }

    function flatten(arr) {
        var result = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var elem = arr[i];
            if (Array.isArray(elem)) {
                result.push.apply(result, flatten(elem));
            } else {
                result.push(elem);
            }
        }
        return result;
    }

    function index(arr, key) {
        if (!Array.isArray(arr)) {
            return undefined;
        }

        if (typeof key !== 'string') {
            return undefined;
        }

        var result = {};
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            var index = arr[i] && arr[i][key];

            if (index) {
                result[index] = arr[i];
            }
        }

        return result;
    }

    function insert(arr1, arr2, index) {
        if (!Array.isArray(arr2)) {
            arr2 = [arr2];
        }
        if (!index) {
            return arr2.concat(arr1);
        }
        var front = arr1.slice(0, index);
        var back = arr1.slice(index);
        return front.concat(arr2, back);
    }

    function intersect(arr1, arr2) {
        var result = [];
        var len = arr1.length;
        for (var i = 0; i < len; i++) {
            var elem = arr1[i];
            if (arr2.indexOf(elem) > -1) {
                result.push(elem);
            }
        }
        return result;
    }

    function last(arr) {
        return arr != null ? arr[arr.length - 1] : undefined;
    }

    function random(arr) {
        return arr != null ? arr[Math.floor(Math.random() * arr.length)] : undefined;
    }

    function range(start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if (step == null) {
            step = stop > start ? 1 : -1;
        }
        var toReturn = [];
        var increasing = start < stop; //← here’s the change
        for (; increasing ? start < stop : start > stop; start += step) {
            toReturn.push(start);
        }
        return toReturn;
    }

    function remove(arr1, arr2) {
        var result = [];
        var len = arr1.length;
        for (var i = 0; i < len; i++) {
            var elem = arr1[i];
            if (arr2.indexOf(elem) == -1) {
                result.push(elem);
            }
        }
        return result;
    }

    function shuffle(arr) {
        if (!arr || !('length' in arr)) {
            return undefined;
        }
        var len = arr.length;
        var result = Array(len);
        for (var i = 0, rand; i < len; i++) {
            rand = Math.floor(Math.random() * i);
            if (rand != i) {
                result[i] = result[rand];
            }
            result[rand] = arr[i];
        }
        return result;
    }

    function tail(arr) {
        return arr != null ? arr.slice(1) : undefined;
    }

    function union(arr1, arr2) {
        var result = arr1.concat([]);
        var len = arr2.length;
        for (var i = 0; i < len; i++) {
            var elem = arr2[i];
            if (arr1.indexOf(elem) == -1) {
                result.push(elem);
            }
        }
        return result;
    }

    function unique(arr, sorted, strings) {
        if (!sorted && strings && (arr[0] !== Object(arr[0]))) {
            return stringUnique(arr);
        }
        var result = [],
            duplicate, lastAdded;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var elem = arr[i];
            duplicate = lastAdded && (lastAdded === elem);
            if (!duplicate && !sorted) {
                duplicate = result.indexOf(elem) > -1;
            }
            if (!duplicate) {
                result.push(elem);
                lastAdded = elem;
            }
        }
        return result;

        function stringUnique(arr) {
            var lookup = {};
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                lookup[arr[i]] = true;
            }
            return Object.keys(lookup);
        }
    }

    var AM = {
        compact: compact,
        flatten: flatten,
        index: index,
        insert: insert,
        intersect: intersect,
        last: last,
        random: random,
        range: range,
        remove: remove,
        shuffle: shuffle,
        tail: tail,
        union: union,
        unique: unique
    }

    return AM;
}

var ar = array_manipulator();

var sample_arrays = [];

sample_arrays.push(ar.shuffle(ar.range(1,10)));
sample_arrays.push(ar.shuffle(ar.range(1,20)));
sample_arrays.push(ar.shuffle(ar.range(1,30)));
sample_arrays.push(ar.shuffle(ar.range(1,40)));

sample_arrays.forEach( function(arr,i) {
    console.log(arr);

    var lastEl = ar.last(arr);
    console.log(`last element of arrary ${i} is ${lastEl}`);
});
