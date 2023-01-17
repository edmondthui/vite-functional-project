import { Buffer } from "buffer";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
