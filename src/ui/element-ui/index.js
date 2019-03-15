import Affix from 'components/affix'
import Avatar from 'components/avatar'
import Carousel from 'components/carousel';
import Crud from 'components/crud';
import Card from 'components/Card';
import Color from 'components/color';
import Form from 'components/form';
import Checkbox from 'components/checkbox';
import Date from 'components/date';
import Detail from 'components/detail';
import Divider from 'components/divider';
import Empty from 'components/empty';
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
import Skeleton from 'components/skeleton'
import Tabs from 'components/tabs'
import Dynamic from 'components/dynamic'
import Queue from 'components/queue'
import IconSelect from 'components/icon-select'
import Timeline from 'components/timeline';
import Drawer from 'components/drawer'
import BackTop from 'components/back-top'
import textEllipsis from 'components/text-ellipsis'
import packages from 'core/packages';
if (!window.Element) {
  packages.logs('element-ui')
}
import AvueData from '../data/';
import AvueEchart from '../echart/';
export default [
  Affix,
  Avatar,
  Carousel,
  Crud,
  Color,
  Card,
  Form,
  Checkbox,
  Date,
  Divider,
  Empty,
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
  Search,
  Tabs,
  Queue,
  Dynamic,
  IconSelect,
  Drawer,
  BackTop,
  Timeline,
  Timeline.Item,
  textEllipsis,
  Skeleton,
  ...AvueData,
  ...AvueEchart
]
