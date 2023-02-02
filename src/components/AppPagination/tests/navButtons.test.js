import AppPagination from '../../AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(currentPage = 1, itemsQuantity = 100, pageSize = 10,) {
  return mount(AppPagination, {
    props: {
      itemsQuantity,
      pageSize,
      currentPage,
    }
  })
}

function findNavButton(prevOrNext) {
  const atr = `[data-test="${prevOrNext}"]`
  return wrapper.find(atr);
}

describe('Navigation buttons test', () => {
  describe('Setting this page emitted by click on...', () => {
    it('prev button', () => {
      wrapper = makeWrapper(2)
      findNavButton('prev').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
    })

    it('next button', () => {
      wrapper = makeWrapper(9)
      findNavButton('next').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([10]);
    })
  })

  describe('Setting this page NOT emitted by click on...', () => {
    it('prev button if current page is 1', () => {
      wrapper = makeWrapper(1);
      findNavButton('prev').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })

    it('next button if current page is last', () => {
      wrapper = makeWrapper( 10);
      findNavButton('next').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })
  })
});


