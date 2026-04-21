declare module "packages/*" {
  import type { DefineComponent } from "vue";

  const moduleValue: DefineComponent<any, any, any>;
  export default moduleValue;
}

declare module "packages/*/index" {
  import type { DefineComponent } from "vue";

  const moduleValue: DefineComponent<any, any, any>;
  export default moduleValue;
}
