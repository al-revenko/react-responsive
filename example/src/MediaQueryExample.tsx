import MediaQuery from '@lokixio/react-responsive';

const MediaQueryExample = () => (
  <div style={{ fontSize: '30px' }}>
    <h1>Device Test! (MediaQuery)</h1>
    <MediaQuery minWidth={1224}>
      <p>You are a desktop or laptop</p>
      <MediaQuery minWidth={1824}>
        <p>You also have a huge screen</p>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery minResolution="2dppx">
      {(matches: boolean) => (matches ? <p>You are retina</p> : <p>You are not retina</p>)}
    </MediaQuery>
  </div>
);

export default MediaQueryExample;
