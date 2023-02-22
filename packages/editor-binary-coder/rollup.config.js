import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'Template',
        file: 'dist/index.umd.js',
        format: 'umd',
      },
    ],
    plugins: [typescript(), resolve(), commonjs()],
  },
]
