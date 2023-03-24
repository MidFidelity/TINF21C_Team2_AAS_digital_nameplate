const FILTER_KEYS = ["nameplateId", "num", "nameplate\.idShort", "nameplate\.id", "productImages\.*", ".*idEncoded"];

function transformDataToArray(obj) {
    console.log('Original obj:');
    console.log(obj);

    let markings;
    ({data: obj, markings} = separateMarkings(obj));
    console.log('markings:');
    console.log(markings);

    obj = flattenObject(obj);
    console.log('flattenObject():');
    console.log(obj);

    let unwantedKeys;
    ({data: obj, unwantedKeys} = extractUnwantedKeys(obj, FILTER_KEYS));
    console.log('unwantedKeys:');
    console.log(unwantedKeys);
    console.log('Resulting obj:');
    console.log(obj);

    obj = shortenFlattenedKeys(obj);
    console.log('shortenFlattenedKeys():')
    console.log(obj);
    
    obj = filterEmptyValues(obj);
    console.log('filterEmptyValues():');
    console.log(obj);
    // Object.entries() aufrufen
    
    /*
    let list = Object.entries(obj);
    console.log('Object.entries():');
    console.log(list);

    let filteredKeyValues = filterEmptyEntries(keyValues);
    console.log('filterEmptyEntries():');
    console.log(filteredKeyValues); 
*/
}

/**
 * Pulls every [key, value]-array out of an entire [key, value]-array-hierarchy to root level.
 * @param list
 * @returns {*[]}
 */
function recursiveExtract(list) {
    let result = [];
    if (list.length === 0) {
        return [];
    }
    list.forEach((elem) => {
        if (typeof elem[1] == "string" || typeof elem[1] == "number" || Array.isArray(elem[1])) {
            result.push(elem);
            return;
        }
        result = result.concat(recursiveExtract(Object.entries(elem[1])));
    })
    return result;
}

/**
 * Removes all key-values pairs where value is falsy (undefined, null, ...). IMPORTANT: obj must be flattened.
 * @param obj
 * @returns {*}
 */
function filterEmptyValues(obj) {
    let result = {};
    let array = Object.entries(obj);
    let reduced = array.filter((elem) => elem[1]);
    reduced.forEach((elem) => result[elem[0]] = elem[1]);
    return result;
}

/**
 * Returns the markings of a nameplate object and removes them from the object.
 * @param obj
 */
function separateMarkings(obj) {
    let data = structuredClone(obj);
    if (data.nameplate.Markings) {
        let markings = data.nameplate.Markings;
        delete data.nameplate.Markings;
        return {data, markings};
    }
    return {data, undefined};
}

/**
 * Flattens Object. Hierarchies are displayed with '_'.
 * @param ob
 * @returns {{}}
 */
function flattenObject(ob) {
    let toReturn = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            let flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '_' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

/**
 * Replaces all '.' to '_' in array of strings.
 * @param filters
 * @returns {*[]}
 */
function replaceDotsInArray(filters) {
    let result = [];
    filters.forEach((filter) => result.push(filter.replace('.', '_')));
    return result;
}

/**
 * Returns array of keys of flattened object which match regex.
 * @param obj
 * @param regex
 * @returns {*[]}
 */
function keyMatch(obj, regex) {
    console.log(regex)
    regex = new RegExp(regex);
    let result = [];
    Object.keys(obj).forEach((key) => {
        if (key.match(regex)) {
            result.push(key);
        }
    });
    return result;
}

/**
 * Filters all unwanted keys into a different object.
 * @param obj
 * @param filters
 * @returns {{}}
 */
function extractUnwantedKeys(obj, filters) {
    let data = structuredClone(obj);
    let transformedFilter = replaceDotsInArray(filters);
    let unwantedKeys = {};
    transformedFilter.forEach((filter) => {
        let keys = keyMatch(data, filter);
        keys.forEach((key) => {
            if (data[key]) {
                unwantedKeys[key] = data[key];
                delete data[key];
            }
        });
    });
    return {data, unwantedKeys};
}

/**
 * Reduces all keys of flattened object to their last part. Partition is done by '_'.
 */
function shortenFlattenedKeys(obj) {
    let result = {};
    let data = Object.entries(obj);
    data.forEach((elem) => {
        let key = elem[0];
        let value = elem[1];
        let keyParts = key.split('_');
        let amountOfParts = keyParts.length;
        key = keyParts[amountOfParts-1];
        result[key] = value;
    });
    return result;
}
