import { environment } from '@env/environment';
import * as _ from 'lodash';

/**
 * 
 * 取得 API 的基本路徑
 * 
 * 
 */
const getBaseApiUrl = (): any => {

    let apiUrl = '';

    const apiBpdy = _.get(environment, 'API_BODY') || '';

    console.log(' 取得 API 的基本路徑')
    const hostName = window.location.hostname;
    console.log('hostName', hostName);


    // TODO:補pps正式環境的api路徑 


    //     this.uri = environment.production ? localUrl : '/site/api';
    switch (hostName) {
        case "localhost":
            apiUrl = `http://${hostName}:8090${apiBpdy}`;
            break;
        case "ys-webapt1.walsin.com":
            apiUrl = `http://${hostName}:8080${apiBpdy}`;
            break;
        case "ys-pps.walsin.corp":
            apiUrl = `http://${hostName}:8080${apiBpdy}`;
            break;
        case "ys-webapp.walsin.com":
            apiUrl = `https://${hostName}${apiBpdy}`;
            break;
        default:
            apiUrl = `http://${hostName}${apiBpdy}`;
    }


    return apiUrl;

}


export { getBaseApiUrl };