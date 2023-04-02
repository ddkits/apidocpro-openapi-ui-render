/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { yamlExample, yamlToJson } from '../helpers';
import LeftRegion from './regions/LeftRegion';
import MiddleRegion from './regions/MiddleRegion';
import RightRegion from './regions/RightRegion';
import { resolveRefs } from '../core/resolver';
import FileUploadPage from '../core/FileUploadPage';
import ErrorBoundary from '../core/ErrorBoundary';

function ApiDocPro(props) {
  // eslint-disable-next-line react/prop-types
  //   collapse, search, codesnippet
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [obj, setObj] = useState();
  const [resolved, setResolved] = useState();
  const {
    title = '',
    spec,
    leftRegion = true,
    rightRegion = true,
    collapse = false,
    theme,
    header = true
  } = props;
  const [openCollapse, setopenCollapse] = useState(false);
  const [head, setHead] = useState(true);
  const [spectype, setspectype] = useState('');
  const [loading, setLoading] = useState(true);
  const [specification, setSpecification] = useState(yamlExample);

  const rebuild = async (e = false) => {
    setopenCollapse(collapse || false);
    setLeft(leftRegion || true);
    setRight(rightRegion || true);
    setHead(header || true);
    setResolved(null);
    setObj(null);
    setspectype('');
    let finE;
    if (e) {
      try {
        finE = JSON.parse(e);
      } catch (error) {
        finE = e;
      }
    }
    const newSpec = finE
      ? finE
      : localStorage.getItem('spec') && localStorage.getItem('spec') !== ''
      ? JSON.parse(localStorage.getItem('spec'))
      : yamlExample;
    if (newSpec && (newSpec.asyncapi || newSpec['asyncapi'])) {
      setspectype('asyncapi');
    } else if (newSpec && (newSpec.openapi || newSpec['openapi'])) {
      setspectype('openapi');
    } else if (newSpec && (newSpec.swagger || newSpec['swagger'])) {
      setspectype('swagger');
    } else {
      setspectype('openapi');
    }
    console.log(spectype);

    if (newSpec && newSpec.length > 0) {
      setSpecification(newSpec);
    } else {
      setSpecification(yamlExample);
    }
    const ob = yamlToJson(newSpec) ? yamlToJson(newSpec) : newSpec;
    setObj(ob);
    const reso = resolveRefs(newSpec);
    // Check Openapi or Async
    setResolved(reso);

    setTimeout(() => {
      try {
        const test = JSON.parse(resolved);
        setResolved(test);
      } catch (error) {
        setResolved(reso);
      }
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    rebuild();
  }, [spec]);
  useEffect(() => {
    setLoading(true);
    rebuild();
  }, []);
  const handleFileCallback = (e) => {
    setLoading(true);
    rebuild(e);
  };
  const goToDefault = () => {
    localStorage.removeItem('spec');
    setLoading(true);
    rebuild();
  };
  return (
    <div className="container-fluid p-0 m-0">
      {head && spectype !== '' && (
        <header className="row p-3 bg-light sticky-top shadow pt-5 pb-3 m-0 mb-3 maxw-100 ">
          <div className="col text-start">{title || 'APIDocPro UI'}</div>
          <div className="col pull-right ">
            <FileUploadPage handleFileCallback={(e) => handleFileCallback(e)} />
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setLeft(!left)}>
              <i className="fa fa-caret-left"></i>
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setopenCollapse(!openCollapse)}>
              <i className="fa fa-bars"></i>
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setRight(!right)}>
              <i className="fa fa-caret-right"></i>
            </button>
            <button className="icon badge rounded-pill bg-dark text-light" onClick={goToDefault}>
              Default
            </button>
          </div>
        </header>
      )}
      {loading && spectype !== '' ? (
        <div className="container justify-content-middle">
          <i className="fa-solid fa-sync fa-spin"></i>
        </div>
      ) : (
        <main className="d-flex m-0">
          <ErrorBoundary>
            {left && (
              <div
                id="apidocpro-leftsidemenu"
                className="sidenav d-none d-md-block col-2 sticky-top m-0"
                data-mdb-hidden="false">
                <LeftRegion
                  data={resolved}
                  resolved={resolved}
                  menuClicked={() => console.log('menu clicked')}
                  theme={theme}
                  spectype={spectype}
                />
              </div>
            )}
            <div
              id="apidocpro-middleregion"
              className={
                right && left
                  ? 'col-7'
                  : right && !left
                  ? 'col-9'
                  : left && !right
                  ? 'col-10'
                  : 'col-12'
              }>
              <MiddleRegion
                data={resolved}
                resolved={resolved}
                openCollapse={openCollapse}
                theme={theme}
                spectype={spectype}
              />
            </div>
            {right && (
              <div
                id="apidocpro-rightregion"
                className="d-none d-md-block  bg-dark text-light col-3 pt-3 minh-100 m-0">
                <RightRegion
                  data={resolved}
                  resolved={resolved}
                  theme={theme}
                  openCollapse={openCollapse}
                  spectype={spectype}
                />
              </div>
            )}
          </ErrorBoundary>
        </main>
      )}
      <footer className="sticky-bottom bg-white p-2 m-0">
        <div id="copyright" className="badge rounded-pill bg-light text-dark ">
          Copyright @ <a href="//apidocpro.com/editor">APIDocPro UI</a>,
          <a href="//reallexi.com">RealLexi LLC</a>
        </div>
      </footer>
    </div>
  );
}

ApiDocPro.propTypes = {
  spec: propTypes.string,
  resolved: propTypes.any,
  title: propTypes.string,
  leftRegion: propTypes.bool,
  rightRegion: propTypes.bool,
  collapse: propTypes.bool,
  header: propTypes.bool,
  theme: propTypes.object
};

export default ApiDocPro;
