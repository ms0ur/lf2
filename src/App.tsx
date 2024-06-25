import styles from './App.module.scss';
import { ModalWindowPopup } from './components/modal-window-popup/ModalWindowPopup.component';

function App() {
  return (
    <div className={styles.container}>
      <ModalWindowPopup />
    </div>
  );
}

export default App;
