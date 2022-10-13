import hljs from "highlight.js";
import { marked } from "marked";

hljs.highlightAll();

export default marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function (code: any) {
    return hljs.highlightAuto(code).value;
  },
});
