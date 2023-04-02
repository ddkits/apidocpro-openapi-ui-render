/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { loopInNestedAsyncObject } from '..';
import Header from '../../../templates/regions/middle/Header';

export default function AsyncApiTable(props) {
  const { data } = props;
  const [spec, setSpec] = useState(null);
  const [channels, setchannels] = useState([]);
  const [components, setcomponents] = useState([]);
  const [servers, setservers] = useState([]);
  const [info, setinfo] = useState([]);

  useEffect(() => {
    setchannels(data['channels'] || data.channels || []);
    setcomponents(data['components'] || data.components || []);
    setservers(data['servers'] || data.servers || []);
    setinfo(data['info'] || data.info || []);
    setTimeout(() => {
      setSpec(data);
    }, 500);
  }, [data]);

  if (!spec) {
    return (
      <div className="container justify-content-center">
        <i className="fa-solid fa-sync fa-spin"></i>
      </div>
    );
  }
  console.log(info.title);
  return (
    <div className="apidocpro-async">
      {info && (
        <Header
          spectitle={info.title}
          specversion={info.version}
          specdescription={info.description}
          specType={'ASYNCAPI'}
          speccontact={''}
          spec={info}
        />
      )}
      {servers && (
        <details className="p-2">
          <summary>Servers</summary>
          <div className="apidocpro-async-body">{loopInNestedAsyncObject(servers, false)}</div>
        </details>
      )}
      {channels && (
        <details className="p-2">
          <summary>Channels</summary>
          <div className="apidocpro-async-body">{loopInNestedAsyncObject(channels, false)}</div>
        </details>
      )}
      {components && (
        <details className="p-2">
          <summary>Components</summary>
          <div className="apidocpro-async-body">
            <ul>
              {components.schemas &&
                Object.entries(components.schemas).map(([name, schema]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <pre>{JSON.stringify(schema, null, 2)}</pre>
                  </li>
                ))}
            </ul>
          </div>
        </details>
      )}
    </div>
  );
}
