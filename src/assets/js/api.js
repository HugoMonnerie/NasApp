///yarn add axios
import { isNullOrUndefined } from "./commonFunction.js"
import axios from "axios"
const BASE_URL = 'https://api.nasa.gov';
const API_KEY = "CPJK3YKktIgywncAOPSm82Ki9mfSAIrbXaRPqh7u"

/**
 * Return the value of a promise returned by an api call, and console.log the result
 * @param promise : Promise<Response> :
 */
function handleFetchLogJson(promise){
    return promise
        .then(response => response.json())
        .then(response =>{
            console.log(response);
            return response})
        .catch(e=>console.error(e));
}

/**
 * Return data get from API
 * @param promise
 * @return {Promise<any> | Promise<void> | Promise<void> | {then(onfulfilled?: (state: (ResultState | undefined)) => void): Promise<Partial<Omit<NavigationState<ParamListBase>, "stale" | "routes">> & Readonly<{stale?: true; routes: PartialRoute<Route<NavigationState<ParamListBase>["routeNames"][number]>>[]}> & {state?: ResultState}>; catch(): {then(onfulfilled?: (state: (ResultState | undefined)) => void): Promise<Partial<Omit<NavigationState<ParamListBase>, "stale" | "routes">> & Readonly<{stale?: true; routes: PartialRoute<Route<NavigationState<ParamListBase>["routeNames"][number]>>[]}> & {state?: ResultState}>; catch(): any}} | {then(onfulfilled?: (state: (ResultState | undefined)) => void): Promise<Partial<Omit<NavigationState<ParamListBase>, "stale" | "routes">> & Readonly<{stale?: true; routes: PartialRoute<Route<NavigationState<ParamListBase>["routeNames"][number]>>[]}> & {state?: ResultState}>; catch(): {then(onfulfilled?: (state: (ResultState | undefined)) => void): Promise<Partial<Omit<NavigationState<ParamListBase>, "stale" | "routes">> & Readonly<{stale?: true; routes: PartialRoute<Route<NavigationState<ParamListBase>["routeNames"][number]>>[]}> & {state?: ResultState}>; catch(): any}}}
 */
function handleAxiosPromise(promise){
    return promise
        .then(response =>{return response.data})
        .catch(e=>{
            //console.error(e)
            return {error:e}
        });
}

/**
 * Write all params in a get query (exemple : ?search=js&name=delete)
 * You can specify the field to ignore from params
 * @param isFirstParam
 * @param params {Object} : exemple {search:js, name:delete}
 * @param ignored {Array} : exemple ["name"]
 * @return {string}
 */
function handleUrlParams(isFirstParam, params={}, ignored=[]){
    let paramsTxt = "";
    let count = 0;
    Object.keys(params).forEach((el)=>{
        if(!ignored.includes(el) && !isNullOrUndefined(params[el])) {
            paramsTxt += (isFirstParam && count === 0 ? "?" : "&") + el + "=" + params[el];
            count++;
        }
    })
    return paramsTxt;
}

/**
 * Get data from Nasa api APOD (astronomy picture of the day)
 * example :
 * {"copyright":"JM Pasachoff Antarctic Expedition",
 * "date":"2021-12-09",
 * "explanation":"desc",
 * "hdurl":"https://apod.nasa.gov/apod/image/2112/SOLARECLIPSE2021FORDISTROHighRes.jpg",
 * "media_type":"image",
 * "service_version":"v1",
 * "title":"A Total Eclipse of the Sun",
 * "url":"https://apod.nasa.gov/apod/image/2112/SOLARECLIPSE2021FORDISTROHighRes1024.jpg"
 * }
 * @param params
 * @return {*}
 */
function apiNasaApod(params={}){
    return handleAxiosPromise(axios.get(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`))
    //return handleFetchLogJson(fetch(BASE_URL + "/planetary/apod?api_key=" + API_KEY))
}

/**
 *
 * return model :
 * {photos :
 *  [
 *      {
 *      "id":102693,
 *      "sol":1000,
 *      "camera":{
 *          "id":20,
 *          "name":"FHAZ",
 *          "rover_id":5,
 *          "full_name":"Front Hazard Avoidance Camera"
 *      },
 *      "img_src":"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
 *      "earth_date":"2015-05-30",
 *      "rover":{
 *          "id":5,
 *          "name":"Curiosity",
 *          "landing_date":"2012-08-06",
 *          "launch_date":"2011-11-26",
 *          "status":"active"
 *          }
 *       }
 *  ]}
 * @param params {Object} : model =>  {rover:"curiosity", sol:1000, camera:"mardi", earth_date:"2021-01-01"}
 * @return {*}
 */
function apiNasaMarsByRovers(params){
    let ignored = ["rover"]
    if(params.camera==="all"){
        ignored.push("camera")
    }

    const queryStr = handleUrlParams(false, params,ignored )
    const url = `${BASE_URL}/mars-photos/api/v1/rovers/${params.rover}/photos?api_key=${API_KEY}${queryStr}`

    return handleAxiosPromise(axios.get(url))
    //return handleFetchLogJson(fetch(BASE_URL + "/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=" + API_KEY))
}

/**
 * Return uri of an image corresponding to the given location (lat and lon) at given
 * date (default today or nearest).
 * dim is a zoom, >0 and  <=1. 0 zoom in, 1 zoom out.
 * @param params {Object} : model =>  {lat:1.5, lon:100.75, date:"2021-02-01", dim:1}
 * @return {String}
 */
function apiNasaEarthImgUri(params){
    const queryStr = handleUrlParams(false, params )
    return `${BASE_URL}/planetary/earth/imagery?api_key=${API_KEY}${queryStr}`
}

/**
 * Try to get data from Nasa earth api, should return an error if no img found
 * @param params
 * @return {*}
 */
function apiNasaEarth(params){
    return handleAxiosPromise(axios.get(apiNasaEarthImgUri(params)))
}



//async function t(){await handleFetchLogJson(fetch( "https://api.nasa.gov/planetary/apod?api_key=CPJK3YKktIgywncAOPSm82Ki9mfSAIrbXaRPqh7u" ))};

export default { apiNasaApod, apiNasaMarsByRovers, apiNasaEarthImgUri, apiNasaEarth}