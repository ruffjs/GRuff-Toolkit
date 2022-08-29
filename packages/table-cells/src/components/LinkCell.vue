<template>
  <a-button
    type="link"
    :class="column.class"
    :disabled="typeof column.disabled === 'function' ? !!column.disabled(record) : false"
    @click="handleClick"
    >{{ title }}
  </a-button>
</template>

<script setup>
import { useRouter } from "vue-router";
import useCustomRender from "../traits/useCustomRender";

const props = defineProps({
  index: Number,
  text: [String, Number, Object, Boolean],
  column: {
    type: Object,
    required: true,
  },
  record: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const title = useCustomRender(props);
const handleClick = () => {
  if (props.record) {
    if (typeof props.column?.link === "string") {
      try {
        const paths = props.column.link.split(/\/+/).map((item) => {
          if (item.startsWith(":")) {
            const key = item.replace(":", "");
            if (key in props.record) {
              return props.record[key].toString();
            } else {
              throw "No key " + key;
            }
          }
          return item;
        });
        router.push(paths.join("/"));
      } catch (error) {
        console.log(error);
      }
    } else if (typeof props.column?.link === "function") {
      const path = props.column.link(props.record, props.column);
      // console.log(path)
      router.push(path);
    } else if (typeof props.column?.action === "function") {
      props.column.action(props.record, props.column);
    }
  }
};
</script>
