/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { yamlToJson } from '../helpers';

export default function FileUrl(props) {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const reader = e.target[0].value;
    const getFile = (url) => {
      setMessage('Fetching');
      fetch(url)
        .then((x) => x.text())
        .then((response) => {
          const ob = yamlToJson(response) ? yamlToJson(response) : response;
          localStorage.setItem('spec', JSON.stringify(ob));
          props?.handleFileCallback(ob);
          setMessage('');
        })
        .catch((err) => {
          setMessage(err.message);
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    };
    getFile(reader);
  };

  return (
    <>
      {message !== '' ? (
        <div className="form-control container justify-content-middle">
          <i className="fa-solid fa-sync fa-spin"></i> {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            className="col form-control"
            placeholder="File URL"
            name="url"
            id="url"
            type="url"
            required
            accept=".yaml,.json, application/json, application/yaml"
          />

          <button type="submit" className="col form-control">
            Generate
          </button>
        </form>
      )}
    </>
  );
}
