import {t} from "@lingui/macro";
import {i18n} from "../App";

export const assertOkResponse = async (response: Response) => {
    if (response.status >= 400) {
        let text: string;
        try {
            text = (await response.json())
            if (response.status === 400 && Array.isArray(text)) {
                text = i18n._(t`Fields validation error`)
            }
        } catch (e) {
            text = await response.text()
        }
        throw new Error(text)
    }
};

export const buildQueryString = (obj: any): string => {
    const ret = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
            if (typeof obj[key] === 'string' && !obj[key]) continue
            ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return ret.join('&');
}