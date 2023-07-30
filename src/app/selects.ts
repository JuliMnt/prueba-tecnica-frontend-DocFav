import { Observable } from "rxjs";

export interface Selects {
    genreSelect: Observable<Array<string>>;
    platformSelect:  Observable<Array<string>>;
}

