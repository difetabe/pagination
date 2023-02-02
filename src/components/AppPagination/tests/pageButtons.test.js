import AppPagination from '../../AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(currentPage = 1, itemsQuantity = 100, pageSize = 10) {
  return mount(AppPagination, {
    props: {
      itemsQuantity,
      pageSize,
      currentPage,
    }
  })
}

function findButtonByText(text) {
  return wrapper.findAll("button").find(w => w.text().includes(text));
}

describe('Page buttons test', () => {

  describe('Setting this page emitted if..', () => {
    it('click on [1] from [2]', () => {
      wrapper = makeWrapper(2)
      findButtonByText('1').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
    })

    it('click on [2] from [1]', () => {
      wrapper = makeWrapper();
      findButtonByText('2').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([2]);
    })

    it('click on last button from previous button', () => {
      wrapper = makeWrapper(9);
      findButtonByText('10').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([10]);
    })
  })

  describe('Setting this page NOT emitted if..', () => {
    it('click on current page', () => {
      wrapper = makeWrapper(5);
      findButtonByText('5').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })
  })

  describe('Expected page position is...', () => {
    it('central if current page 3', () => {
      wrapper = makeWrapper(3, 50, 10);
      expect(wrapper.findAll('button')[3].text()).toContain('2');
    });

    it('central if current page 8', () => {
      wrapper = makeWrapper(8);
      expect(wrapper.findAll('button')[3].text()).toContain('8');
    });

    it('left', () => {
      wrapper = makeWrapper();
      expect(wrapper.findAll('button')[1].text()).toContain('1');
    });

  it('has 1 page left and 3 pages right', () => {
    wrapper = makeWrapper(2);
    expect(wrapper.findAll('button')[2].text()).toContain('2');
  });

  it('has 3 page left and 1 page right', () => {
    wrapper = makeWrapper(9);
    expect(wrapper.findAll('button')[4].text()).toContain('9');
  });

  it('right', () => {
    wrapper = makeWrapper(10);
    expect(wrapper.findAll('button')[5].text()).toContain('10');
  });
  });
});
