<template>
  <div class="search-field-wrapper">
    <ElInput
      :model-value="searchValue"
      placeholder="placeholder"
      prefix-icon="el-icon-search"
      @input="(event) => setValue(property, event)"
    />
  </div>
</template>
<script>
import { ElInput } from 'element-plus';

export default {
  name: "SearchField",
  components: {
    ElInput,
  },
  props: {
    searchValue: {
      required: true,
      type: String,
      default: ''
    },
    property: {
      required: true,
      type: String,
      default: ''
    },
    setValue: {
      required: true,
      type: Function,
      default: () => {}
    },
    placeholder: {
      required: true,
      type: String,
      default: ''
    }
  }
};
</script>
<style>
.search-field-wrapper .el-input__inner {
    background: transparent;
    height: 60px;
    line-height: 60px;
    border-radius: 10px;
}

.search-field-wrapper .el-input__icon {
  line-height: 60px;
}
</style>
