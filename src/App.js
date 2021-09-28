import './App.css';
import Routes from './Routes'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='colored'
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <Routes /> 
      </header>
    </div>
  );
}

export default App;