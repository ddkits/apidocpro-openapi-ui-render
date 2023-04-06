/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { jsonViewer } from '../../helpers';

/**
 * codeRequestSetup
 * @param {object} code
 * @param {object} theme
 * @returns
 */
function codeRequestSetup(code, theme) {
  let final = '';
  final += `<pre>${jsonViewer(code, true, theme)}</pre>`;
  return final;
}
export { codeRequestSetup };
