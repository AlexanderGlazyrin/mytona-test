import React, {createContext} from 'react';
import {AllVacancies} from "./Component/AllVacancies";
import {JobsStore, store} from "./store/JobsStore";
import Container from '@material-ui/core/Container';
import {SearchInput} from "./Component/SearchInput";
import {AppPagination} from "./Component/AppPagination";

export const JobsContext = createContext<JobsStore | null>(null)

function App() {

  return (
    <JobsContext.Provider value={store}>
      <Container maxWidth="lg">
        <SearchInput />
        <AllVacancies/>
        <AppPagination />
      </Container>
    </JobsContext.Provider>
  )
}

export default App;
