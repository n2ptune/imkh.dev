type IconMap = Record<string, { light: string; dark: string }>

const generateIconMap = (iconName: (string[] | string)[]) => {
  const result: IconMap = {}
  const normalize = (icon: string) => {
    switch (icon) {
      case 'vue':
        return 'vuejs'
      default:
        return icon
    }
  }

  for (let i = 0; i < iconName.length; i++) {
    let icon = ''

    if (Array.isArray(iconName[i])) {
      icon = iconName[i][0]
    } else {
      icon = iconName[i] as string
    }

    const onlyDefaultThemeIcon = icon.startsWith('!')
    icon = icon.replace(/!/gim, '')
    const lightIcon =
      'skill-icons:' + normalize(icon) + (onlyDefaultThemeIcon ? '' : '-light')
    const darkIcon =
      'skill-icons:' + normalize(icon) + (onlyDefaultThemeIcon ? '' : '-dark')

    if (Array.isArray(iconName[i])) {
      ;(iconName[i] as string[]).forEach(deep => {
        result[deep.replace(/!/gim, '')] = {
          light: lightIcon,
          dark: darkIcon
        }
      })
    } else {
      result[icon] = {
        light: lightIcon,
        dark: darkIcon
      }
    }
  }

  return result
}

export function useIconMap() {
  const iconMap = generateIconMap([
    'vue',
    'react',
    'angular',
    '!docker',
    'nodejs',
    'raspberrypi',
    '!rust',
    '!typescript',
    ['!javascript', 'es6'],
    '!css',
    ['!html', 'html5'],
    'python',
    '!electron',
    '!git',
    'graphql',
    ['expressjs', 'express']
  ])

  return {
    iconMap
  }
}
