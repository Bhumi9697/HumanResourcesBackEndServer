export const replacer = (html, propsToReplace) => {
  const replace = (textToBeReplaced, newText, p) =>
    p.replace(new RegExp(`{{${textToBeReplaced}}}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText)

  let result = html
  Object.keys(propsToReplace).forEach((prop) => {
    result = replace(prop, propsToReplace[prop] || '', result)
  })

  return result
}
