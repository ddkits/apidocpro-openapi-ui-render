/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/**
 * Sends a POST request to create a new user with the given data
 *
 * @param {Object} userData - The data for the new user
 * @returns {Promise} A Promise that resolves with the created user's data
 */
export default function TryItOut(method, url, body) {
  const options = {
    method: `${method.toUpperCase()}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // handle successful response
      return data;
    })
    .catch((error) => {
      // handle error
      console.error(error);
    });
}
