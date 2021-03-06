import React, {useContext} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {JobsContext} from "../App";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: 20,
      marginTop: 20,
      display: 'flex',
      justifyContent: 'center'
    },
  }),
);


export const AppPagination: React.FC = observer(() => {
  const classes = useStyles();
  const jobsStore = useContext(JobsContext)?.jobsStore;


  const getPage = (e: any, page: number) => {
    jobsStore?.loadPage(page);
  };

  return (
    <div className={classes.root}>
      <Pagination count={jobsStore?.searchOptions.pages} onChange={getPage} page={jobsStore ? (jobsStore.searchOptions.page + 1) : 1}/>
    </div>
  );
});
