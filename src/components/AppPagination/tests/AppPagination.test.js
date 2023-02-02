import AppPagination from '../../AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(itemsQuantity = 100, pageSize = 10, currentPage = 1) {
  return mount(AppPagination, {
    props:{
      itemsQuantity,
      pageSize,
      currentPage,}
  })
}

describe('Pagination test', () => {
  it('No buttons if only 1 page', () => {
    wrapper = makeWrapper(5, 10, 1);
    expect(wrapper.text()).toBe('');
  })

  it('We have 2 pages', () => {
    wrapper = makeWrapper(20, 10, 1);
    expect(wrapper.findAll('button').length).toBe(4);
  })

  it('We have 3 pages', () => {
    wrapper = makeWrapper(30, 10, 1)
    expect(wrapper.findAll('button').length).toBe(5);
  })

  it('We have 5 pages', () => {
    wrapper = makeWrapper();
    expect(wrapper.findAll('button').length).toBe(7);
  })
});
