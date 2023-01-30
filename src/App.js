import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './Router/Routes';

function App() {
  return (
    <div className="App">
       <RouterProvider router={router}></RouterProvider>
        <Toaster />
    </div>
  );
}

export default App;
