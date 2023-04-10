/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { yamlToJson } from '../helpers';

export default function FileUploadPage(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const ob = yamlToJson(text) ? yamlToJson(text) : text;
      localStorage.setItem('spec', JSON.stringify(ob));
      props?.handleFileCallback(ob);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <input
      className="form-control"
      name="new-spec"
      id="new-spec"
      type="file"
      onChange={(e) => handleSubmit(e)}
      required
      accept=".yaml,.json, application/json, application/yaml"
    />
  );
}
