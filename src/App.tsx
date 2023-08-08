import Items from "./components/Items";
import List from "./components/List";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { toggle } from "./features/modal";
import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { selectProduct } from "./features/products";

function App() {

  const { modal: { isOpen }, products: { itemsData } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const scannerResult = useRef<string>('');

  let html5QrcodeScanner: Html5QrcodeScanner;

  const runScanner = () => {
    console.log("from On Scanner");

    function onScanSuccess(decodedText: string) {
      scannerResult.current = decodedText;

      // Get the product:
      const product = itemsData.find(product => product.id === decodedText);

      dispatch(selectProduct(product));

      console.log("From onScanSuccess");

    }

    function onScanFailure(error: string) {
      console.warn(`Code scan error = ${error}`);
    }

    if (!html5QrcodeScanner?.getState()) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 0.75, qrbox: { width: 250, height: 250 } }, false);
      console.log("From the if statement");
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
  }

  useEffect(() => {

    runScanner();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") return dispatch(toggle());
      return;
    }

    document.addEventListener('keypress', (e) => handler(e));

    return () => {
      document.removeEventListener('keypress', (e) => handler(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex">
      <Items />
      <List />
      {isOpen && <Modal />}
      {scannerResult.current && <button onClick={runScanner}></button>}
      <div id="reader"></div>
    </main>
  )
}

export default App;