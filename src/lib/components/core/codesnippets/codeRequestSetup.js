import { jsonViewer } from '../../helpers';

function codeRequestSetup(code, theme) {
  let final = '';
  final += `<pre>${jsonViewer(code, true, theme)}</pre>`;
  return final;
}
export { codeRequestSetup };
