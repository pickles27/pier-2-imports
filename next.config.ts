module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/orders",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakeimg.pl",
      },
    ],
  },
};
