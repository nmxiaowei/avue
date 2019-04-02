import { t } from 'locale';

export const locale = (...args) => {
  return t.apply(this, args);
}
export default {
  methods: {
    t(...args) {
      return locale(...args);
    }
  }
};