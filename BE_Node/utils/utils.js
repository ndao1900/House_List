
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

        if(key != key.toUpperCase()){
            throw new Error(`key must be upper case "${key}"`)
        }

        if(!!val){
          if(val instanceof Array){
            val.forEach(aVal => {
                if(!this.areStringsEqual(aVal.name, key)){
                    throw new Error(`Key "${key}" is not the same as name "${aVal.name}`);
                }
            });
          } else if(!this.areStringsEqual(val.name, key)) {
            throw new Error(`Key "${key}" is not the same as name "${val.name}`); 
          }
        }
    });
    return true;
}

exports.validateDate = (dateStr) => {
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr))
        return false;

    // Parse the date parts to integers
    var parts = dateStr.split("/");
    var month = parseInt(parts[0], 10);
    var day = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}