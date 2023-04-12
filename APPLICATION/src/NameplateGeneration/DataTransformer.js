// 'idEncoded' filters all keys that contain 'idEncoded'
// same goes for 'productImages'
const FILTER_KEYS = ["nameplateId", "num", "nameplate.idShort", "nameplate.id", "productImages", "idEncoded", "TypeOf", "Present", "Logo", "File"];

function transformDataToArray(obj) {
    let markings;
    ({data: obj, markings} = separateMarkings(obj));
    //TODO: remove logs
    console.log('data (before flattened, but with extracted marking data):');
    console.log(obj);
    console.log('markings:');
    console.log(markings)
    obj = flattenObject(obj);
    let unwantedKeys;
    ({data: obj, unwantedKeys} = extractUnwantedKeys(obj, FILTER_KEYS));
    //TODO: remove logs
    console.log('unwantedKeys:');
    console.log(unwantedKeys);
    obj = shortenFlattenedKeys(obj);
    obj = filterEmptyValues(obj);
    return {obj, markings};
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
        let markings = {};
        Object.keys(data.nameplate.Markings).forEach((key) => {
            markings[key] = {};
            if (data['nameplate']['Markings'][key]['MarkingName']) {
                markings[key]['MarkingName'] = data['nameplate']['Markings'][key]['MarkingName'];
                delete data['nameplate']['Markings'][key]['MarkingName'];
            }
            if (data['nameplate']['Markings'][key]['FilePath']) {
                markings[key]['FilePath'] = data['nameplate']['Markings'][key]['FilePath'];
                delete data['nameplate']['Markings'][key]['FilePath'];
            }
            if (Object.keys(markings[key]).length === 0 && markings[key].constructor === Object) {
                delete markings[key];
            }
        });
        //TODO: remove logging for markings and data on marking extraction
        // console.log(markings);
        // console.log(data);
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
        if (key.includes('Markings') && amountOfParts > 3) {
            const splitter = keyParts[0] + '_' + keyParts[1] + '_';
            const split = key.split(splitter);
            result[split[1]] = value;
            return;
        }
        key = keyParts[amountOfParts - 1];
        result[key] = value;
    });
    return result;
}
