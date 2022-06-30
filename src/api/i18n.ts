import { clientInternal, ClientResponseType} from "~/api/httpClient";
import { Languages } from "~/constants";

const I18N = {
    get: (language: Languages): ClientResponseType<{ [key: string]: any; }> =>
        clientInternal.get(`/locales/${language}.json`),
};

export default I18N;
