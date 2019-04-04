import { t } from 'locale';

export const locale = function (...args) {
  return t.apply(this, args);
}
export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};