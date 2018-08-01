import { createVue, destroyVM } from '../util';
const DELAY = 10;
const toArray = function(obj) {
  return [].slice.call(obj);
};
describe('Crud', () => {
  const getCrudVm = (configs = {}, options, data) => {
    if (!options) {
      options = {
        checkbox: false,
        column: [{
          label: '姓名',
          prop: 'name'
        }]
      };
    }
    if (!data) {
      data = [{
        name: '张三'
      }, {
        name: '李四'
      }];
    }
    const vm = createVue({
      template: `
        <div>
          <avue-crud
            v-model="value"
            :option="option"
            :data="tableData" >
          </avue-crud>
        </div>
      `,
      data() {
        return {
          option: options,
          tableData: data,
          value: {}
        };
      }
    }, true);
    return vm;
  };
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('head', done => {
    vm = getCrudVm();
    setTimeout(_ => {
      const ths = toArray(vm.$el.querySelectorAll('div.el-table__header-wrapper thead th'));
      expect(ths.map(node => node.textContent).filter(o => o))
        .to.eql(['姓名', '操作']);
      done();
    }, DELAY);
  });

});
