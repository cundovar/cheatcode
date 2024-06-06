import logo from './logo.svg';
import './App.css';
import Page from './page';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './common/navbar/chearchBar';
import { SearchresultProvider } from './common/navbar/resultChearchContext';
function App() {
  return (
    <div className="w-full">
         <SearchresultProvider>
       <div className='row col-12'>
        <div className='col-6'>
      <h1 className='text-4xl'>cheatcode</h1>

        </div>
        <div className='col-6 flex justify-end '>
      <SearchBar/>

        </div>
       </div>
   <Page/>

         </SearchresultProvider>
    </div>
  );
}

export default App;
