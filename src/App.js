import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyle from './style/GlobalStyle';
import { useForm, FormProvider } from "react-hook-form";
import DetailView from './pages/DetailView';

function App() {
  const methods = useForm({
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/admin' element={<Home />} />
          <Route path='/admin/detailView' element={<DetailView />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
