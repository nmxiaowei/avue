**背景**
快速使用json构建card卡片展示

**组件路径**
路径：.\src\components\datashow\cardData.vue

**卡片总属性**
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
<tr>
    <td height="50">span</td>
    <td>卡片的格栅</td>
    <td>String / Number</td>
    <td>一</td>
    <td>6</td>
  </tr>
  </table>  
  
  **卡片列属性**
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
<tr>
    <td height="50">title</td>
    <td>卡片标题</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">subtitle</td>
    <td>卡片标题</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
</tr>
<tr>
    <td height="50">allcount</td>
    <td>卡片显示总数</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
</tr>
 <tr>
    <td height="50">count</td>
    <td>卡片显示数量</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
</tr>
<tr>
    <td height="50">text</td>
    <td>卡片说明文本</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
</tr>
 <tr>
    <td height="50">color</td>
    <td>卡片颜色</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
</tr>
<tr>
    <td height="50">key</td>
    <td>卡片特效</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
</tr>
  <tr>
    <td height="50">icon</td>
    <td>卡片icon图标</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
</tr>
    <tr>
    <td height="50">icon</td>
    <td>卡片icon图标</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
</tr>
  </table>  

  **背景**
快速使用json构建form表单

**组件路径**
路径：.\src\components\crud\froms.vue

**表单属性**
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
<tr>
    <td height="50">labelWidth</td>
    <td>表单标题的宽度</td>
    <td>String / Number</td>
    <td>一</td>
    <td>80</td>
  </tr>
   <tr>
    <td height="50">dic</td>
    <td>要加载字典的字段名(调用vuex中字典接口)</td>
    <td>Array</td>
    <td>一</td>
    <td>一</td>
  </tr>
  </table>  
  
**列属性**
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
  <tr>
    <td height="50">label</td>
    <td>表单名称</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">prop</td>
    <td>表单json</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">type</td>
    <td>表单类型</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">visdiplay</td>
    <td>表单隐藏</td>
    <td>Boolean</td>
    <td>true / false</td>
    <td>false</td>
  </tr>
<tr>
    <td height="50">hide</td>
    <td>表格列隐藏</td>
    <td>Boolean</td>
    <td>true / false</td>
    <td>false</td>
  </tr>
 <tr>
    <td height="50">disabled</td>
    <td>表单禁止</td>
    <td>Boolean</td>
    <td>true / false</td>
    <td>false</td>
  </tr>
<tr>
    <td height="50">formsolt</td>
    <td>表单dom自定义（通过slot）</td>
    <td>Boolean</td>
    <td>true / false</td>
    <td>false</td>
  </tr>
 <tr>
    <td height="50">span</td>
    <td>表单栅列</td>
    <td>String / Number</td>
    <td>一</td>
    <td>12</td>
  </tr>
<tr>
    <td height="50">dicData</td>
    <td>当前列加载的字典，只有type为select / radio / checkbox 才起作用</td>
    <td>String</td>
    <td>一</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">rules</td>
    <td>表单的校验例([{ required: true, message: "请输入用户名", trigger: "blur" }])</td>
    <td>JSON</td>
    <td>一</td>
    <td>一</td>
  </tr>
</table>


**表格事件**
<table width="100%">
  <tr height="50">
    <th width="30%">事件名称</th>
    <th width="50%">说明</th>
    <th width="20%">回调参数</th>
  </tr>
  <tr height="50">
    <td>handleSubmit</td>
    <td>返回当前表单的json对象</td>
    <td>form</td>
  </tr>
    <tr>
    <td height="50">formOption</td>
    <td>表单配置</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">formData</td>
    <td>表单数据</td>
    <td>一</td>
  </tr>
<tr>
    <td height="50">formSubmitText</td>
    <td>表单提交按钮文本</td>
    <td>一</td>
  </tr>
</table>

