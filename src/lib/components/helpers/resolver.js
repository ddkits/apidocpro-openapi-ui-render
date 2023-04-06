/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
function resolveRef(ref, schema) {
  // Split the ref into its components
  const components = ref.split('/').filter((c) => c !== '');

  // Resolve each component of the ref
  let resolved = schema;
  for (const component of components) {
    resolved = resolved[component];
  }

  return resolved;
}

export { resolveRef };
