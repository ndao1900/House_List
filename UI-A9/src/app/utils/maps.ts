export const convertObjectListToMap = (objList, key) => {
    return objList.reduce( (map, object) => {
        map[object[key]] = object;
        return map;
    }, {})
}