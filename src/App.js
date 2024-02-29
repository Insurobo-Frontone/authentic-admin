import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyle from './style/GlobalStyle';
import { useForm, FormProvider } from "react-hook-form";
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
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
