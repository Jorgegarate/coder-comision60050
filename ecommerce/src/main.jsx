
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import 'normalize.css';
import './styles.scss';

// Crea el root de React con React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
);
