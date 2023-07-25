import React, { ReactNode } from 'react';
import Header from "./Header";
import styles from "../styles/Layout.module.scss";

interface MyComponentProps {
  children: ReactNode;
}

const Layout:React.FunctionComponent<MyComponentProps> = ({children}) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <main>{children}</main>
      <footer>
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
      </footer>
    </div>
  );
};

export default Layout;
