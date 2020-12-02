import React, {createContext} from 'react';
import {AllVacancies} from "./pages/AllVacancies";
import jobsStore, {JobsStore} from "./store/JobsStore";
import vacancyInfoStore, {VacancyInfoStore} from "./store/VacancyInfoStore";
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Navbar} from "./components/Navbar";
import './Style.css';
import {SignUp} from "./pages/SignUp";
import {AboutVacancy} from "./pages/AboutVacancy";

interface IStore {
  jobsStore: JobsStore;
  vacancyInfoStore: VacancyInfoStore;
}

export const JobsContext = createContext<IStore | null>(null)
function App() {

  return (
    <JobsContext.Provider value={{jobsStore, vacancyInfoStore}}>
      <Router>
        <Navbar/>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/signup" exact>
              <SignUp/>
            </Route>
            <Route path="/vacancy/:id" exact>
              <AboutVacancy/>
            </Route>
            <Route path="/" exact>
              <AllVacancies/>
            </Route>
          </Switch>
        </Container>
      </Router>
    </JobsContext.Provider>
  )
}

export default App;
