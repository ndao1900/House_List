exports.uniqueValidator = (objArray, uniqueField) => {
    if(!objArray) return true;
    let dupDetectMap = {};
    objArray.forEach(obj => {
        const val = obj[uniqueField];
        if(!val){
            if( dupDetectMap[val]){
                throw new Error(`Duplication in field ${uniqueField}, value: ${obj[uniqueField]}`)
            } else {
                dupDetectMap[val] = true;
            }
        }
    })
    
    return true;
}