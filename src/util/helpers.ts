export function convertToUnit (str: number, unit?: string): string
export function convertToUnit (str: string | number | null | undefined, unit?: string): string | undefined
export function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
  if (str == null || str === '')
    return undefined

  else if (isNaN(+str!))
    return String(str)

  else if (!isFinite(+str!))
    return undefined

  else
    return `${Number(str)}${unit}`
}

export default {
  convertToUnit,
}
