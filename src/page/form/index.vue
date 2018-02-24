<template>
 <div class="from-container pull-height">
   <Form 
   :formOption="formOption" 
   :formSubmitText="formSubmitText"
   @handleSubmit="handleSubmit" 
   ></Form>
 </div>
</template>

<script>
import { mapGetters } from "vuex";
import Form from "@/components/form/";
import formOption from "@/const/formOption";
export default {
  name: "from",
  data() {
    return {
      formOption: formOption,
      formSubmitText: "确定",
      form: {}
    };
  },
  created() {},
  watch: {},
  mounted() {},
  computed: {
    ...mapGetters(["permission"])
  },
  props: [],
  methods: {
    handleSubmit(form) {
      if (form) {
        this.form = form;
        this.$message({
          message: form,
          type: "success"
        });
      } else {
      }
    }
  },
  components: {
    Form
  }
};
</script>

<style lang="scss" scoped>
.from-container {
  padding: 8px 10px;
}
</style>
