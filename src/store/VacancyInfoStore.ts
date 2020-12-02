import {action, makeObservable, observable, runInAction} from "mobx";
import {IVacancy} from "../interfaces/interfaces";

export class VacancyInfoStore {
  vacancyInfo: IVacancy = {
    id: '',
    name: '',
    area: '',
    description: '',
    employer: {
      url: '',
      name: '',
    },
    salary: {
      from: 0,
      to: 0,
      currency: 'RUR',
      gross: false
    },
  }

  constructor() {
    makeObservable(this, {
      vacancyInfo: observable,
      loadInfo: action
    }, {
      deep: true
    })
  }

  loadInfo = async (vacancyId: string) => {
    const preRes = await fetch(`https://api.hh.ru/vacancies/${vacancyId}`, {
      headers: {'User-Agent': 'api-test-agent'}
    });
    const res = await preRes.json();
    const {id, name, area: {name: area}, description, employer, salary} = res;
    runInAction(() => {
      this.vacancyInfo = {id, name, area, description, employer: {name: employer.name, url: employer.alternate_url}, salary}
    })
  }
}

export default new VacancyInfoStore();
