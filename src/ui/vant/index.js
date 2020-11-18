import Form from 'components/form';
import Input from 'components/input';
import Select from 'components/select';
import Radio from 'components/radio';
import Checkbox from 'components/checkbox';
import Switch from 'components/switch';
import Date from 'components/date';
import Time from 'components/date';
import Upload from 'components/upload';
import InputNumber from 'components/input-number';
import Slider from 'components/slider';
import Rate from 'components/rate';
import Cell from 'components/cell';
import Grid from 'components/grid';
import Swipe from 'components/swipe';
import Tabbar from 'components/tabbar';
import Refresh from 'components/refresh';
import Crud from 'components/crud';
import Card from 'components/card';
import packages from 'core/packages';
if (!window.vant) {
  packages.logs('vant');
}
export default { Card, Cell, Refresh, Crud, Tabbar, Swipe, Grid, InputNumber, Slider, Rate, Form, Select, Input, Radio, Checkbox, Date, Time, Switch, Upload };
