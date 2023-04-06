/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
function resolveRefs(document) {
  const regex = /^#\/([a-zA-Z0-9-_/]+)$/;

  const resolveRef = (obj, ref) => {
    const match = ref.match(regex);
    if (match) {
      const parts = match[1].split('/');
      let value = obj;
      for (const part of parts) {
        value = value[part];
      }
      return value;
    }
    return undefined;
  };

  const resolve = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      if ('$ref' in obj) {
        const refValue = resolveRef(document, obj['$ref']);
        if (refValue !== undefined) {
          return resolve(refValue);
        }
      } else {
        for (const key in obj) {
          obj[key] = resolve(obj[key]);
        }
      }
    }
    return obj;
  };

  return resolve(document);
}

const removeProptype = (json) => {
  const jsonStr = JSON.stringify(json);
  let jsonObj = JSON.parse(jsonStr);
  let newObj = {};

  for (let prop in jsonObj) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonObj.hasOwnProperty(prop) && prop !== '__proto__') {
      newObj[prop] = jsonObj[prop];
    }
  }

  let newJsonStr = JSON.parse(JSON.stringify(newObj));
  return newJsonStr;
};
export { resolveRefs, removeProptype };
