//import CurrencySVG from '../assets/Currency-Two-Color';
import logo from '../assets/icon-white-transparent.png';
import styles from '../styles/Header.module.scss';

const Header = () => {

  return (
    <header className={styles.Header}>
      <img src={logo} alt="Currency icon" />
      <div className={styles.overlay}>
        <div></div>
      </div>
      <div className={styles.hero}>
        <h1>Currency Converter</h1>
        <p>Check the latest currency exchange rates</p>
      </div>
    </header>
  );
};

export default Header;
