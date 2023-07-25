import React from "react";
import styles from "../styles/ExchangeTables.module.scss";
import { IExchangeTablesProps } from "../interfaces/IExchangeTablesProps";

const ExchangeTables: React.FunctionComponent<IExchangeTablesProps> = ({
  selectedRateFrom,
  selectedRateTo,
}) => {
  const amounts = [1, 5, 10, 50, 100, 500];

  const calculateAmount = (amount: number, direction: string): string => {
    let calculatedAmount;
    if (direction === "from") {
      calculatedAmount =
        (Number(selectedRateTo?.key) / Number(selectedRateFrom.key)) *
        Number(amount);
    } else {
      calculatedAmount =
        (Number(selectedRateFrom.key) / Number(selectedRateTo?.key)) *
        Number(amount);
    }

    // Round the amount to two decimal places
    const numberAmount = Number(calculatedAmount);
    const roundedAmount = Number(numberAmount.toFixed(2));

    // Round to 4 if 0
    if (roundedAmount === 0.0) {
      return numberAmount.toFixed(4);
    } else {
      return roundedAmount.toFixed(2);
    }
  };

  return (
    <section className={styles.ExchangeTables}>
      <h2>
        {selectedRateFrom.text} - {selectedRateTo?.text} Exchange Rates
      </h2>
      <div className={styles.tableContainer}>
        <ul className={styles.table}>
          <li className={styles.head}>
            <span>{selectedRateFrom.text}</span>
            <span>{selectedRateTo?.text}</span>
          </li>
          {amounts.map((amount, key) => (
            <li key={key}>
              <span>
                {amount} {selectedRateFrom.text}
              </span>
              <span>
                {calculateAmount(amount, "from")} {selectedRateTo?.text}
              </span>
            </li>
          ))}
        </ul>
        <ul className={styles.table}>
          <li className={styles.head}>
            <span>{selectedRateTo?.text}</span>
            <span>{selectedRateFrom.text}</span>
          </li>
          {amounts.map((amount, key) => (
            <li key={key}>
              <span>
                {amount} {selectedRateTo?.text}
              </span>
              <span>
                {calculateAmount(amount, "to")} {selectedRateFrom.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExchangeTables;
