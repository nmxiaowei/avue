import Carousel from 'components/carousel';
import Crud from 'components/crud';
import Form from 'components/form';
import Checkbox from 'components/checkbox';
import Date from 'components/date';
import Detail from 'components/detail';
import Time from 'components/time';
import Input from 'components/input';
import Radio from 'components/radio';
import Select from 'components/select';
import Cascader from 'components/cascader';
import InputNumber from 'components/input-number';
import Switchs from 'components/switch';
import Rate from 'components/rate';
import Upload from 'components/upload';
import Silder from 'components/silder';
import Img from 'components/img';
import Group from 'components/group';
import Tree from 'components/tree';
import TableTree from 'components/table-tree';
import Search from 'components/search'
import Vue from 'Vue';
import $log from 'plugin/logs/util';
import _export from 'plugin/export/';

if (!window.ELEMENT) {
  $log.warning('需要引入UI框架包');
  $log.capsule(
    'element-ui',
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.11/index.js',
    'warning'
  );
}
Vue.use(_export);
export default [
  Carousel,
  Crud,
  Form,
  Checkbox,
  Date,
  Time,
  Input,
  Radio,
  Select,
  Cascader,
  InputNumber,
  Switchs,
  Rate,
  Upload,
  Silder,
  Img,
  Detail,
  Group,
  Tree,
  TableTree,
  Search
];
