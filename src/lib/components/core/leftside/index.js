/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
const groupedMenu = (dataNow = []) => {
  const newMenuData = [];
  Object.keys(dataNow).forEach((x, value) => {
    const element = dataNow[x];
    const key = element.tag || element.tags[0] || 'other';
    const index = newMenuData.findIndex(
      (x) => x.summary === dataNow[x].summary && x.method === dataNow[x].method
    );
    if (!newMenuData[key]) {
      newMenuData[key] = [element];
    } else if (index === -1) {
      newMenuData[key].push(element);
    }
  });
  return newMenuData;
};

const createMenuItems = (data) => {
  const parsedSpec = data;
  if (parsedSpec.paths) {
    const newMenuData = [];
    for (const [path, pathObj] of Object.entries(parsedSpec.paths)) {
      const menuItem = {
        tag: '',
        path,
        method: '',
        tags: [],
        summary: '',
        description: '',
        item: {}
      };
      // eslint-disable-next-line no-unused-vars
      for (const [method, methodObj] of Object.entries(pathObj)) {
        menuItem.method = method.toUpperCase();
        menuItem.tags.push(method.toUpperCase());
        menuItem.tag = methodObj.tags && methodObj.tags[0] ? methodObj.tags[0] : 'Other';
        menuItem.summary = methodObj.summary ? methodObj.summary : path;
        menuItem.description = methodObj.description ? methodObj.description : 'N/A';
        menuItem.item = methodObj;
      }
      newMenuData.push(menuItem);
    }
    return groupedMenu(newMenuData.filter((x) => x));
  }
};
const createAsyncMenuItems = (data) => {
  const parsedSpec = data;
  if (parsedSpec.channels) {
    const newMenuData = [];
    for (const [path, pathObj] of Object.entries(parsedSpec.channels)) {
      console.log(parsedSpec.channels);
      const menuItem = {
        tag: '',
        path,
        method: '',
        tags: [],
        summary: '',
        description: '',
        item: {}
      };
      // eslint-disable-next-line no-unused-vars
      for (const [method, methodObj] of Object.entries(pathObj)) {
        menuItem.method = method.toUpperCase();
        menuItem.tags.push(method.toUpperCase());
        menuItem.tag = methodObj.tags && methodObj.tags[0] ? methodObj.tags[0] : 'Other';
        menuItem.summary = methodObj.summary ? methodObj.summary : path;
        menuItem.description = methodObj.description ? methodObj.description : 'N/A';
        menuItem.item = methodObj;
      }
      newMenuData.push(menuItem);
    }
    return groupedMenu(newMenuData.filter((x) => x));
  }
};
export { createMenuItems, createAsyncMenuItems };
