/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
function parametersTable(parameters = {}) {
  const params = JSON.parse(JSON.stringify(parameters));
  let res = '';
  let inRes = '';
  const results = params.map((param) => {
    if (!param.name) {
      inRes += '';
    }
    inRes += `<tr key=${param.name}>
            <td>
              <b>${param.name} </b><i className="small text-success"> ${
      param?.in ? param?.in?.toUpperCase() : ''
    }</i>
            </td>
            <td>${param.description ? param.description : ''}</td>
            <td>${param.required ? param.required : false}</td>
            <td>${param?.schema && param?.schema?.type ? param?.schema?.type : ''}</td>
            <td>${param?.schema && param?.schema?.format ? param?.schema?.format : ''}</td> </tr>`;
  });

  res += `<table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Required</th>
          <th>Type</th>
          <th>Format</th>
        </tr>
      </thead>
      <tbody>`;
  results;
  res += inRes;
  res += ` </tbody>
    </table> `;
  return res;
}

export { parametersTable };
