import logo from './logo.svg';
import './App.css';
import Page from './page';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './common/navbar/chearchBar';
import { SearchresultProvider } from './common/navbar/resultChearchContext';
import Navbar from './common/navbar/responsiveNavBar';
function App() {
  return (
    <div className="w-full h-full fixed bg-gray-800 overflow-y-auto text-slate-300">
         <SearchresultProvider>
      <div className='lg:hidden'>

      <Navbar/>
      </div>
       <div className='row col-12'>
        <div className='col-6'>
      <h1 className='text-4xl ml-2'>CheatCode</h1>

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
