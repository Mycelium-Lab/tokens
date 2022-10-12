const fs = require('fs')

/**
 * Reformat json files in a directory
 * @param {string} dirName - directory where files are located
 */
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

/**
 * Map object of tokens to list of tokens
 * @param {object} globalObject
 * @returns {[object]} - list of complete token objects
 */
exports.mapAddressesIntoList = (globalObject) =>
  Object.entries(globalObject).map(([address, rest]) => ({ address, ...rest }))

/**
 * Map list of token object to address-based object
 * @param {[object]} globalList
 * @returns {object} - object { [address]: { ... }, ... }
 */
exports.mapAddressesOutOfList = (globalList) =>
  globalList.reduce((acc, token) => {
    const { address, ...rest } = token
    return {
      ...acc,
      [address]: rest,
    }
  })

/**
 * Create a light version of key-value pair, where value is not the whole tokenObject but only its property (key)
 * @param {object} globalObject - global tokens object as in /content
 * @param {string} key - key of tokenObject
 * @returns {object} key-value object where key is address of the token, value - key of tokenObject
 */
exports.createKeyValueLightVersion = (globalObject, key) =>
  Object.entries(globalObject).reduce(
    (acc, [address, rest]) => ({ ...acc, [address]: rest[key] }),
    {}
  )

/**
 * Bidirectional mapping: maps key_value dir into list dir and vice versa
 * @param {string} sourceDirName
 * @param {string} targetDirName
 * @param {object} config
 * - mode - 0 - key_value into list, 1 - list into key_value, 2 - key_value into light key_value
 * - key - name of the key of tokenObject to make a light key value version from, if mode === 2
 */
exports.createTargetDir = (
  sourceDirName,
  targetDirName,
  config = { mode: 0, key: '' }
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
    if (config.mode === 0) {
      mappedContent = module.exports.mapAddressesIntoList(parsedContent)
    } else if (config.mode === 1) {
      mappedContent = module.exports.mapAddressesOutOfList(parsedContent)
    } else if (config.mode === 2) {
      mappedContent = module.exports.createKeyValueLightVersion(
        parsedContent,
        config.key
      )
    } else {
      throw new Error('Unsupported mode')
    }
    fs.writeFileSync(
      `${targetDir}/${fileName}`,
      JSON.stringify(mappedContent, null, 2)
    )
  })
}
