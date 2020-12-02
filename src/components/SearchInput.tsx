import React, {useContext} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button} from "@material-ui/core";
import {useState} from 'react';
import {IInputs} from "../interfaces/interfaces";
import {JobsContext} from "../App";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: 40,
      marginTop: 40,
    },
    formControl: {
      width: '100%',
    },
    selectEmpty: {},
    textInput: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export const SearchInput: React.FC = () => {
    const classes = useStyles()
    const initSate: IInputs = {vacancy: '', place: '', salary: ''};
    const [inputValues, setInputValues] = useState<IInputs>(initSate);
    const jobsStore = useContext(JobsContext)?.jobsStore;

    const searchVacancies = () => {
      const areasObj = jobsStore?.areas.find((area) => {
        return area.name.toLowerCase() === inputValues.place.toLowerCase()
      })
      jobsStore?.changePlace(areasObj ? areasObj.id : '');
      jobsStore?.loadSearchJob(inputValues);
      setInputValues(initSate);
    }
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center">
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Наименование вакансии"
              variant="outlined"
              className={classes.textInput}
              value={inputValues.vacancy}
              onChange={(e) => setInputValues(prev => {
                return {...prev, vacancy: e.target.value}
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Расширенный поиск</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container
                      spacing={2}
                      direction="row"
                      justify="center"
                      alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      id="standard-basic"
                      label="Город"
                      variant="outlined"
                      className={classes.textInput}
                      value={inputValues.place}
                      onChange={(e) => setInputValues(prev => {
                        return {...prev, place: e.target.value}
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-basic"
                      label="Заработная плата"
                      variant="outlined"
                      className={classes.textInput}
                      value={inputValues.salary}
                      onChange={(e) => setInputValues(prev => {
                        return {...prev, salary: e.target.value}
                      })}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" onClick={searchVacancies}>
              Поиск
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
;
