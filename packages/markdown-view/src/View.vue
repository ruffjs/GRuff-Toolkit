<template>
  <div ref="preview">
    <div :class="`ruff-markdown-view ${'markdown-theme-' + theme}`" v-html="html"></div>
    <!-- 预览图片-->
    <div :class="['preview-img', previewImgModal ? 'active' : '']">
      <div class="close">
        <RuffIcon type="antd" name="close-outlined" @click="previewImgModal = false" />
      </div>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="" />
    </div>
  </div>
</template>

<script>
import marked from "./utils";
import RuffIcon from "@ruff-web/icons/src/RuffIcon.vue";

export default {
  name: "markdown-view",
  props: {
    value: {
      type: String,
      default: "",
    },
    markedOptions: {
      type: Object,
      default: () => ({}),
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      html: "",
      previewImgModal: false,
      previewImgSrc: "",
      previewImgMode: "",
    };
  },
  mounted() {
    this.translateMarkdown();
  },
  methods: {
    translateMarkdown() {
      // console.log(this.value);
      let html = marked(this.value, {
        sanitize: false,
        ...this.markedOptions,
      }).replace(/href="/gi, 'target="_blank" href="');
      if (this.copyCode) {
        html = html
          .replace(
            /<pre>/g,
            '<div class="code-block"><span class="copy-code">' +
              this.copyBtnText +
              "</span><pre>"
          )
          .replace(/<\/pre>/g, "</pre></div>");
      }
      this.html = html;
      this.addImageClickListener();
    },
    addImageClickListener() {
      // 监听查看大图
      const { imgs = [] } = this;
      if (imgs.length > 0) {
        for (let i = 0, len = imgs.length; i < len; i++) {
          imgs[i].onclick = null;
        }
      }
      setTimeout(() => {
        if (this.$refs.preview) {
          this.imgs = this.$refs.preview.querySelectorAll("img");
          for (let i = 0, len = this.imgs.length; i < len; i++) {
            this.imgs[i].onclick = () => {
              const src = this.imgs[i].getAttribute("src");
              this.previewImage(src);
            };
          }
        }
      }, 600);
    },
    previewImage(src) {
      // 预览图片
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const windowRatio = window.innerHeight / window.innerWidth;
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        console.log(height, width);
        if (height / width < windowRatio) {
          this.previewImgMode = "horizontal";
        } else {
          this.previewImgMode = "vertical";
        }
        this.previewImgSrc = src;
        this.previewImgModal = true;
      };
    },
  },
  watch: {
    value() {
      this.translateMarkdown();
    },
  },
  components: { RuffIcon },
};
</script>
