import AppPagination from './AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(props) {
  return mount(AppPagination, {props})
}

describe('Pagination test', () => {
  it('No buttons if only 1 page', () => {
    wrapper = makeWrapper({itemsQuantity: 5, pageSize: 10, currentPage: 1});
    expect(wrapper.text()).toBe('');
  })

  it('We have expected number of pages 8', () => {
    wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 1})
    expect(wrapper.findAll('button').length).toBe(8);
  })

  it('We have 4 pages', () => {
    wrapper = makeWrapper({itemsQuantity: 60, pageSize: 30, currentPage: 1})
    expect(wrapper.findAll('button').length).toBe(4);
  })

  it('We have 7 pages', () => {
    wrapper = makeWrapper({itemsQuantity: 20, pageSize: 4, currentPage: 1})
    expect(wrapper.findAll('button').length).toBe(7);
  })

  it('We have 12 pages', () => {
    wrapper = makeWrapper({itemsQuantity: 60, pageSize: 6, currentPage: 1})
    expect(wrapper.findAll('button').length).toBe(12);
  })

  describe('Number of visible pages is 5 if...', () => {
    it('items quantity is 50, page size is 10', () => {
      wrapper = makeWrapper({itemsQuantity: 70, pageSize: 10, currentPage: 1})
      expect(wrapper.findAll('button').length).toBe(7);
    });

    it('items quantity is 70, page size is 10', () => {
      wrapper = makeWrapper({itemsQuantity: 70, pageSize: 10, currentPage: 1})
      expect(wrapper.findAll('button').length).toBe(7);
    });
  })
});
