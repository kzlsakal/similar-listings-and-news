import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listingMock from './../__mocks__/listingMock';
import categoryMock from './../__mocks__/categoryMock';
import articlesMock from './../__mocks__/articlesMock';

configure({ adapter: new Adapter() });

const sln = document.createElement('div');
sln.setAttribute('id', 'sln');
document.body.appendChild(sln);

global.fetch = jest.fn((input) => {
  if (input.indexOf('listings') > -1) {
    return Promise.resolve(categoryMock);
  } else if (input.indexOf('news') > -1) {
    return Promise.resolve(articlesMock);
  }
  return Promise.resolve(listingMock);
});

global.setTimeout = (func) => {
  func();
};
