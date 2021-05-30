
exports.areStringsEqual = (string1, string2) => {
    try{
        return (string1 === string2 || string1.toUpperCase() === string2.toUpperCase())
    } catch(err) {
        // console.warn(err);
        return false;
    }
}

exports.toKey = (ketStr) => {return ketStr.toUpperCase()};

exports.defaultIfNull = (val, defaultVal) => val == null? defaultVal : val; 

exports.nameAsKeyValidator = (map) => {
    let keyMap = {};
    map.forEach((val, key) => {
        if(keyMap[key])
            throw new Error(`Duplicated keys "${key}"`);
        else{keyMap[key] = true}

        if(!!val && !this.areStringsEqual(val.name, key)){
            throw new Error(`Key "${key}" is not the same as name "${val.name}`);
        }
    });
    return true;
}