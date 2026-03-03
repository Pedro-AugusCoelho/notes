/* eslint-disable-next-line @typescript-eslint/no-require-imports */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@src': './src',
          },
        },
      ],
    ],
  }
}
