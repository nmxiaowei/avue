<template>
  <div :class="b()">
    <!-- 手机号输入（带国际区号，需要特殊布局） -->
    <template v-if="isPhone">
      <div class="avue-input__phone">
        <el-select v-model="phoneCode"
                   class="avue-input__phone-code"
                   :size="size"
                   :disabled="disabled"
                   :placeholder="phoneCodePlaceholderText"
                   filterable
                   style="width: 120px;">
          <el-option v-for="item in phoneCodeList"
                     :key="item.code"
                     :label="item.label"
                     :value="item.code">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">{{ item.code }}</span>
          </el-option>
        </el-select>
        <el-input class="avue-input__phone-input"
                  :size="size"
                  :clearable="clearableVal"
                  v-model="phoneNumber"
                  @keyup.enter="isSearch?appendClick(text):''"
                  @click="handleClick"
                  :maxlength="phoneMaxLength"
                  :prefix-icon="prefixIcon"
                  :suffix-icon="suffixIcon"
                  :readonly="readonly"
                  :placeholder="phonePlaceholderText"
                  @focus="handleFocus"
                  @blur="handlePhoneBlur"
                  :disabled="disabled"
                  style="flex: 1;">
        </el-input>
      </div>
    </template>

    <!-- 验证码输入（分段输入框） -->
    <template v-else-if="isCode">
      <div class="avue-input__code">
        <input v-for="(val, index) in codeValues"
               :key="index"
               type="text"
               maxlength="1"
               class="avue-input__code-item"
               :class="{ 'is-disabled': disabled }"
               :value="val"
               :disabled="disabled"
               :readonly="readonly"
               @input="handleCodeInput($event, index)"
               @keydown="handleCodeKeydown($event, index)"
               @paste="handleCodePaste($event)"
               @focus="handleFocus"
               @blur="handleBlur"
               :ref="el => codeRefs[index] = el" />
      </div>
    </template>

    <!-- 车牌号输入（省份选择 + 车牌号） -->
    <template v-else-if="isPlate">
      <div class="avue-input__plate">
        <el-select v-model="plateProvince"
                   class="avue-input__plate-province"
                   :size="size"
                   :disabled="disabled"
                   style="width: 70px;">
          <el-option v-for="item in resolvedPlateProvinceList"
                     :key="item"
                     :label="item"
                     :value="item" />
        </el-select>
        <el-input class="avue-input__plate-number"
                  :size="size"
                  :clearable="clearableVal"
                  v-model="plateNumber"
                  @click="handleClick"
                  :maxlength="7"
                  :readonly="readonly"
                  :placeholder="platePlaceholderText"
                  @focus="handleFocus"
                  @blur="handlePlateBlur"
                  @input="handlePlateInput"
                  :disabled="disabled"
                  style="flex: 1;">
        </el-input>
      </div>
    </template>

    <!-- IP地址输入（4段输入框） -->
    <template v-else-if="isIp">
      <div class="avue-input__ip">
        <template v-for="(seg, index) in ipSegments" :key="index">
          <input type="text"
                 class="avue-input__ip-segment"
                 :class="{ 'is-disabled': disabled }"
                 maxlength="3"
                 :value="seg"
                 :disabled="disabled"
                 :readonly="readonly"
                 @input="handleIpInput($event, index)"
                 @keydown="handleIpKeydown($event, index)"
                 @focus="handleFocus"
                 @blur="handleBlur"
                 :ref="el => ipRefs[index] = el" />
          <span v-if="index < 3" class="avue-input__ip-dot">.</span>
        </template>
      </div>
    </template>

    <!-- MAC地址输入（6段输入框） -->
    <template v-else-if="isMac">
      <div class="avue-input__mac">
        <template v-for="(seg, index) in macSegments" :key="index">
          <input type="text"
                 class="avue-input__mac-segment"
                 :class="{ 'is-disabled': disabled }"
                 maxlength="2"
                 :value="seg"
                 :disabled="disabled"
                 :readonly="readonly"
                 @input="handleMacInput($event, index)"
                 @keydown="handleMacKeydown($event, index)"
                 @focus="handleFocus"
                 @blur="handleBlur"
                 :ref="el => macRefs[index] = el" />
          <span v-if="index < 5" class="avue-input__mac-sep">{{ macSeparator }}</span>
        </template>
      </div>
    </template>

    <!-- 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） -->
    <template v-else>
      <el-input :class="inputClass"
                :size="size"
                :clearable="clearableVal"
                v-model="inputValue"
                @keyup.enter="isSearch?appendClick(text):''"
                @click="handleClick"
                :type="inputType"
                :maxlength="inputMaxlength"
                :minlength="minlength"
                :show-password="typeParam=='password'?showPassword:false"
                :rows="rows"
                :autosize="{ minRows: minRows, maxRows: maxRows}"
                :prefix-icon="inputPrefixIcon"
                :suffix-icon="inputSuffixIcon"
                :readonly="readonly"
                :placeholder="inputPlaceholder"
                :show-word-limit="isDefault && showWordLimit"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :formatter="isDefault ? formatters : undefined"
                :parser="isDefault ? parser : undefined">
        <!-- 前置内容 -->
        <template #prepend v-if="showPrepend">
          <span @click="prependClick && prependClick(text)">{{ prependText }}</span>
        </template>
        <!-- 后置内容 -->
        <template #append v-if="showAppend">
          <span @click="appendClick && appendClick(text)">{{ appendText }}</span>
        </template>
        <template #append v-else-if="isSearch">
          <el-button icon="el-icon-search" @click="appendClick(text)"></el-button>
        </template>
        <!-- 后缀内容 - 银行卡类型 -->
        <template #suffix v-if="isBankCard && showBankCardType && bankCardType">
          <span class="avue-input__bank-card-type">{{ bankCardType }}</span>
        </template>
        <!-- 后缀内容 - 身份证信息 -->
        <template #suffix v-else-if="isIdCard && showIdCardInfo && idCardInfo">
          <el-tooltip :content="idCardInfoText" placement="top">
            <span class="avue-input__id-card-info">
              {{ idCardValid ? '✓' : '✗' }}
            </span>
          </el-tooltip>
        </template>
        <!-- 后缀内容 - 邮箱验证 -->
        <template #suffix v-else-if="isEmail && emailValid !== null">
          <span class="avue-input__email-valid">{{ emailValid ? '✓' : '✗' }}</span>
        </template>
        <!-- 后缀内容 - 社会信用代码验证 -->
        <template #suffix v-else-if="isUscc && usccValid !== null">
          <span class="avue-input__uscc-valid">{{ usccValid ? '✓' : '✗' }}</span>
        </template>
      </el-input>
    </template>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import locale from "core/locale";

const defaultPhoneCodeOptions = [
  { code: '+86', flag: '🇨🇳', nameKey: 'input.countries.cn' },
  { code: '+852', flag: '🇭🇰', nameKey: 'input.countries.hk' },
  { code: '+853', flag: '🇲🇴', nameKey: 'input.countries.mo' },
  { code: '+886', flag: '🇹🇼', nameKey: 'input.countries.tw' },
  { code: '+1', flag: '🇺🇸', nameKey: 'input.countries.usca' },
  { code: '+44', flag: '🇬🇧', nameKey: 'input.countries.uk' },
  { code: '+81', flag: '🇯🇵', nameKey: 'input.countries.jp' },
  { code: '+82', flag: '🇰🇷', nameKey: 'input.countries.kr' },
  { code: '+65', flag: '🇸🇬', nameKey: 'input.countries.sg' },
  { code: '+61', flag: '🇦🇺', nameKey: 'input.countries.au' },
  { code: '+49', flag: '🇩🇪', nameKey: 'input.countries.de' },
  { code: '+33', flag: '🇫🇷', nameKey: 'input.countries.fr' },
  { code: '+39', flag: '🇮🇹', nameKey: 'input.countries.it' },
  { code: '+7', flag: '🇷🇺', nameKey: 'input.countries.ru' },
  { code: '+91', flag: '🇮🇳', nameKey: 'input.countries.in' },
  { code: '+55', flag: '🇧🇷', nameKey: 'input.countries.br' },
  { code: '+34', flag: '🇪🇸', nameKey: 'input.countries.es' },
  { code: '+31', flag: '🇳🇱', nameKey: 'input.countries.nl' },
  { code: '+41', flag: '🇨🇭', nameKey: 'input.countries.ch' },
  { code: '+46', flag: '🇸🇪', nameKey: 'input.countries.se' },
  { code: '+60', flag: '🇲🇾', nameKey: 'input.countries.my' },
  { code: '+66', flag: '🇹🇭', nameKey: 'input.countries.th' },
  { code: '+84', flag: '🇻🇳', nameKey: 'input.countries.vn' },
  { code: '+62', flag: '🇮🇩', nameKey: 'input.countries.id' },
  { code: '+63', flag: '🇵🇭', nameKey: 'input.countries.ph' }
];

// 货币符号映射
const currencySymbols = {
  CNY: '¥',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  HKD: 'HK$',
  KRW: '₩',
  SGD: 'S$',
  AUD: 'A$',
  CAD: 'C$'
};

export default create({
  name: "input",
  mixins: [props(), event(), locale],
  emits: ['update:modelValue', 'click', 'focus', 'blur', 'change', 'id-card-valid', 'code-complete', 'uscc-valid'],
  data() {
    return {
      // 手机号相关
      phoneCode: '+86',
      phoneNumber: '',
      // 货币相关
      currencyDisplay: '',
      currencyEditing: false,
      // 银行卡相关
      bankCardDisplay: '',
      bankCardType: '',
      // 身份证相关
      idCardDisplay: '',
      idCardValid: null,
      idCardInfo: null,
      // 邮箱相关
      emailDisplay: '',
      emailValid: null,
      showEmailSuggestions: false,
      // 验证码相关
      codeValues: [],
      codeRefs: [],
      // 车牌号相关
      plateProvince: '',
      plateNumber: '',
      // IP地址相关
      ipSegments: ['', '', '', ''],
      ipRefs: [],
      // MAC地址相关
      macSegments: ['', '', '', '', '', ''],
      macRefs: [],
      // 社会信用代码相关
      usccDisplay: '',
      usccValid: null
    };
  },
  props: {
    showPassword: {
      type: Boolean,
      default: true
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: ' _blank'
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    prependClick: {
      type: Function
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function
    },
    formatters: {
      type: Function
    },
    parser: {
      type: Function
    },
    append: {
      type: String
    },
    minlength: [String, Number],
    maxlength: [String, Number],
    rows: Number,
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    },
    autocomplete: {
      type: String
    },
    // ========== 手机号相关配置 ==========
    // 默认区号
    defaultPhoneCode: {
      type: String,
      default: '+86'
    },
    // 区号列表
    phoneCodeOptions: {
      type: Array,
      default: () => []
    },
    // 手机号最大长度
    phoneMaxLength: {
      type: Number,
      default: 11
    },
    // 区号选择器占位符
    phoneCodePlaceholder: {
      type: String,
      default: ''
    },
    // 手机号输入框占位符
    phonePlaceholder: {
      type: String,
      default: ''
    },
    
    // ========== 货币相关配置 ==========
    // 货币类型
    currency: {
      type: String,
      default: 'CNY'
    },
    // 自定义货币符号
    currencySymbolCustom: {
      type: String,
      default: ''
    },
    // 货币单位（如：元、万元）
    currencyUnit: {
      type: String,
      default: ''
    },
    // 小数位数
    currencyPrecision: {
      type: Number,
      default: 2
    },
    // 货币占位符
    currencyPlaceholder: {
      type: String,
      default: ''
    },
    // 最小值
    currencyMin: {
      type: Number,
      default: undefined
    },
    // 最大值
    currencyMax: {
      type: Number,
      default: undefined
    },
    
    // ========== 银行卡相关配置 ==========
    // 分隔符
    bankCardSeparator: {
      type: String,
      default: ' '
    },
    // 分段长度
    bankCardSegment: {
      type: Number,
      default: 4
    },
    // 银行卡最大长度（不含分隔符）
    bankCardMaxDigits: {
      type: Number,
      default: 19
    },
    // 银行卡占位符
    bankCardPlaceholder: {
      type: String,
      default: ''
    },
    // 是否显示银行卡类型
    showBankCardType: {
      type: Boolean,
      default: true
    },
    
    // ========== 身份证相关配置 ==========
    // 身份证占位符
    idCardPlaceholder: {
      type: String,
      default: ''
    },
    // 是否显示身份证信息
    showIdCardInfo: {
      type: Boolean,
      default: true
    },
    // 是否实时校验
    idCardRealtimeValidate: {
      type: Boolean,
      default: true
    },
    
    // ========== 邮箱相关配置 ==========
    emailPlaceholder: {
      type: String,
      default: ''
    },
    // 邮箱后缀建议列表
    emailSuffixes: {
      type: Array,
      default: () => ['@qq.com', '@163.com', '@126.com', '@gmail.com', '@outlook.com', '@hotmail.com', '@sina.com', '@sohu.com', '@foxmail.com', '@icloud.com']
    },
    // 是否显示邮箱建议
    showEmailSuffix: {
      type: Boolean,
      default: true
    },
    
    // ========== 验证码相关配置 ==========
    codePlaceholder: {
      type: String,
      default: ''
    },
    // 验证码长度
    codeLength: {
      type: Number,
      default: 6
    },
    // 验证码分隔符
    codeSeparator: {
      type: String,
      default: ''
    },
    
    // ========== 车牌号相关配置 ==========
    platePlaceholder: {
      type: String,
      default: ''
    },
    // 默认省份
    defaultPlateProvince: {
      type: String,
      default: ''
    },
    // 省份列表
    plateProvinceList: {
      type: Array,
      default: () => []
    },
    
    // ========== IP地址相关配置 ==========
    ipPlaceholder: {
      type: String,
      default: ''
    },
    // IP版本 (4 或 6)
    ipVersion: {
      type: Number,
      default: 4
    },
    
    // ========== MAC地址相关配置 ==========
    macPlaceholder: {
      type: String,
      default: ''
    },
    // MAC分隔符
    macSeparator: {
      type: String,
      default: ':'
    },
    
    // ========== 社会信用代码相关配置 ==========
    usccPlaceholder: {
      type: String,
      default: ''
    },
    // 是否实时校验
    usccRealtimeValidate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isSearch() {
      return this.type === 'search';
    },
    isPhone() {
      return this.type === 'phone';
    },
    isCurrency() {
      return this.type === 'currency';
    },
    isBankCard() {
      return this.type === 'bankCard' || this.type === 'bank-card';
    },
    isIdCard() {
      return this.type === 'idCard' || this.type === 'id-card';
    },
    isEmail() {
      return this.type === 'email';
    },
    isCode() {
      return this.type === 'code';
    },
    isPlate() {
      return this.type === 'plate';
    },
    isIp() {
      return this.type === 'ip';
    },
    isMac() {
      return this.type === 'mac';
    },
    isUscc() {
      return this.type === 'uscc';
    },
    isDefault() {
      return !this.isPhone && !this.isCurrency && !this.isBankCard && !this.isIdCard && 
             !this.isEmail && !this.isCode && !this.isPlate && !this.isIp && !this.isMac && !this.isUscc;
    },
    typeParam() {
      if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    },
    // ========== 统一输入框计算属性 ==========
    inputClass() {
      if (this.isCurrency) return this.b('currency');
      if (this.isBankCard) return this.b('bank-card');
      if (this.isIdCard) return [this.b('id-card'), this.idCardValid === false ? this.b('id-card--invalid') : ''];
      return '';
    },
    inputValue: {
      get() {
        if (this.isCurrency) return this.currencyDisplay;
        if (this.isBankCard) return this.bankCardDisplay;
        if (this.isIdCard) return this.idCardDisplay;
        if (this.isEmail) return this.emailDisplay;
        if (this.isUscc) return this.usccDisplay;
        return this.text;
      },
      set(val) {
        if (this.isCurrency) this.currencyDisplay = val;
        else if (this.isBankCard) this.bankCardDisplay = val;
        else if (this.isIdCard) this.idCardDisplay = val;
        else if (this.isEmail) this.emailDisplay = val;
        else if (this.isUscc) this.usccDisplay = val;
        else this.text = val;
      }
    },
    inputType() {
      if (this.isEmail) return 'email';
      return this.isDefault ? this.typeParam : 'text';
    },
    inputMaxlength() {
      if (this.isBankCard) return this.bankCardMaxLength;
      if (this.isIdCard) return 18;
      if (this.isUscc) return 18;
      return this.maxlength;
    },
    inputPrefixIcon() {
      return this.prefixIcon;
    },
    inputSuffixIcon() {
      if (this.isIdCard) return this.idCardSuffixIcon;
      return this.suffixIcon;
    },
    inputPlaceholder() {
      if (this.isCurrency) return this.currencyPlaceholder || this.t('input.currencyPlaceholder');
      if (this.isBankCard) return this.bankCardPlaceholder || this.t('input.bankCardPlaceholder');
      if (this.isIdCard) return this.idCardPlaceholder || this.t('input.idCardPlaceholder');
      if (this.isEmail) return this.emailPlaceholder || this.t('input.emailPlaceholder');
      if (this.isUscc) return this.usccPlaceholder || this.t('input.usccPlaceholder');
      return this.placeholder;
    },
    phoneCodePlaceholderText() {
      return this.phoneCodePlaceholder || this.t('input.phoneCodePlaceholder');
    },
    phonePlaceholderText() {
      return this.phonePlaceholder || this.t('input.phonePlaceholder');
    },
    platePlaceholderText() {
      return this.platePlaceholder || this.t('input.platePlaceholder');
    },
    showPrepend() {
      if (this.isCurrency) return !!this.currencySymbol;
      return !!this.prepend;
    },
    prependText() {
      if (this.isCurrency) return this.currencySymbol;
      return this.prepend;
    },
    showAppend() {
      if (this.isCurrency) return !!this.currencyUnit;
      return !!this.append;
    },
    appendText() {
      if (this.isCurrency) return this.currencyUnit;
      return this.append;
    },
    showSuffix() {
      return (this.isBankCard && this.showBankCardType && this.bankCardType) ||
             (this.isIdCard && this.showIdCardInfo && this.idCardInfo) ||
             (this.isEmail && this.emailValid !== null) ||
             (this.isUscc && this.usccValid !== null);
    },
    // ========== 原有计算属性 ==========
    // 手机区号列表
    phoneCodeList() {
      const list = this.phoneCodeOptions.length > 0 ? this.phoneCodeOptions : defaultPhoneCodeOptions;
      return list.map((item) => {
        const flag = item.flag || '';
        const name = item.name || (item.nameKey ? this.t(item.nameKey) : item.code);
        return {
          ...item,
          name,
          label: item.label || [flag, item.code].filter(Boolean).join(' ')
        };
      });
    },
    localizedPlateProvinces() {
      const provinces = this.t('input.plateProvinces');
      return Array.isArray(provinces) ? provinces : [];
    },
    resolvedPlateProvinceList() {
      return this.plateProvinceList.length > 0 ? this.plateProvinceList : this.localizedPlateProvinces;
    },
    resolvedDefaultPlateProvince() {
      return this.defaultPlateProvince || this.resolvedPlateProvinceList[0] || '';
    },
    // 货币符号
    currencySymbol() {
      if (this.currencySymbolCustom) {
        return this.currencySymbolCustom;
      }
      return currencySymbols[this.currency] || '¥';
    },
    // 银行卡最大长度（含分隔符）
    bankCardMaxLength() {
      const digits = this.bankCardMaxDigits;
      const separatorCount = Math.floor((digits - 1) / this.bankCardSegment);
      return digits + separatorCount;
    },
    // 身份证后缀图标
    idCardSuffixIcon() {
      if (this.suffixIcon) return this.suffixIcon;
      if (this.idCardValid === true) return 'el-icon-success';
      if (this.idCardValid === false) return 'el-icon-warning';
      return '';
    },
    // 身份证信息文本
    idCardInfoText() {
      if (!this.idCardInfo) return '';
      return `${this.idCardInfo.region} | ${this.idCardInfo.birthday} | ${this.idCardInfo.gender}`;
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.initSpecialValue(val);
      }
    },
    phoneCode(val) {
      this.updatePhoneValue();
    },
    phoneNumber(val) {
      // 只允许数字
      this.phoneNumber = val.replace(/\D/g, '');
      this.updatePhoneValue();
    },
    defaultPhoneCode: {
      immediate: true,
      handler(val) {
        if (!this.modelValue) {
          this.phoneCode = val;
        }
      }
    }
  },
  methods: {
    // ========== 统一事件处理 ==========
    onFocus(event) {
      if (this.isCurrency) {
        this.handleCurrencyFocus(event);
      } else {
        this.handleFocus(event);
      }
    },
    onBlur(event) {
      if (this.isCurrency) {
        this.handleCurrencyBlur(event);
      } else if (this.isIdCard) {
        this.handleIdCardBlur(event);
      } else if (this.isEmail) {
        this.handleEmailBlur(event);
      } else if (this.isUscc) {
        this.handleUsccBlur(event);
      } else {
        this.handleBlur(event);
      }
    },
    onInput(val) {
      if (this.isCurrency) {
        this.handleCurrencyInput(val);
      } else if (this.isBankCard) {
        this.handleBankCardInput(val);
      } else if (this.isIdCard) {
        this.handleIdCardInput(val);
      } else if (this.isEmail) {
        this.handleEmailInput(val);
      } else if (this.isUscc) {
        this.handleUsccInput(val);
      }
    },
    // 初始化特殊类型的值
    initSpecialValue(val) {
      if (this.isPhone) {
        this.initPhoneValue(val);
      } else if (this.isCurrency) {
        this.initCurrencyValue(val);
      } else if (this.isBankCard) {
        this.initBankCardValue(val);
      } else if (this.isIdCard) {
        this.initIdCardValue(val);
      } else if (this.isEmail) {
        this.initEmailValue(val);
      } else if (this.isCode) {
        this.initCodeValue(val);
      } else if (this.isPlate) {
        this.initPlateValue(val);
      } else if (this.isIp) {
        this.initIpValue(val);
      } else if (this.isMac) {
        this.initMacValue(val);
      } else if (this.isUscc) {
        this.initUsccValue(val);
      }
    },
    
    // ========== 手机号相关方法 ==========
    initPhoneValue(val) {
      if (!val) {
        this.phoneCode = this.defaultPhoneCode;
        this.phoneNumber = '';
        return;
      }
      // 支持格式：+86-13800138000 或 +8613800138000 或纯手机号
      const str = String(val);
      const match = str.match(/^(\+\d+)[-\s]?(\d+)$/);
      if (match) {
        this.phoneCode = match[1];
        this.phoneNumber = match[2];
      } else {
        this.phoneNumber = str.replace(/\D/g, '');
      }
    },
    updatePhoneValue() {
      const value = this.phoneNumber ? `${this.phoneCode}-${this.phoneNumber}` : '';
      this.text = value;

    },
    handlePhoneBlur(event) {
      this.handleBlur(event);
    },
    
    // ========== 货币相关方法 ==========
    initCurrencyValue(val) {
      if (val === undefined || val === null || val === '') {
        this.currencyDisplay = '';
        return;
      }
      const num = parseFloat(val);
      if (!isNaN(num)) {
        this.currencyDisplay = this.formatCurrency(num);
      }
    },
    formatCurrency(value) {
      if (value === undefined || value === null || value === '') return '';
      const num = parseFloat(value);
      if (isNaN(num)) return '';
      // 格式化为千分位
      const fixed = num.toFixed(this.currencyPrecision);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    parseCurrency(value) {
      if (!value) return '';
      // 移除千分位分隔符
      return value.replace(/,/g, '');
    },
    handleCurrencyFocus(event) {
      this.currencyEditing = true;
      // 编辑时显示原始数字
      if (this.text) {
        this.currencyDisplay = this.text;
      }
      this.handleFocus(event);
    },
    handleCurrencyBlur(event) {
      this.currencyEditing = false;
      const rawValue = this.parseCurrency(this.currencyDisplay);
      let num = parseFloat(rawValue);
      
      // 范围限制
      if (!isNaN(num)) {
        if (this.currencyMin !== undefined && num < this.currencyMin) {
          num = this.currencyMin;
        }
        if (this.currencyMax !== undefined && num > this.currencyMax) {
          num = this.currencyMax;
        }
        this.text = num.toFixed(this.currencyPrecision);
        this.currencyDisplay = this.formatCurrency(num);
      } else {
        this.text = '';
        this.currencyDisplay = '';
      }
      

      this.handleBlur(event);
    },
    handleCurrencyInput(val) {
      // 只允许数字、小数点和逗号
      this.currencyDisplay = val.replace(/[^\d.,]/g, '');
    },
    
    // ========== 银行卡相关方法 ==========
    initBankCardValue(val) {
      if (!val) {
        this.bankCardDisplay = '';
        this.bankCardType = '';
        return;
      }
      const digits = String(val).replace(/\D/g, '');
      this.bankCardDisplay = this.formatBankCard(digits);
      this.detectBankCardType(digits);
    },
    formatBankCard(value) {
      if (!value) return '';
      const digits = value.replace(/\D/g, '');
      const chunks = [];
      for (let i = 0; i < digits.length; i += this.bankCardSegment) {
        chunks.push(digits.slice(i, i + this.bankCardSegment));
      }
      return chunks.join(this.bankCardSeparator);
    },
    handleBankCardInput(val) {
      // 只允许数字和分隔符
      const digits = val.replace(/\D/g, '').slice(0, this.bankCardMaxDigits);
      this.bankCardDisplay = this.formatBankCard(digits);
      this.text = digits;
      this.detectBankCardType(digits);
      this.$emit('bank-card-change', { value: digits, display: this.bankCardDisplay, type: this.bankCardType });
    },
    detectBankCardType(cardNumber) {
      if (!cardNumber || cardNumber.length < 6) {
        this.bankCardType = '';
        return;
      }
      // 根据 BIN 码判断银行卡类型（简化版）
      const bin = cardNumber.slice(0, 6);
      const bin4 = cardNumber.slice(0, 4);
      
      // 常见银行卡 BIN 码判断
      if (/^62/.test(bin)) {
        this.bankCardType = this.t('input.bankCardTypes.unionpay');
      } else if (/^4/.test(bin)) {
        this.bankCardType = 'VISA';
      } else if (/^5[1-5]/.test(bin) || /^2[2-7]/.test(bin)) {
        this.bankCardType = 'MasterCard';
      } else if (/^3[47]/.test(bin)) {
        this.bankCardType = 'American Express';
      } else if (/^35/.test(bin)) {
        this.bankCardType = 'JCB';
      } else if (/^6011|65/.test(bin)) {
        this.bankCardType = 'Discover';
      } else {
        this.bankCardType = '';
      }
    },
    
    // ========== 身份证相关方法 ==========
    initIdCardValue(val) {
      if (!val) {
        this.idCardDisplay = '';
        this.idCardValid = null;
        this.idCardInfo = null;
        return;
      }
      this.idCardDisplay = String(val).toUpperCase();
      if (this.idCardRealtimeValidate) {
        this.validateIdCard(this.idCardDisplay);
      }
    },
    handleIdCardInput(val) {
      // 只允许数字和 X
      this.idCardDisplay = val.replace(/[^\dXx]/g, '').toUpperCase().slice(0, 18);
      this.text = this.idCardDisplay;
      
      if (this.idCardRealtimeValidate && this.idCardDisplay.length === 18) {
        this.validateIdCard(this.idCardDisplay);
      } else {
        this.idCardValid = null;
        this.idCardInfo = null;
      }
      
      this.$emit('id-card-change', { 
        value: this.idCardDisplay, 
        valid: this.idCardValid, 
        info: this.idCardInfo 
      });
    },
    handleIdCardBlur(event) {
      if (this.idCardDisplay && this.idCardDisplay.length === 18) {
        this.validateIdCard(this.idCardDisplay);
      }
      this.$emit('id-card-valid', { valid: this.idCardValid, info: this.idCardInfo });
      this.handleBlur(event);
    },
    validateIdCard(idCard) {
      if (!idCard || idCard.length !== 18) {
        this.idCardValid = false;
        this.idCardInfo = null;
        return false;
      }
      
      // 加权因子
      const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验码对照表
      const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      
      // 计算校验和
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        const digit = parseInt(idCard.charAt(i), 10);
        if (isNaN(digit)) {
          this.idCardValid = false;
          this.idCardInfo = null;
          return false;
        }
        sum += digit * weights[i];
      }
      
      // 验证校验码
      const checkCode = checkCodes[sum % 11];
      const valid = idCard.charAt(17).toUpperCase() === checkCode;
      
      this.idCardValid = valid;
      
      if (valid) {
        // 解析身份证信息
        const regionCode = idCard.slice(0, 6);
        const birthYear = idCard.slice(6, 10);
        const birthMonth = idCard.slice(10, 12);
        const birthDay = idCard.slice(12, 14);
        const genderCode = parseInt(idCard.charAt(16), 10);
        
        this.idCardInfo = {
          region: this.getRegionName(regionCode),
          birthday: `${birthYear}-${birthMonth}-${birthDay}`,
          gender: genderCode % 2 === 0 ? this.t('input.genders.female') : this.t('input.genders.male'),
          age: this.calculateAge(birthYear, birthMonth, birthDay)
        };
      } else {
        this.idCardInfo = null;
      }
      
      return valid;
    },
    getRegionName(code) {
      const regions = this.t('input.regions');
      const provinceCode = code.slice(0, 2);
      return (regions && regions[provinceCode]) || this.t('input.unknownRegion');
    },
    calculateAge(year, month, day) {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    
    // ========== 邮箱相关方法 ==========
    initEmailValue(val) {
      this.emailDisplay = val || '';
      if (val) {
        this.emailValid = this.validateEmail(val);
      }
    },
    handleEmailInput(val) {
      this.emailDisplay = val;
      this.text = val;
      this.emailValid = val ? this.validateEmail(val) : null;

    },
    handleEmailBlur(event) {
      this.emailValid = this.emailDisplay ? this.validateEmail(this.emailDisplay) : null;
      this.handleBlur(event);
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },
    
    // ========== 验证码相关方法 ==========
    initCodeValue(val) {
      const str = String(val || '');
      this.codeValues = Array(this.codeLength).fill('').map((_, i) => str[i] || '');
    },
    handleCodeInput(event, index) {
      const val = event.target.value.replace(/\D/g, '');
      this.codeValues[index] = val.slice(-1);
      this.updateCodeValue();
      // 自动跳转下一格
      if (val && index < this.codeLength - 1) {
        this.$nextTick(() => {
          if (this.codeRefs[index + 1]) {
            this.codeRefs[index + 1].focus();
          }
        });
      }
    },
    handleCodeKeydown(event, index) {
      // 退格键处理
      if (event.key === 'Backspace' && !this.codeValues[index] && index > 0) {
        this.$nextTick(() => {
          if (this.codeRefs[index - 1]) {
            this.codeRefs[index - 1].focus();
          }
        });
      }
    },
    handleCodePaste(event) {
      event.preventDefault();
      const paste = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      const chars = paste.slice(0, this.codeLength).split('');
      chars.forEach((char, i) => {
        this.codeValues[i] = char;
      });
      this.updateCodeValue();
      // 聚焦到最后一个填入的位置
      const focusIndex = Math.min(chars.length, this.codeLength - 1);
      this.$nextTick(() => {
        if (this.codeRefs[focusIndex]) {
          this.codeRefs[focusIndex].focus();
        }
      });
    },
    updateCodeValue() {
      const value = this.codeValues.join(this.codeSeparator);
      this.text = this.codeValues.join('');

      if (this.codeValues.every(v => v)) {
        this.$emit('code-complete', { value: this.text });
      }
    },
    
    // ========== 车牌号相关方法 ==========
    initPlateValue(val) {
      if (!val) {
        this.plateProvince = this.resolvedDefaultPlateProvince;
        this.plateNumber = '';
        return;
      }
      const str = String(val);
      if (str.length > 0) {
        this.plateProvince = str[0];
        this.plateNumber = str.slice(1).toUpperCase();
      }
    },
    handlePlateInput(val) {
      this.plateNumber = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
      this.updatePlateValue();
    },
    handlePlateBlur(event) {
      this.updatePlateValue();
      this.handleBlur(event);
    },
    updatePlateValue() {
      const value = this.plateProvince + this.plateNumber;
      this.text = value;

    },
    
    // ========== IP地址相关方法 ==========
    initIpValue(val) {
      if (!val) {
        this.ipSegments = ['', '', '', ''];
        return;
      }
      const parts = String(val).split('.');
      this.ipSegments = parts.slice(0, 4).map(p => p || '');
      while (this.ipSegments.length < 4) {
        this.ipSegments.push('');
      }
    },
    handleIpInput(event, index) {
      let val = event.target.value.replace(/\D/g, '');
      // 限制范围 0-255
      if (val !== '' && parseInt(val, 10) > 255) {
        val = '255';
      }
      this.ipSegments[index] = val;
      this.updateIpValue();
      // 自动跳转
      if (val.length === 3 || (val.length > 0 && parseInt(val, 10) >= 26)) {
        if (index < 3 && this.ipRefs[index + 1]) {
          this.$nextTick(() => this.ipRefs[index + 1].focus());
        }
      }
    },
    handleIpKeydown(event, index) {
      if (event.key === '.' && index < 3) {
        event.preventDefault();
        if (this.ipRefs[index + 1]) {
          this.ipRefs[index + 1].focus();
        }
      }
      if (event.key === 'Backspace' && !this.ipSegments[index] && index > 0) {
        if (this.ipRefs[index - 1]) {
          this.ipRefs[index - 1].focus();
        }
      }
    },
    updateIpValue() {
      const value = this.ipSegments.join('.');
      this.text = value;

    },
    
    // ========== MAC地址相关方法 ==========
    initMacValue(val) {
      if (!val) {
        this.macSegments = ['', '', '', '', '', ''];
        return;
      }
      const str = String(val).replace(/[^A-Fa-f0-9]/g, '');
      this.macSegments = [];
      for (let i = 0; i < 6; i++) {
        this.macSegments.push(str.slice(i * 2, i * 2 + 2).toUpperCase());
      }
    },
    handleMacInput(event, index) {
      let val = event.target.value.replace(/[^A-Fa-f0-9]/g, '').toUpperCase();
      this.macSegments[index] = val.slice(0, 2);
      this.updateMacValue();
      // 自动跳转
      if (val.length >= 2 && index < 5) {
        this.$nextTick(() => {
          if (this.macRefs[index + 1]) {
            this.macRefs[index + 1].focus();
          }
        });
      }
    },
    handleMacKeydown(event, index) {
      if ((event.key === ':' || event.key === '-') && index < 5) {
        event.preventDefault();
        if (this.macRefs[index + 1]) {
          this.macRefs[index + 1].focus();
        }
      }
      if (event.key === 'Backspace' && !this.macSegments[index] && index > 0) {
        if (this.macRefs[index - 1]) {
          this.macRefs[index - 1].focus();
        }
      }
    },
    updateMacValue() {
      const value = this.macSegments.join(this.macSeparator);
      this.text = this.macSegments.join('');

    },
    
    // ========== 社会信用代码相关方法 ==========
    initUsccValue(val) {
      this.usccDisplay = val || '';
      if (val && String(val).length === 18) {
        this.usccValid = this.validateUscc(val);
      }
    },
    handleUsccInput(val) {
      this.usccDisplay = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
      this.text = this.usccDisplay;
      if (this.usccRealtimeValidate && this.usccDisplay.length === 18) {
        this.usccValid = this.validateUscc(this.usccDisplay);
      } else {
        this.usccValid = null;
      }

    },
    handleUsccBlur(event) {
      if (this.usccDisplay && this.usccDisplay.length === 18) {
        this.usccValid = this.validateUscc(this.usccDisplay);
        this.$emit('uscc-valid', { valid: this.usccValid });
      }
      this.handleBlur(event);
    },
    validateUscc(code) {
      if (!code || code.length !== 18) return false;
      // 统一社会信用代码校验规则
      const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
      const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        const charIndex = chars.indexOf(code[i]);
        if (charIndex === -1) return false;
        sum += charIndex * weights[i];
      }
      const checkIndex = (31 - (sum % 31)) % 31;
      return chars[checkIndex] === code[17];
    }
  }
});
</script>
