//region add if not in array
// check if an element exists in array using a comparer function
// comparer : function(currentElement)

Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
}

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}
//Example: of pushIfNotExist
//var array = [{ name: "tom", text: "tasty" }];
//var element = { name: "tom", text: "tasty" };
//array.pushIfNotExist(element, function(e) {
//    return e.name === element.name && e.text === element.text;
// });

Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
//let size = Object.size({});
//endregion

/**
 * Check if a value is null, undefined or ""
 * @param value
 * @return {boolean}
 */
export function isNullOrUndefined(value){
    return value === undefined || value === null || value === ""  ;
}

/**
 * Check if a value is null, undefined, "", 0, empty array or object
 * @param value
 * @return {*|boolean|boolean}
 */
export function isEmpty(value){
    return isNullOrUndefined(value) || value===0 || (Array.isArray(value) && value.length===0) || (typeof value ==="object" && Object.size(value)===0)
}

/**
 * return the first data in the array that is not null, undefined or ""
 * @param arr
 * @return {null}
 */
export function returnExistingDataInArray(arr){
    arr.forEach(el=>{
        if (!isNullOrUndefined(el)){
            return el;
        }
    })
    return null;
}



function handleOptions(options, field, defaultVal=null, ignoreEmptyField=false, shouldReturnBool=false){
    if (isNullOrUndefined(defaultVal)){
        defaultVal = null;
    }
    if (isNullOrUndefined(ignoreEmptyField)){
        ignoreEmptyField = false;
    }
    if (isNullOrUndefined(shouldReturnBool)){
        shouldReturnBool = false;
    }

    if (!isNullOrUndefined(options) && !isNullOrUndefined(options[field])
        && ( (!isNullOrUndefined(options[field])  || options[field]===false || options===0) || ignoreEmptyField)){
        if (shouldReturnBool){
            return true;
        }
        return options[field];
    }
    else{
        if (shouldReturnBool){
            return false;
        }
        return defaultVal;
    }
}

/**
 *
 * @param options
 * @param field
 * @param defaultVal
 * @param ignoreEmptyField
 * @param shouldReturnBool
 * @return {boolean|null|array|string|object}
 * @constructor
 */
function HO(options, field, defaultVal=null, ignoreEmptyField=false, shouldReturnBool=false){
    if (isNullOrUndefined(defaultVal)){
        defaultVal = null;
    }
    if (isNullOrUndefined(ignoreEmptyField)){
        ignoreEmptyField = false;
    }
    if (isNullOrUndefined(shouldReturnBool)){
        shouldReturnBool = false;
    }
    return handleOptions(options, field, defaultVal, ignoreEmptyField, shouldReturnBool);
}

//region numerics
function prepareParsingString(str){
    return parseFloat(str.toString().replace(/\s/g,''))
}
function round(number, precision=0, fixed=false){
    let val = Math . round(number * Math . pow(10, precision)) / Math . pow(10, precision)
    if (fixed){
        return val.toFixed(2)
    }
    return val
}
//endregion

function replaceSpecialCharByUnderscore(str){
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
function splitLettersAndDigit(str) {
    let letters = str.match(/[a-zA-Z]/g).join("");
    let digits = str.match(/[0-9]/g).join("");
    return {digits, letters}
}

function snakeToCamel(str, capitalizeFirstCharacter) {
    if (!capitalizeFirstCharacter){
        capitalizeFirstCharacter = false
    }
    str = str.replace(/([-_]\w)/g, g => g[1].toUpperCase())

    if (capitalizeFirstCharacter){
        str = str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}



//region date
/**
 * Return a date as a string YYYY MM DD with defined separator
 * @param date {Date} : the date to return as string
 * @param sepDate {String} : separator for date values
 * @return {string}
 */
export function dateFilter(date, sepDate="-"){
    try{
        date = new Date(date)
        let month = date.getMonth()+1;
        let day = date.getDate();
        return date.getFullYear() + sepDate + date2char(month) + sepDate + date2char(day);
    }catch (e) {
        return date
    }
}

/**
 * Return a date as a string DD MM YYYY with defined separator
 * @param date {Date} : the date to return as string
 * @param sepDate {String} : separator for date values
 * @return {string}
 */
export function dateFilterFrench(date, sepDate="/"){
    try {
        date = new Date(date)
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return date2char(day) + sepDate + date2char(month) + sepDate + date.getFullYear();
    }catch (e) {
        return date
    }
}

/**
 * Return a date as a string DD MM YYYY  HH mm ss  with defined separators
 * @param date {Date} : the date to return as string
 * @param sepDate {String} : separator for date values
 * @param sepHour {String} : separator for time values
 * @return {string}
 */
export function dateTimeFilter(date, sepDate="-", sepHour=":"){
    try{
        date = new Date(date)
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return date2char(day) + sepDate +  date2char(month) + sepDate +   date.getFullYear() +
            " " + date2char(hours) + sepHour +date2char(minutes) + sepHour + date2char(seconds) ;
    }catch (e) {
        return date
    }
}

function date2char(val){
    return (val<10 ? "0" + val : val)
}
//endregion