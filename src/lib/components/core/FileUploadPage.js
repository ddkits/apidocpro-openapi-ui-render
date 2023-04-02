/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { yamlToJson } from '../helpers';

export default function FileUploadPage(props) {
  const [file, setFile] = useState('');

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const ob = yamlToJson(text) ? yamlToJson(text) : text;
      localStorage.setItem('spec', JSON.stringify(ob));
      props?.handleFileCallback(ob);
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="new-spec"
        id="new-spec"
        type="file"
        onChange={handleChange}
        required
        accept=".yaml,.json, application/json, application/yaml"
      />
      <button type="submit">Upload New Spec</button>
    </form>
  );
}
