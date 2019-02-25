import Form from 'components/form';
import Input from 'components/input';
import Select from 'components/select';
import Radio from 'components/radio';
import Checkbox from 'components/checkbox';
import Switch from 'components/switch';
import Date from 'components/date';
import Time from 'components/time';
import Upload from 'components/upload';
import packages from 'core/packages';
if (!window.vant) {
  packages.logs('vant')
}
export default [Form, Select, Input, Radio, Checkbox, Date, Time, Switch, Upload];
