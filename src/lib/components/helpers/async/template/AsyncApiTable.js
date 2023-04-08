/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { loopInNestedAsyncObject } from '..';
import Header from '../../../templates/regions/middle/Header';
import propTypes from 'prop-types';
import Body from '../../../templates/regions/middle/Body';

export default function AsyncApiTable(props) {
  const { data, collapsible, theme } = props;
  const [spec, setSpec] = useState(null);
  const [channels, setchannels] = useState([]);
  const [components, setcomponents] = useState([]);
  const [servers, setservers] = useState([]);
  const [info, setinfo] = useState([]);
  const [final, setfinal] = useState('');

  const prepareBody = () => {
    let _final = '';
    _final += (
      <details className="p-2">
        <summary>Servers</summary>
        <div className="apidocpro-async-body">{loopInNestedAsyncObject(servers, false)}</div>
      </details>
    );

    _final += (
      <details className="p-2">
        <summary>Channels</summary>
        <div className="apidocpro-async-body"></div>
      </details>
    );
    _final += (
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
    );

    setfinal(loopInNestedAsyncObject(data, collapsible, theme));
  };
  useEffect(() => {
    setchannels(data['channels'] || data.channels || []);
    setcomponents(data['components'] || data.components || []);
    setservers(data['servers'] || data.servers || []);
    setinfo(data['info'] || data.info || []);
    setTimeout(() => {
      setSpec(data);
      prepareBody();
    }, 500);
  }, [data]);

  if (!spec) {
    return (
      <div className="container justify-content-center">
        <i className="fa-solid fa-sync fa-spin"></i>
      </div>
    );
  }

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
      <Body data={JSON.stringify(final)} servers={servers} spec={spec} collapsible={collapsible} />
    </div>
  );
}

AsyncApiTable.propTypes = {
  /** Spec contents as object, to validate AsyncAPI */
  data: propTypes.any,
  theme: propTypes.object,
  collapsible: propTypes.bool
};
