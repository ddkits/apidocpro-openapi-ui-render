/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */

/**
 * Change below this line
 */
// Theme Styles Options
var styles = {
  header: 'header',
  // background design
  headertext: 'header-text',
  // text color and design
  body: 'body',
  // background design
  bodytext: 'body-text',
  // text color and design
  middle: 'middle',
  // background design
  middletext: 'middle-text',
  // text color and design
  left: 'left',
  // background design
  right: 'right',
  // background design
  lefttext: 'left-text',
  // text color and design
  righttext: 'right-text',
  // text color and design
  apinav: 'apidocpro-nav',
  // background design
  apinavtext: 'apidocpro-nav-text',
  // text color and design
  apinavsmc: 'apidocpro-nav-smc',
  // background design
  apinavsmctext: 'apidocpro-nav-smc-text',
  // text color and design
  icon: true // nav bar circle icon
};

/**
 * Changes below this line is not recomended, as it controls the basic functionality of the tabs, details, and summaries. but it's customizable if needed
 */
var TEMPLATES = {
  item: "<div class=\"bold apidocpro__method--%KEY%\"><b>%KEY%</b> <span class=\"apidocpro__value apidocpro__value--%TYPE%\">%VALUE%</span></div> ",
  itemCollapsible: '<details id="%KEY%" class="p-2"><summary class="apidocpro__key apidocpro__method--%KEY%"><b>%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>',
  itemCollapsibleOpen: '<details id="%KEY%" class="p-2" open><summary class="apidocpro__key apidocpro__method--%KEY%"><b>%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>',
  infoCollapsible: '<details  id="%KEY%" class="p-2" ><summary>%KEY%</summary>%CHILDREN%</details>',
  infoCollapsibleOpen: '<details id="%KEY%" class=" p-2" open><summary class="apidocpro__key apidocpro__method--%KEY%"><b>%KEY%</b><span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>'
};
var TEMPLATESASYNC = {
  item: "<div class=\"bold apidocpro__method--%KEY%\"><b>%KEY%</b> <span class=\"apidocpro__value apidocpro__value--%TYPE%\">%VALUE%</span></div> ",
  itemCollapsible: '<details id="%KEY%" class="p-2 border"><summary class="apidocpro__key apidocpro__method--%KEY%"><b>%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>',
  itemCollapsibleOpen: '<details id="%KEY%" class="p-2 border" open><summary class="apidocpro__key apidocpro__method--%KEY%"><b>%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>'
};
var PATHS = {
  item: "<div class=\"bold apidocpro__method--%KEY%\">%KEY%<span class=\"apidocpro__value apidocpro__value--%TYPE%\">%VALUE%</span></div> ",
  itemCollapsible: '<details id="%KEY%" class="p-2 "><summary class="apidocpro__key"><b class="apidocpro__method--%KEY%">%KEY%</b><span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>',
  itemCollapsibleOpen: '<details id="%KEY%" class="p-2 " open><summary class="apidocpro__key"><b class="apidocpro__method--%KEY%">%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>',
  infoCollapsible: '<details  id="%KEY%" class="p-2" ><summary>%KEY%</summary>%CHILDREN%</details>',
  infoCollapsibleOpen: '<details id="%KEY%" class=" p-2 " open><summary class="apidocpro__key"><b class="apidocpro__method--%KEY%">%KEY%</b> <span class="apidocpro__value apidocpro__value--type-%TYPE%">%VALUE%</span></summary>%CHILDREN%</details>'
};
var TABS = {
  tabsStart: "<ul class=\"nav nav-tabs\" id=\"%TABSID%\" role=\"tablist\">",
  tabsLinksEnd: "</ul>\n  <div class=\"tab-content\" id=\"%TABSID%-Content\">",
  tabLink: " <li class=\"nav-item\" role=\"presentation\">\n  <button class=\"nav-link %ACTIVE%\" id=\"%TABID%\" data-bs-toggle=\"tab\" data-bs-target=\"#%TABID%-tab-pane\" type=\"button\" role=\"tab\" aria-controls=\"%TABID%-tab-pane\" aria-selected=\"true\">%TABLABEL%</button>\n</li>",
  tabContent: "<div class=\"tab-pane fade %ACTIVE%\" id=\"%TABID%-tab-pane\" role=\"tabpanel\" aria-labelledby=\"%TABID%-tab\" tabindex=\"0\">%TABCONTENT%</div>",
  tabsEnd: '</div>'
};
var REQUESTBODY = {
  item: "<tr><td class=\"justify-content-middle align-middle\"><b>%KEY%</b> %VALUE% <p>%DESC%</p></td><tr>",
  itemCollapsible: "<tr><td class=\"justify-content-middle align-middle\"><b>%KEY%</b> %VALUE%<p>%DESC%</p></td>\n  <td class=\"justify-content-middle align-middle\">\n  <table class=\"justify-content-middle align-middle table table-striped\"><tbody>%CHILDREN%</tbody></table></td></tr>",
  itemCollapsibleOpen: "<tr><td class=\"justify-content-middle align-middle\" open><b>%KEY%</b> %VALUE%<p>%DESC%</p></td>\n  <td class=\"justify-content-middle align-middle\">\n  <table class=\"justify-content-middle align-middle table table-striped\"><tbody>%CHILDREN%</tbody></table></td></tr>"
};
var JSONTEMPLATES = {
  item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
  itemCollapsible: '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
  itemCollapsibleOpen: '<label class="json__item json__item--collapsible" open><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>'
};
export { TEMPLATES, PATHS, TABS, REQUESTBODY, JSONTEMPLATES, TEMPLATESASYNC, styles };