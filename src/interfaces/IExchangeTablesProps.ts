import { IDropdownOption } from "@fluentui/react";

export interface IExchangeTablesProps {
    selectedRateFrom: IDropdownOption;
    selectedRateTo: IDropdownOption | undefined;
}