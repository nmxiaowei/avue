const ELEMENT = '__';
const MODS = '--';

const join = (name: string, el: string, symbol: string) => (el ? name + symbol + el : name);

const prefix = (name: string, mods: any): any => {
  if (typeof mods === 'string') {
    return join(name, mods, MODS);
  }

  if (Array.isArray(mods)) {
    return mods.map((item) => prefix(name, item));
  }

  const ret: Record<string, any> = {};
  Object.keys(mods || {}).forEach((key) => {
    ret[name + MODS + key] = mods[key];
  });
  return ret;
};

export default {
  methods: {
    b(this: any, el: any, mods: any) {
      const { name } = this.$options;

      if (el && typeof el !== 'string') {
        mods = el;
        el = '';
      }
      el = join(name, el, ELEMENT);

      return mods ? [el, prefix(el, mods)] : el;
    },
  },
};
