import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {JobsContext} from "../App";
import {VacancyCard} from "./VacancyCard";


export const AllVacancies = observer(() => {
  const jobsStore = useContext(JobsContext)

  useEffect(() => {
    jobsStore?.loadJobs()
    jobsStore?.loadAreas()
  }, [jobsStore])
  return (
    <>
      {jobsStore ? <>
        {jobsStore.jobs.map(el => {
          return <VacancyCard vacancy={el} key={el.url} />
        })}
      </> : null}
    </>
  );
});
