import React, { useState, useEffect, useCallback } from "react";
import Layout from "./layout/Layout";
import ExchangeCard from "./components/ExchangeCard";
import ExchangeTables from "./components/ExchangeTables";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import getRates from "./services/ExchangeRateProvider";
import { IDropdownOption } from "@fluentui/react";

function App() {
  initializeIcons();

  const [currencyOptions, setCurrencyOptions] = useState<IDropdownOption[]>();
  const [selectedRateFrom, setSelectedRateFrom] = useState<IDropdownOption>({
    key: 1,
    text: "USD",
  });
  const [selectedRateTo, setSelectedRateTo] = useState<
    IDropdownOption | undefined
  >();
  const [error, setError] = useState<string | null>(null);

  const getCurrencyRates = useCallback(async () => {
    setError(null);

    try {
      // Get data from local storage
      const storedRates = localStorage.getItem("ExchangeRate_Rates");
      const storedTimeNextUpdate = localStorage.getItem(
        "ExchangeRate_TimeNextUpdate"
      );

      if (storedRates) {
        setCurrencyOptions(JSON.parse(storedRates));
      }

      // If no data, or ready for next update, call API and store data
      if (
        (!storedRates && !storedTimeNextUpdate) ||
        Number(storedTimeNextUpdate) <= Date.now() / 1000
      ) {
        const data = await getRates();
        if (data) {
          const options = Object.entries(data.rates).map(
            ([currencyKey, rate]) => ({
              key: rate as number,
              text: currencyKey,
            })
          );
          setCurrencyOptions(options);
          console.log("called api");
          localStorage.setItem("ExchangeRate_Rates", JSON.stringify(options));
          localStorage.setItem(
            "ExchangeRate_TimeNextUpdate",
            data.time_next_update_unix.toString()
          );
        }
      }
    } catch (error) {
      setError(
        "There was an error getting the latest rates. Refresh the page to try again."
      );
    }
  }, []);

  useEffect(() => {
    getCurrencyRates();
  }, [getCurrencyRates]);

  return (
    <Layout>
      <ExchangeCard
        options={currencyOptions}
        selectedRateFrom={selectedRateFrom}
        selectedRateTo={selectedRateTo}
        setSelectedRateFrom={setSelectedRateFrom}
        setSelectedRateTo={setSelectedRateTo}
        error={error}
      />
      {selectedRateTo && !error && (
        <ExchangeTables
          selectedRateFrom={selectedRateFrom}
          selectedRateTo={selectedRateTo}
        />
      )}
    </Layout>
  );
}

export default App;
