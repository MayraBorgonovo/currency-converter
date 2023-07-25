import React, { useState, useEffect } from "react";
import styles from "../styles/ExchangeCard.module.scss";
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { Dropdown, IDropdownStyles } from "@fluentui/react/lib/Dropdown";
import { IExchangeCardProps } from "../interfaces/IExchangeCardProps";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: 75,
    border: "none",
    height: "40px",
    ":active": { outline: "none" },
    ":focus:after": { outline: "none", border: "none" },
  },
  title: {
    height: "40px",
    border: "none",
    ":focus-visible": { outline: "none" },
    ":focus-active": { outline: "none" },
    ":focus:after": { outline: "none", border: "none" },
  },
};

const ExchangeCard: React.FunctionComponent<IExchangeCardProps> = ({
  options,
  selectedRateFrom,
  selectedRateTo,
  error,
  setSelectedRateFrom,
  setSelectedRateTo,
}) => {
  const [amountFrom, setAmountFrom] = useState<string>("1");
  const [amountTo, setAmountTo] = useState<string>("");

  useEffect(() => {
    if (options) {
      const initialOptionTo = options.find((option) => option.text === "AUD");
      if (initialOptionTo) {
        setSelectedRateTo(initialOptionTo);
        setAmountTo(initialOptionTo.key.toString());
      }
    }
  }, [options, setSelectedRateTo]);

  const handleInputChangeFrom = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setAmountFrom(newValue);
      const calc =
        (Number(selectedRateTo?.key) / Number(selectedRateFrom?.key)) *
        Number(newValue);
      setAmountTo(calc.toString());
    },
    [selectedRateTo, selectedRateFrom, setAmountFrom, setAmountTo]
  );

  const handleDropdownChangeTo = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
      if (option) {
        setSelectedRateTo(option);
        const calc =
          (Number(option.key) / Number(selectedRateFrom?.key)) *
          Number(amountFrom);
        setAmountTo(calc.toString());
      }
    },
    [amountFrom, selectedRateFrom, setSelectedRateTo]
  );

  const handleDropdownChangeFrom = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
      if (option) {
        setSelectedRateFrom(option);
        const calc =
          (Number(option.key) / Number(selectedRateTo?.key)) * Number(amountTo);
        setAmountFrom(calc.toString());
      }
    },
    [amountTo, selectedRateTo, setSelectedRateFrom]
  );

  const handleInputChangeTo = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setAmountTo(newValue);
      const calc =
        (Number(selectedRateFrom?.key) / Number(selectedRateTo?.key)) *
        Number(newValue);
      setAmountFrom(calc.toString());
    },
    [selectedRateFrom, selectedRateTo, setAmountFrom, setAmountTo]
  );

  const formatAmount = (amount: number | string): string => {
    // Round the amount to two decimal places
    const numberAmount = Number(amount);
    const roundedAmount = Number(numberAmount.toFixed(2));

    // CRound to 4 if 0
    if (roundedAmount === 0.0) {
      return numberAmount.toFixed(4);
    } else {
      return roundedAmount.toFixed(2);
    }
  };
  const calcTargetRate =
    Number(selectedRateTo?.key) / Number(selectedRateFrom?.key);

  return (
    <div className={styles.ExchangeCard}>
      <div className={styles.titleContainer}>
        {selectedRateFrom && selectedRateTo && (
          <h2>
            Convert {selectedRateFrom.text} to {selectedRateTo.text}
          </h2>
        )}
        {!selectedRateTo && <h2>Select currencies to convert</h2>}
      </div>
      <div className={styles.ExchangeCurrency}>
        <div className={styles.dropdownContainer}>
          <input
            type="number"
            name="From"
            id="from"
            value={formatAmount(amountFrom)}
            onChange={handleInputChangeFrom}
          />
          {options && (
            <Dropdown
              options={options}
              styles={dropdownStyles}
              onChange={handleDropdownChangeFrom}
              defaultSelectedKey={selectedRateFrom.key}
            />
          )}
        </div>
        <div className={styles.dropdownContainer}>
          <input
            type="number"
            name="To"
            id="to"
            value={formatAmount(amountTo)}
            onChange={handleInputChangeTo}
          />
          {options && (
            <Dropdown
              options={options}
              styles={dropdownStyles}
              onChange={handleDropdownChangeTo}
              selectedKey={selectedRateTo?.key}
            />
          )}
        </div>
      </div>
      {!error && selectedRateTo && (
        <p>
          1.00 {selectedRateFrom.text} = {formatAmount(calcTargetRate)}{" "}
          {selectedRateTo.text}
        </p>
      )}
      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};

export default ExchangeCard;
