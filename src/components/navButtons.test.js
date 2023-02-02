import AppPagination from './AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(props) {
  return mount(AppPagination, {props})
}

it('Set-current-page emitted prev button', () => {
  wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 2})
  wrapper.find('[data-test="prev"]').trigger('click');
  expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
})

it('Set-current-page emitted next button', () => {
  wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 5})

  wrapper.find('[data-test="next"]').trigger('click');
  expect(wrapper.emitted()['set-current-page'][0]).toEqual([6]);
})

describe('No emitted set-current-page on...', () => {
  it('prev button if current page is 1', () => {
    wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 1})

    wrapper.find('[data-test="prev"]').trigger('click');
    expect(wrapper.emitted('set-current-page')).toBeFalsy();
  })

  it('Set-current-page not emitted next button', () => {
    wrapper = makeWrapper({itemsQuantity: 60, pageSize: 10, currentPage: 6})

    wrapper.find('[data-test="next"]').trigger('click');
    expect(wrapper.emitted('set-current-page')).toBeFalsy();
  })

})
