import Form from 'components/form';
import Input from 'components/input';
import InputNumber from 'components/input-number';
import Select from 'components/select';
import Radio from 'components/radio';
import Slider from 'components/slider';
import Rate from 'components/rate';
import Switch from 'components/switch';
import Checkbox from 'components/checkbox';
import Time from 'components/time';
import Dates from 'components/date';
import Upload from 'components/upload';
import Cascader from 'components/cascader';
import Crud from 'components/crud';
import packages from 'core/packages';
if (!window.antd) {
  packages.logs('ant-design-vue');
}
export default [
  Cascader,
  Crud,
  Slider,
  Upload,
  Time,
  Dates,
  Rate,
  Form,
  Select,
  Radio,
  Checkbox,
  Switch,
  InputNumber,
  Input
];

