import { IDropdownOption } from "@fluentui/react";


export interface IExchangeCardProps {
    options: IDropdownOption[] | undefined;
    selectedRateFrom: IDropdownOption;
    selectedRateTo: IDropdownOption | undefined;
    error: string | null;
    setSelectedRateFrom: (state: IDropdownOption) => void;
    setSelectedRateTo: (state: IDropdownOption | undefined) => void;
}