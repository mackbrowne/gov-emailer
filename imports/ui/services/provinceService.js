import angular from 'angular';

const name = 'provinceService';

class ProvinceService {
  constructor() {
    this.provinces = [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'Newfoundland and Labrador',
      'New Brunswick',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Yukon'
    ];

  }
}

// create a module
export default angular.module(name, [])
  .service(name, ProvinceService);
