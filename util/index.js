const fs = require('fs')

// In case reformatting is needed
exports.reformatFiles = (dirName) => {
  const dir = `./content/${dirName}`
  const files = fs.readdirSync(dir)

  files.forEach((fileName) => {
    const content = fs.readFileSync(`${dir}/${fileName}`)
    const parsedContent = JSON.parse(content)
    fs.writeFileSync(
      `${dir}/${fileName}`,
      JSON.stringify(parsedContent, null, 2)
    )
  })
}

exports.mapAddressesIntoList = (globalObject) =>
  Object.entries(globalObject).map(([address, rest]) => ({ address, ...rest }))

exports.mapAddressesOutOfLists = (globalList) =>
  globalList.reduce((acc, token) => {
    const { address, ...rest } = token
    return {
      ...acc,
      [address]: rest,
    }
  })

/**
 * Bidirectional mapping: maps key_value dir into list dir and vice versa
 * @param {string} sourceDirName
 * @param {string} targetDirName
 * @param {number} mode // 0 - key_value into list, 1 - list into key_value
 */
exports.createTargetDir = (
  sourceDirName = 'key_value_full',
  targetDirName = 'list_full',
  mode = 0
) => {
  const targetDir = `./content/${targetDirName}`
  const sourceDir = `./content/${sourceDirName}`
  const files = fs.readdirSync(sourceDir)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  files.forEach((fileName) => {
    const content = fs.readFileSync(`${sourceDir}/${fileName}`)
    const parsedContent = JSON.parse(content)
    let mappedContent
    if (mode === 0) {
      mappedContent = module.exports.mapAddressesIntoList(parsedContent)
    } else if (mode === 1) {
      mappedContent = module.exports.mapAddressesOutOfLists(parsedContent)
    } else {
      throw new Error('Unsupported mode')
    }
    fs.writeFileSync(
      `${targetDir}/${fileName}`,
      JSON.stringify(mappedContent, null, 2)
    )
  })
}
