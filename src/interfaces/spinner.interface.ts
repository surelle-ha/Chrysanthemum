import { Color } from "ora";

export interface startSpinnerInterface {
    title: string;
    color: Color;
}

export interface mockSpinnerInterface extends startSpinnerInterface {
    ttl: number;
    successMessage: string;
}
