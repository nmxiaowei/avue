export default {
  methods: {
    getSlotName(item: Record<string, any> = {}, type = 'D', slot?: Record<string, any>) {
      const result: Record<string, string> = {
        F: '-form',
        H: '-header',
        E: '-error',
        L: '-label',
        S: '-search',
        T: '-type',
        D: '',
      };
      const name = item.prop + result[type];
      if (slot) return slot[name];
      return name;
    },
    getSlotList(list: string[] = [], slot: Record<string, any>, propList: Array<Record<string, any>>) {
      const propNames = propList.map((ele) => ele.prop);
      return Object.keys(slot).filter((ele) => {
        let result = false;
        if (!propNames.includes(ele)) {
          list.forEach((name) => {
            if (ele.includes(name)) result = true;
          });
        }
        return result;
      });
    },
  },
};
