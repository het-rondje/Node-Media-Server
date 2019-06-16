const NodeMediaServer = require('./');
const axios = require('axios');

//TODO aquire Signature programmaticly
//TODO aquire userid programmaticly

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  https: {
    port: 8443,
    key: './privatekey.pem',
    cert: './certificate.pem',
  },
  auth: {
    api: true,
    api_user: 'admin',
    api_pass: 'admin',
    play: false,
    publish: false,
    secret: 'nodemedia2017privatekey'
  },
};


let nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  console.log("==============pre");


  instance.post(`users/cUy--uvu-`, { randomString: "dfc6r2vq29dtuboiadn" }, { headers: {
    signature: "8f33e1116a1e47aabba23287098a0020883ea874979c9c4ba71e99499470833e2dbba3a62318f93420ed642c13f79c3402841de669b5e8a38109064b9334c8cfef3bb9142546ba004a6a3c98035f5058448a7b22bf6547631b4865976e42c9b26db283678f4d69980d85e7006f9ef33d28148a9f61a9a43a7363633b378ef724f141266b6bdb0aa4792bcb1683a0c6aab834644b094adbd9c99ddd122f90a8458ab1ddfe0f4730348d092c61ff7e5cb97b523e33aa4ec03588c917d0a245aea49ffc7dc4459e294e9dc88731f00ffb4cd7c12d9400bd9fd503be4e3c2840de6ede0d8877572382807a263aee14183acecdcaa54ec8ded733f0951518bbb9043e",
    userid: "cUy--uvu-"
  }})
  .then((res) => {
    //TODO maybe logging?
  }).catch((e) => {
    let session = nms.getSession(id);
    session.reject();
  });
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  console.log("==============post");

  instance.post(`streams/cUy--uvu-`, { online: true }, { headers: {
    signature: "8f33e1116a1e47aabba23287098a0020883ea874979c9c4ba71e99499470833e2dbba3a62318f93420ed642c13f79c3402841de669b5e8a38109064b9334c8cfef3bb9142546ba004a6a3c98035f5058448a7b22bf6547631b4865976e42c9b26db283678f4d69980d85e7006f9ef33d28148a9f61a9a43a7363633b378ef724f141266b6bdb0aa4792bcb1683a0c6aab834644b094adbd9c99ddd122f90a8458ab1ddfe0f4730348d092c61ff7e5cb97b523e33aa4ec03588c917d0a245aea49ffc7dc4459e294e9dc88731f00ffb4cd7c12d9400bd9fd503be4e3c2840de6ede0d8877572382807a263aee14183acecdcaa54ec8ded733f0951518bbb9043e",
    userid: "cUy--uvu-"
  }})
  .then((res) => {
    //TODO logging or handling response
  }).catch((e) => {
    //TODO Error handling
  });
});

nms.on('donePublish', (id, StreamPath, args) => {
  instance.post(`streams/cUy--uvu-`, { online: false }, { headers: {
    signature: "8f33e1116a1e47aabba23287098a0020883ea874979c9c4ba71e99499470833e2dbba3a62318f93420ed642c13f79c3402841de669b5e8a38109064b9334c8cfef3bb9142546ba004a6a3c98035f5058448a7b22bf6547631b4865976e42c9b26db283678f4d69980d85e7006f9ef33d28148a9f61a9a43a7363633b378ef724f141266b6bdb0aa4792bcb1683a0c6aab834644b094adbd9c99ddd122f90a8458ab1ddfe0f4730348d092c61ff7e5cb97b523e33aa4ec03588c917d0a245aea49ffc7dc4459e294e9dc88731f00ffb4cd7c12d9400bd9fd503be4e3c2840de6ede0d8877572382807a263aee14183acecdcaa54ec8ded733f0951518bbb9043e",
    userid: "cUy--uvu-"
  }})
  .then((res) => {
    //TODO logging or handling response
  }).catch((e) => {
    //TODO Error handling
  });
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  console.log("==============preplay");
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  console.log("==============postplay");
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  console.log("==============doneplay");
});

