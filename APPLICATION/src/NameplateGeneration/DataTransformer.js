const FILTER_KEYS = ["idEncoded", "nameplateId", "nameplateIdEncoded", "num", "nameplate.idShort", "nameplate.id",
    "nameplate.idEncoded"]

function transformDataToArray(obj) {
    console.log('Original obj:');
    console.log(obj);

    let markings;
    ({data: obj, markings} = separateMarkings(obj));
    console.log('markings:');
    console.log(markings);

    let unwantedKeys;
    ({data: obj, unwantedKeys} = extractUnwantedKeys(obj, FILTER_KEYS));
    console.log('unwantedKeys:');
    console.log(unwantedKeys);
    console.log('Resulting obj:');
    console.log(obj);

    /*
    let nameplateIds;
    ({data: obj, nameplateIds} = separateNameplateIds(obj));
    
    let idEncoded;
    ({data: obj, idEncoded} = separateAssetEncodedIds(obj));
    */

    /*
    let list = Object.entries(obj);
    console.log('Object.entries():');
    console.log(list);

    let keyValues = recursiveExtract(list);
    console.log('recursiveExtract():');
    console.log(keyValues);

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
 * Removes all [key, value]-arrays where value is falsy (undefined, null, ...).
 * @param list
 * @returns {*}
 */
function filterEmptyEntries(list) {
    return list.filter((elem) => elem[1]);
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
 * not finished and not working
 * @param obj
 * @param filters
 * @returns {{}}
 */
function extractUnwantedKeys(obj, filters) {
    let unwantedKeys = {};
    filters.forEach((filter) => {
        let parts = filter.includes('.') ? filter.split('.') : null;
        if (parts) {
            //unwantedKeys[parts[0]] = extractUnwantedKeys(obj[parts[0]], );
            return;
        }
        unwantedKeys[filter] = obj[filter];
        delete obj[filter];
    });
    return unwantedKeys;
}
