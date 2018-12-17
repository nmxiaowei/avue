import Form from 'components/form';
import Input from 'components/input';
import Select from 'components/select';
import Radio from 'components/radio';
import Checkbox from 'components/checkbox';
import Switch from 'components/switch';
import Date from 'components/date';
import Time from 'components/time';
import $log from 'plugin/logs/util';
if (!window.vant) {
  $log.warning('需要引入UI框架包');
  $log.capsule(
    'vant',
    'https://cdn.jsdelivr.net/npm/vant@1.4/lib/vant.min.js',
    'warning'
  );
}
export default [Form, Select, Input, Radio, Checkbox, Date, Time, Switch];
