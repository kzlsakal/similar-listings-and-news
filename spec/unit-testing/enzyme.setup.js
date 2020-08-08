import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import listingMock from './../__mocks__/listingMock';
import categoryMock from './../__mocks__/categoryMock';

configure({ adapter: new Adapter() });

const sln = document.createElement('div');
sln.setAttribute('id', 'sln');
document.body.appendChild(sln);

global.fetch = jest.fn((input) => {
  if (input.indexOf('listings') > -1) {
    return Promise.resolve(categoryMock);
  }
  return Promise.resolve(listingMock);
});
