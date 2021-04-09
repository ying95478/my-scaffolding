#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

// 利用inquirer模块发起命令行交互询问
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name'
  }
]).then((answers) => {
  // 获取模板目录
  const tempDir = path.join(__dirname, 'templates')

  // 文件输出目录
  const outDir = process.cwd()

  // 将模板目录下的模板转换为目标文件
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err
    files.forEach((file) => {
      // 利用模板引擎渲染文件
      ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
        if (err) throw err
        // 将结果写入到目标目录
        fs.writeFileSync(path.join(outDir, file), result)
      })
    })
  })
})