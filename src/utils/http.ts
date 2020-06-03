import {t} from "@lingui/macro";
import {i18n} from "../App";

export const assertOkResponse = async (response: Response): Promise<void> => {
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

export const buildQueryString = (obj: {[key: string]: string | number | undefined}): string => {
    const ret = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if (element !== undefined && element !== null) {
                if (typeof element === 'string' && !element) continue
                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(element));
            }
        }
    }
    return ret.join('&');
}