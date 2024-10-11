// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false, /* @note: To prevent duplicated call of useEffect */
//   swcMinify: true,

//   async rewrites() {
//     return [
//       {
//         source: "/login",
//         destination: "https://frontend-seteamp.app.secoder.net/login",
//       },
//       {
//         source: "/layout",
//         destination: "https://frontend-seteamp.app.secoder.net/layout",
//       },
//       {
//         source: "/register",
//         destination: "https://frontend-seteamp.app.secoder.net/register",
//       },
//       {
//         source: "/person",
//         destination: "https://frontend-seteamp.app.secoder.net/person",
//         has: [
//           {
//             type: "query",
//             key: "name",
//             value: "(.*)",
//           },
//         ],
//       },
//     ];
//   }
// };
// module.exports = {
//   webpack: (config) => {
//     config.resolve.alias['next/router'] = 'next/router';

//     return config;
//   },
// };
// module.exports = nextConfig;


module.exports = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "https://frontend-seteamp.app.secoder.net/index",
        permanent: true,
      },
      {
        source: "/frontend-seteamp.app.secoder.net",
        destination: "https://frontend-seteamp.app.secoder.net/index",
        permanent: true,
      },
      {
        source: "/layout",
        destination: "https://frontend-seteamp.app.secoder.net/index",
        permanent: true,
      },
      {
        source: "/register",
        destination: "https://frontend-seteamp.app.secoder.net/index",
        permanent: true,
      },
      {
        source: "/person",
        destination: "https://frontend-seteamp.app.secoder.net/person",
        has: [
          {
            type: "query",
            key: "name",
            value: "(.*)",
          },
        ],
        permanent: true,
      },
    ];
  },
};
