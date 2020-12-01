import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {Area, IInputs, IJobs, SearchOptions} from "../interfaces/interfaces";

export class JobsStore {
  jobs: IJobs[] = [];
  areas: Area[] = [];
  searchOptions: SearchOptions = {
    action: 'https://api.hh.ru/vacancies',
    text: '',
    place: '',
    salary: 0,
    found: 0,
    pages: 0,
    perPage: 10,
    page: 0,
  }


  constructor() {
    makeObservable(this, {
      jobs: observable,
      searchOptions: observable,
      areas: observable,
      loadJobs: action,
      loadPage: action,
      loadSearchJob: action,
      changePlace: action,
      makeAction: computed,
    }, {
      deep: true,
    })
  }

  get makeAction() {
    let action = this.searchOptions.action;
    if (this.searchOptions.perPage) {
      action += `?per_page=${this.searchOptions.perPage}`;
    }
    if (this.searchOptions.text) {
      action += `&text=${this.searchOptions.text}`;
    }
    if (this.searchOptions.page) {
      action += `&page=${this.searchOptions.page}`;
    }
    if (this.searchOptions.salary) {
      action += `&salary=${this.searchOptions.salary}`;
    }
    if (this.searchOptions.place) {
      action += `&area=${this.searchOptions.place}`;
    }
    return action;
  }

  loadJobs = async () => {
    const action = this.makeAction
    console.log(action)
    const res = await fetch(action, {
      headers: {'User-Agent': 'api-test-agent'}
    })
    const jobs = await res.json()
    runInAction(() => {
      this.jobs = jobs.items.map((el: any) => {
        const {name, salary, area: {name: place}, url, snippet} = el;
        return {name, place, salary, url, snippet}
      });
      const {found, pages, per_page: perPage, page} = jobs
      this.searchOptions = {...this.searchOptions, found, pages, perPage, page};
    })
  }

  getAreas(areas: Area[]) {
    areas.forEach((area) => {
      if (area.areas?.length) this.getAreas(area.areas);
      else {
        const {name, id} = area
        this.areas.push({name, id})
      }
    })
  }

  loadAreas = async () => {
    const res = await fetch('https://api.hh.ru/areas', {
      headers: {'User-Agent': 'api-test-agent'}
    })
    const areas = await res.json();
    this.getAreas(areas);
  }

  loadPage(num: number) {
    this.searchOptions.page = num - 1;
    this.loadJobs().catch(err => console.log(err))
  }

  loadSearchJob(search: IInputs) {
    this.searchOptions.text = search.vacancy;
    this.searchOptions.salary = +search.salary;
    this.searchOptions.page = 0;
    this.loadJobs().catch(err => console.log(err))
  }

  changePlace(id: string) {
    this.searchOptions.place = id;
  }
}

export const store = new JobsStore();


