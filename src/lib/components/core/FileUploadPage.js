/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
      localStorage.setItem('spec', JSON.stringify(text));
      props?.handleFileCallback(text);
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
