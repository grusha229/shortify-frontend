import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from './views/MainLayout/MainLayout';
import LinkBuilderView from './views/LinkBuilderView/LinkBuilderView';
import LinkDetailsView from './views/LinkDetailsView/LinkDetailsView';


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LinkBuilderView />} />
        <Route path='/details/:id' element={<LinkDetailsView />} />
      </Route>
    </Routes>
  )
}

export default App
