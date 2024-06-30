import antfu from '@antfu/eslint-config'

export default antfu({
  solid: true,
  formatters: {
    css: true,
    html: true,
  },
}, {
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})
