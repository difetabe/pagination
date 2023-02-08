import AppPagination from '../../AppPagination.vue'
import {mount} from "@vue/test-utils";

let wrapper;

function makeWrapper(numberOfItems = 100, pageSize = 10, currentPage = 1) {
  return mount(AppPagination, {
    props: {
      numberOfItems,
      pageSize,
      currentPage
    }
  })
}

function findNavButton(prevOrNext) {
  const atr = `[data-test="${prevOrNext}"]`
  return wrapper.find(atr);
}

function findButtonByText(text) {
  return wrapper.findAll("button").find(w => w.text().includes(text));
}

describe('Pagination buttons test', () => {

  describe('Checking the quantity of page-number buttons', () => {

    describe('No buttons if...', () => {
      it('only 1 page', () => {
        wrapper = makeWrapper(5);
        expect(wrapper.text()).toBe('');
      })

      it('numberOfItems < 1', () => {
        wrapper = makeWrapper(-4, 10, 5);
        expect(wrapper.text()).toBe('');
      })

      it('numberOfItems = 0', () => {
        wrapper = makeWrapper(0, 10, 5);
        expect(wrapper.text()).toBe('');
      })

      it('pageSize < 1', () => {
        wrapper = makeWrapper(100, -1, 5);
        expect(wrapper.text()).toBe('');
      })

      it('pageSize = 0', () => {
        wrapper = makeWrapper(100, 0, 5);
        expect(wrapper.text()).toBe('');
      })

      it('currentPage < 1', () => {
        wrapper = makeWrapper(100, 10, -3);
        expect(wrapper.text()).toBe('');
      })

      it('currentPage = 0', () => {
        wrapper = makeWrapper(100, 10, 0);
        expect(wrapper.text()).toBe('');
      })
    })

    it('2 pages + 2 nav-buttons', () => {
      wrapper = makeWrapper(20);
      expect(wrapper.findAll('button').length).toBe(4);
      console.log(wrapper.html())
    })

    it('3 pages + 2 nav-buttons', () => {
      wrapper = makeWrapper(30)
      expect(wrapper.findAll('button').length).toBe(5);
    })

    it('4 pages + 2 nav-buttons', () => {
      wrapper = makeWrapper(100);
      expect(wrapper.findAll('button').length).toBe(6);

      wrapper = makeWrapper(100, 10, 2);
      expect(wrapper.findAll('button').length).toBe(6);

      wrapper = makeWrapper(100, 10, 9);
      expect(wrapper.findAll('button').length).toBe(6);

      wrapper = makeWrapper(100, 10, 10);
      expect(wrapper.findAll('button').length).toBe(6);
    })

    it('5 pages + 2 nav-buttons', () => {
      wrapper = makeWrapper(50);
      expect(wrapper.findAll('button').length).toBe(7);

      wrapper = makeWrapper(100, 10, 4);
      expect(wrapper.findAll('button').length).toBe(7);

      wrapper = makeWrapper(100, 10, 5);
      expect(wrapper.findAll('button').length).toBe(7);

      wrapper = makeWrapper(100, 10, 8);
      expect(wrapper.findAll('button').length).toBe(7);
    })
  })

  describe('Setting this page emitted by click on...', () => {
    it('prev button', () => {
      wrapper = makeWrapper(70, 10, 2)
      findNavButton('prev').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
    })

    it('next button', () => {
      wrapper = makeWrapper(100, 10, 9)
      findNavButton('next').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([10]);
    })

    it('click on [1] from [2]', () => {
      wrapper = makeWrapper(100, 10, 2)
      findButtonByText('1').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([1]);
    })

    it('click on [2] from [1]', () => {
      wrapper = makeWrapper();
      findButtonByText('2').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([2]);
    })

    it('click on last button from previous button', () => {
      wrapper = makeWrapper(100, 10, 9);
      findButtonByText('10').trigger('click');

      expect(wrapper.emitted()['set-current-page'][0]).toEqual([10]);
    })
  })

  describe('Setting this page NOT emitted by click on...', () => {
    it('prev button if current page is 1', () => {
      wrapper = makeWrapper();
      findNavButton('prev').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })

    it('next button if current page is last', () => {
      wrapper = makeWrapper(100, 10, 10);
      findNavButton('next').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })

    it('current page yet', () => {
      wrapper = makeWrapper(100, 10, 5);
      findButtonByText('5').trigger('click');

      expect(wrapper.emitted('set-current-page')).toBeFalsy();
    })
  })

  describe('Expected page position is...', () => {
    it('first', () => {
      wrapper = makeWrapper();
      expect(wrapper.findAll('button')[1].text()).toContain('1');
    });

    it('second', () => {
      wrapper = makeWrapper(100, 10, 2);
      expect(wrapper.findAll('button')[2].text()).toContain('2');

      wrapper = makeWrapper(100, 10, 8);
      expect(wrapper.findAll('button')[2].text()).toContain('7');

      wrapper = makeWrapper(100, 10, 9);
      expect(wrapper.findAll('button')[2].text()).toContain('8');

      wrapper = makeWrapper(100, 10, 10);
      expect(wrapper.findAll('button')[2].text()).toContain('8');
    });

    it('third', () => {
      wrapper = makeWrapper(30, 10, 2);
      expect(wrapper.findAll('button')[3].text()).toContain('3');

      wrapper = makeWrapper(50, 10, 3);
      expect(wrapper.findAll('button')[3].text()).toContain('3');

      wrapper = makeWrapper(100, 10, 3);
      expect(wrapper.findAll('button')[3].text()).toContain('3');

      wrapper = makeWrapper(100, 10, 6);
      expect(wrapper.findAll('button')[3].text()).toContain('6');

      wrapper = makeWrapper(100, 10, 8);
      expect(wrapper.findAll('button')[3].text()).toContain('8');

      wrapper = makeWrapper(100, 10, 9);
      expect(wrapper.findAll('button')[3].text()).toContain('9');
    });

    it('fourth', () => {
      wrapper = makeWrapper(100, 10, 2);
      expect(wrapper.findAll('button')[4].text()).toContain('10');

      wrapper = makeWrapper(100, 10, 3);
      expect(wrapper.findAll('button')[4].text()).toContain('4');

      wrapper = makeWrapper(40, 10, 4);
      expect(wrapper.findAll('button')[4].text()).toContain('4');

      wrapper = makeWrapper(50, 10, 4);
      expect(wrapper.findAll('button')[4].text()).toContain('4');

      wrapper = makeWrapper(100, 10, 10);
      expect(wrapper.findAll('button')[4].text()).toContain('10');
    });

    it('fifth', () => {
      wrapper = makeWrapper(100, 10, 5);
      expect(wrapper.findAll('button')[5].text()).toContain('10');
    });
  });
});
