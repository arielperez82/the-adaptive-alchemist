import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-lead': theme('colors.zinc.600'),
            '--tw-prose-links': theme('colors.purple.600'),
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-counters': theme('colors.zinc.500'),
            '--tw-prose-bullets': theme('colors.zinc.300'),
            '--tw-prose-hr': theme('colors.zinc.200'),
            '--tw-prose-quotes': theme('colors.zinc.900'),
            '--tw-prose-quote-borders': theme('colors.purple.500'),
            '--tw-prose-captions': theme('colors.zinc.500'),
            '--tw-prose-code': theme('colors.zinc.900'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.slate.800'),
            '--tw-prose-th-borders': theme('colors.zinc.300'),
            '--tw-prose-td-borders': theme('colors.zinc.200'),
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.7',
            fontSize: '1rem',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.purple.700'),
                borderBottomColor: theme('colors.purple.500')
              }
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              lineHeight: '1.2'
            },
            h1: {
              fontSize: '2.5rem',
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid',
              borderColor: theme('colors.zinc.200'),
              paddingBottom: '0.5rem'
            },
            h2: {
              fontSize: '2rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
              borderBottom: '1px solid',
              borderColor: theme('colors.zinc.200'),
              paddingBottom: '0.5rem'
            },
            h3: {
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            h4: {
              fontSize: '1.25rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem'
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem'
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.gray.50'),
              borderRadius: '0.375rem',
              padding: '1rem 1.5rem',
              margin: '1.5rem 0',
              quotes: 'none',
              p: {
                marginTop: '0.5rem',
                marginBottom: '0.5rem'
              }
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: theme('colors.gray.100'),
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: '500',
              fontSize: '0.875rem'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: '0.5rem',
              padding: '1rem',
              margin: '1.5rem 0',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderRadius: '0',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit'
            },
            img: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            },
            'ul, ol': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem'
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontSize: '0.875rem'
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.zinc.200')
            },
            'thead th': {
              color: theme('colors.zinc.900'),
              fontWeight: '600',
              verticalAlign: 'bottom',
              paddingRight: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem'
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.zinc.100')
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0'
            },
            'tbody td': {
              verticalAlign: 'top',
              paddingTop: '0.75rem',
              paddingRight: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem'
            },
            hr: {
              borderColor: theme('colors.zinc.200'),
              margin: '2rem 0'
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600'
            },
            kbd: {
              fontSize: '0.875rem',
              color: theme('colors.zinc.900'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: '0.25rem',
              borderWidth: '1px',
              borderColor: theme('colors.gray.300'),
              padding: '0.125rem 0.25rem',
              boxShadow: '0 1px 0 ' + theme('colors.gray.300')
            }
          }
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc.400'),
            '--tw-prose-headings': theme('colors.zinc.100'),
            '--tw-prose-lead': theme('colors.zinc.400'),
            '--tw-prose-links': theme('colors.purple.400'),
            '--tw-prose-bold': theme('colors.zinc.100'),
            '--tw-prose-counters': theme('colors.zinc.400'),
            '--tw-prose-bullets': theme('colors.zinc.600'),
            '--tw-prose-hr': theme('colors.zinc.700'),
            '--tw-prose-quotes': theme('colors.zinc.100'),
            '--tw-prose-quote-borders': theme('colors.blue.400'),
            '--tw-prose-captions': theme('colors.zinc.400'),
            '--tw-prose-code': theme('colors.zinc.100'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.slate.800'),
            '--tw-prose-th-borders': theme('colors.zinc.600'),
            '--tw-prose-td-borders': theme('colors.zinc.700'),
            a: {
              '&:hover': {
                color: theme('colors.purple.300'),
                borderBottomColor: theme('colors.purple.500')
              }
            },
            h1: {
              borderColor: theme('colors.zinc.700')
            },
            h2: {
              borderColor: theme('colors.zinc.700')
            },
            blockquote: {
              borderLeftColor: theme('colors.blue.400'),
              backgroundColor: theme('colors.zinc.800')
            },
            code: {
              backgroundColor: theme('colors.zinc.800')
            },
            hr: {
              borderColor: theme('colors.zinc.700')
            },
            thead: {
              borderBottomColor: theme('colors.zinc.600')
            },
            'tbody tr': {
              borderBottomColor: theme('colors.zinc.700')
            },
            kbd: {
              color: theme('colors.zinc.100'),
              backgroundColor: theme('colors.zinc.800'),
              borderColor: theme('colors.zinc.600'),
              boxShadow: '0 1px 0 ' + theme('colors.zinc.600')
            }
          }
        }
      }),
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.6s ease forwards',
        'slide-down': 'slide-down 0.6s ease forwards',
        'scale-in': 'scale-in 0.6s ease forwards',
        blob: 'blob 8s infinite ease',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        glow: 'glow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(5%, 5%) scale(1.1)' },
          '50%': { transform: 'translate(0, 10%) scale(0.95)' },
          '75%': { transform: 'translate(-5%, 5%) scale(1.05)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' }
        },
        glow: {
          '0%, 100%': { opacity: '0.4', transform: 'translate(0, 0) scale(1)' },
          '25%': { opacity: '0.5', transform: 'translate(5%, 5%) scale(1.1)' },
          '50%': { opacity: '0.3', transform: 'translate(0, 10%) scale(0.95)' },
          '75%': { opacity: '0.5', transform: 'translate(-5%, 5%) scale(1.05)' }
        }
      },
      transitionDelay: {
        2000: '2000ms',
        4000: '4000ms'
      }
    }
  },
  plugins: [typography]
}
