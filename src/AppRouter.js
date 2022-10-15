import { Routes, Route } from 'react-router';
import ProductList from './components/pages/ProductList'
import Catalog from "./components/pages/Catalog";
import Index from './components/pages/Index'
function AppRouter(){
    return <Routes>
        <Route path="/" exact element={<Index/>}/>
        <Route path={"/ProductList"} exact element={<ProductList/>}></Route>
        <Route path={"/Catalog"} exact element={<Catalog/>}></Route>
    </Routes>
}

export  default  AppRouter;