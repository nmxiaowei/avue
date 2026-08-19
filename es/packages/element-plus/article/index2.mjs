/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

const propsDefault = {
  title: "title",
  meta: "meta",
  lead: "lead",
  body: "body"
};
const allowedTags = new Set([
  "A", "B", "BLOCKQUOTE", "BR", "CODE", "DEL", "DIV", "EM", "FIGCAPTION", "FIGURE",
  "H1", "H2", "H3", "H4", "H5", "H6", "HR", "I", "IMG", "LI", "MARK", "OL",
  "P", "PRE", "S", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TABLE", "TBODY",
  "TD", "TH", "THEAD", "TR", "UL"
]);
const dangerousTags = new Set(["EMBED", "FORM", "IFRAME", "OBJECT", "SCRIPT", "STYLE"]);

var script = create({
  name: "article",
  emits: ["image-click", "link-click", "preview-open", "preview-close"],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    },
    option: {
      type: Object,
      default: () => ({})
    },
    sanitize: {
      type: [Boolean, Function],
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    showInfo: Boolean,
    titleLevel: {
      type: Number,
      default: 1
    },
    maxWidth: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImages: [],
      previewIndex: 0
    };
  },
  computed: {
    fieldProps() {
      return {
        ...propsDefault,
        ...((this.option && this.option.props) || {}),
        ...(this.props || {})
      };
    },
    titleKey() {
      return this.fieldProps.title;
    },
    metaKey() {
      return this.fieldProps.meta;
    },
    leadKey() {
      return this.fieldProps.lead;
    },
    bodyKey() {
      return this.fieldProps.body;
    },
    title() {
      return this.data[this.titleKey];
    },
    meta() {
      return this.data[this.metaKey];
    },
    lead() {
      return this.data[this.leadKey];
    },
    body() {
      return this.data[this.bodyKey];
    },
    hasBody() {
      return this.body !== undefined && this.body !== null && this.body !== "";
    },
    formattedBody() {
      const content = String(this.body || "");
      if (typeof this.sanitize === "function") return String(this.sanitize(content) || "");
      return this.sanitize ? this.sanitizeHtml(content) : content;
    },
    wordCount() {
      const content = String(this.body || "").replace(/<[^>]*>/g, "").replace(/\s/g, "");
      return content.length;
    },
    readingMinutes() {
      return Math.max(1, Math.ceil(this.wordCount / 400));
    },
    titleTag() {
      const level = Math.min(6, Math.max(1, Number(this.titleLevel) || 1));
      return `h${level}`;
    },
    styleName() {
      if (this.maxWidth === "" || this.maxWidth === undefined || this.maxWidth === null) return {};
      const size = typeof this.maxWidth === "number" ? `${this.maxWidth}px` : this.maxWidth;
      return { maxWidth: size };
    }
  },
  methods: {
    sanitizeHtml(content) {
      if (typeof document === "undefined") return this.escapeHtml(content);
      const container = document.createElement("div");
      container.innerHTML = content;
      Array.from(container.querySelectorAll("*")).forEach((node) => {
        const tag = node.tagName;
        if (dangerousTags.has(tag)) {
          node.remove();
          return;
        }
        if (!allowedTags.has(tag)) {
          node.replaceWith(document.createTextNode(node.textContent || ""));
          return;
        }

        Array.from(node.attributes).forEach((attribute) => {
          const name = attribute.name.toLowerCase();
          const isLinkAttribute = tag === "A" && ["href", "title"].includes(name);
          const isImageAttribute = tag === "IMG" && ["src", "alt", "title", "width", "height"].includes(name);
          const isTableAttribute = ["TD", "TH"].includes(tag) && ["colspan", "rowspan"].includes(name);
          if (!isLinkAttribute && !isImageAttribute && !isTableAttribute) node.removeAttribute(attribute.name);
        });

        if (tag === "A") {
          const href = this.safeUrl(node.getAttribute("href"));
          if (href) {
            node.setAttribute("href", href);
            if (/^https?:/i.test(href)) {
              node.setAttribute("target", "_blank");
              node.setAttribute("rel", "noopener noreferrer");
            }
          } else {
            node.removeAttribute("href");
          }
        }

        if (tag === "IMG") {
          const src = this.safeUrl(node.getAttribute("src"), true);
          if (src) {
            node.setAttribute("src", src);
            node.setAttribute("loading", "lazy");
            node.setAttribute("decoding", "async");
          } else {
            node.remove();
          }
        }
      });
      return container.innerHTML;
    },
    safeUrl(value, allowDataImage = false) {
      if (!value || typeof window === "undefined") return "";
      try {
        const url = new URL(value, window.location.origin);
        const isHttp = ["http:", "https:"].includes(url.protocol);
        const isContact = ["mailto:", "tel:"].includes(url.protocol);
        const isDataImage = allowDataImage && url.protocol === "data:" && /^data:image\//i.test(value);
        return isHttp || isContact || isDataImage ? url.href : "";
      } catch (error) {
        return "";
      }
    },
    escapeHtml(value) {
      return String(value).replace(/[&<>'"]/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
      }[char]));
    },
    handleBodyClick(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (link) {
        this.$emit("link-click", {
          data: this.data,
          href: link.getAttribute("href") || "",
          event
        });
      }

      const image = target.closest("img");
      if (!image) return;
      const src = this.safeUrl(image.getAttribute("src"), true);
      this.$emit("image-click", { data: this.data, src, event });
      if (!this.preview || !src || !this.$refs.body) return;

      const images = Array.from(this.$refs.body.querySelectorAll("img"))
        .map((item) => this.safeUrl(item.getAttribute("src"), true))
        .filter(Boolean);
      const index = images.indexOf(src);
      if (index === -1) return;

      this.previewImages = images;
      this.previewIndex = index;
      this.previewVisible = true;
      this.$emit("preview-open", { data: this.data, src, index, images });
    },
    closePreview() {
      this.previewVisible = false;
      this.$emit("preview-close", { data: this.data });
    }
  }
});

export { script as default };
