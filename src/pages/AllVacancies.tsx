import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {JobsContext} from "../App";
import {VacancyCard} from "../components/VacancyCard";
import {SearchInput} from "../components/SearchInput";
import {AppPagination} from "../components/AppPagination";


export const AllVacancies = observer(() => {
  const jobsStore = useContext(JobsContext)?.jobsStore

  useEffect(() => {
    jobsStore?.loadJobs()
    jobsStore?.loadAreas()
  }, [jobsStore])
  return (
    <>
      <SearchInput />
      {jobsStore ? <>
        {jobsStore.jobs.map(el => {
          return <VacancyCard vacancy={el} key={el.url} />
        })}
      </> : null}
      <AppPagination/>
    </>
  );
});
