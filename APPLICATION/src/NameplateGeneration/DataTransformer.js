function transformDataToArray(data) {
    let list = Object.entries(data);
    console.log('Object.entries():');
    console.log(list);

    let keyValues = recursiveExtract(list);
    console.log('recursiveExtract():');
    console.log(keyValues);

    let filteredKeyValues = filterEmptyEntries(keyValues);
    console.log('filterEmptyEntries():');
    console.log(filteredKeyValues);
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
