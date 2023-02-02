import AppPagination from './AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(props) {
  return mount(AppPagination, {props})
}

describe('Page buttons test', () => {

  describe('Set-current-page emitted if..', () => {
    it('click on [1] from [2]', () => {
      wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 2})
      wrapper.findAll("button").find(w => w.text().includes('1')).trigger('click');
      expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
    })

    it('click on [2] from [1]', () => {
      wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 1})
      wrapper.findAll("button").find(w => w.text().includes('2')).trigger('click');
      expect(wrapper.emitted()['set-current-page'][0]).toEqual([2]);
    })

    it('click on last from previous before last', () => {
      wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 5})
      wrapper.findAll("button").find(w => w.text().includes('6')).trigger('click');
      expect(wrapper.emitted()['set-current-page'][0]).toEqual([6]);
    })
  })

  it('Set-current-page not emitted if click on current page', () => {
    wrapper = makeWrapper({itemsQuantity: 70, pageSize: 10, currentPage: 5})
    wrapper.findAll("button").find(w => w.text().includes('5')).trigger('click');
    expect(wrapper.emitted()['set-current-page'][0]).toEqual([5]);
  });

  describe('Expected page position is...', () => {

    it('central', () => {
      wrapper = makeWrapper({itemsQuantity: 70, pageSize: 10, currentPage: 5})
      expect(wrapper.findAll('button')[3].text()).toContain('5');
    });

    it('central', () => {
      wrapper = makeWrapper({itemsQuantity: 70, pageSize: 10, currentPage: 8})
      expect(wrapper.findAll('button')[3].text()).toContain('8');
    });

    it('left', () => {
      wrapper = makeWrapper({itemsQuantity: 100, pageSize: 10, currentPage: 1})
      expect(wrapper.findAll('button')[1].text()).toContain('1');
    });

    it('has 1 page left and 3 pages right', () => {
      wrapper = makeWrapper({itemsQuantity: 100, pageSize: 10, currentPage: 2})
      expect(wrapper.findAll('button')[2].text()).toContain('2');
    });

    it('has 3 page left and 1 page right', () => {
      wrapper = makeWrapper({itemsQuantity: 100, pageSize: 10, currentPage: 9})
      expect(wrapper.findAll('button')[4].text()).toContain('9');
    });

    it('right', () => {
      wrapper = makeWrapper({itemsQuantity: 100, pageSize: 10, currentPage: 10})
      expect(wrapper.findAll('button')[5].text()).toContain('10');
    });
  })

})
