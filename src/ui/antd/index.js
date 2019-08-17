import Form from 'components/form';
import Input from 'components/input';
import Select from 'components/select';
import Radio from 'components/radio';
import packages from 'core/packages';
if (!window.antd) {
  packages.logs('ant-design-vue');
}
export default [
  Form,
  Select,
  Radio,
  Input
];

