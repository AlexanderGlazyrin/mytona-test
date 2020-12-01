import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {IJobs, Salary} from "../interfaces/interfaces";

interface VacancyCardProps {
  vacancy: IJobs;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: 8,
  },
  place: {
    marginBottom: 5,
  },
  salary: {
    fontSize: 18,
    marginBottom: 10,
  }
});

function getSalary(salaryObj: Salary | null): string {
  if (salaryObj?.from && salaryObj?.to) return `${salaryObj.from}-${salaryObj.to} ${salaryObj.currency}`;
  else if (salaryObj?.from) return `от ${salaryObj.from} ${salaryObj.currency}`;
  else if (salaryObj?.to) return `до ${salaryObj.to} ${salaryObj.currency}`;
  else return 'з/п не указана';
}

export const VacancyCard: React.FC<VacancyCardProps> = ({vacancy}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.place} color="textSecondary">
          {vacancy.place}
        </Typography>
        <Typography variant="h5" component="h2">
          {vacancy.name}
        </Typography>
        <Typography className={classes.salary}>
          {getSalary(vacancy.salary)}
        </Typography>
        <Typography variant="body2" component="p">
          {vacancy.snippet.requirement?.replace(/&quot;/g, '"')}
        </Typography>
        <Typography variant="body2" component="p">
          {vacancy.snippet.responsibility}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
};
