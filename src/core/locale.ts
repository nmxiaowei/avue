import { t } from '../locale';

export default {
  methods: {
    t(...args: any[]) {
      return t.apply(this, args);
    },
  },
};
