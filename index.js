const { reformatFiles, createTargetDir } = require('./util')

// Scripts
const keyValueDirName = 'key_value_full'
const listDirName = 'list_full'

reformatFiles(keyValueDirName)
createTargetDir(keyValueDirName, listDirName, 0)
reformatFiles(listDirName)
