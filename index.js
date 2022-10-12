const { reformatFiles, createTargetDir } = require('./util')

// Scripts
const keyValueDirName = 'key_value_full'
const listDirName = 'list_full'
const keyValueLightDirName = 'key_value_icons'

reformatFiles(keyValueDirName)
createTargetDir(keyValueDirName, listDirName)
reformatFiles(listDirName)
createTargetDir(keyValueDirName, keyValueLightDirName, { mode: 2, key: 'icon' })
