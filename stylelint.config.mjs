/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-astro',
    'stylelint-config-tailwindcss',
    'stylelint-config-alphabetical-order'
  ],
  rules: {
    'color-no-invalid-hex': true,
    'block-no-empty': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
    // Add more rules here
  },
  overrides: [
    {
      files: ['**/*.astro']
    }
  ]
}
