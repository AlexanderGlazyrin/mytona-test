import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {JobsContext} from "../App";
import {useParams} from 'react-router-dom'
import parse from "html-react-parser"
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getSalary} from "../components/VacancyCard";

const useStyles = makeStyles({
  title: {
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    marginBottom: 15
  },
  link: {
    color: '#3f51b5'
  }

});

export const AboutVacancy: React.FC = observer(() => {
  const classes = useStyles();
  const store = useContext(JobsContext)?.vacancyInfoStore;
  const params: {id: string} = useParams();

  useEffect(() => {
    store?.loadInfo(params.id)
  }, [params.id, store])

  return (
    <>
      <Typography className={classes.title} variant="h5" >
        {store?.vacancyInfo.name}
      </Typography>
      <Typography className={classes.text} variant="h5">
        {getSalary(store ? store.vacancyInfo.salary : null)}
      </Typography>
      <Typography variant="h6">
        <a className={classes.link} href={store?.vacancyInfo.employer.url}>{store?.vacancyInfo.employer.name.toUpperCase()}</a>
      </Typography>
      <Typography className={classes.text}>
        {store?.vacancyInfo.area}
      </Typography>
      {store?.vacancyInfo ? parse(store?.vacancyInfo.description) : null}
    </>
  );
});
