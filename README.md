目标：定义一个小型的脚手架工具，根据模板生成自己的项目目录

思路：
1、建立自己的脚手架目录 my-scaffolding

2、初始化package.json文件

3、在package.json中添加bin字段，指定cli应用入口文件

4、新建cli.js文件，并添加文件头 #!/usr/bin/env node
Node Cli应用文件必须要有这样的文件头
如果是Linux 或者 macOS系统下还需要修改此文件的读写权限为755
通过chmod 755 cli.js 实现修改

5、新增templates目录，并将模板添加到该目录下，以便到时候读取该目录下的文件

6、开始写脚手架工具实现，此时，需要明确我们需要做些什么

6.1、首先，毫无疑问，我们要先发起一个命令行交互去询问用户相关问题，此时我们需要用到inquirer模块来发起命令行交互
6.2、我们需要读取template模板中的文件内容，然后将模板文件的内容利用ejs模板引擎结合命令行交互得到的用户输入结果来渲染模板中的内容。这期间需要用到path模块来读取路径，以及ejs模板引擎来渲染模板
6.3、然后我们需要将渲染之后的内容写入到我们的目标目录中
6.4、此期间，读取template模板目录以及写入目标文件我们都需要用到node.js核心模块fs

7、明确了我们需要用到的模块后，我们需要先安装相应模块（inquirer, ejs），并引入相应模块（inquirer,ejs, path, fs）
path和fs是node.js内置模块，无需安装

8、开始写脚手架实现逻辑
8.1、inquirer发起命令行交互
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name'
  }
]).then((answers) => { console.log(answers) }
8.2、获取模板所在目录，以及需要写入的目标目录。并读取templates下的模板
// 获取模板目录
const tempDir = path.join(__dirname, 'templates')
// 文件输出目录
const outDir = process.cwd()
fs.readdir(tempDir, (err, files) => {
  if (err) throw err
  files.forEach((file) => {

  })
})
8.3、将读取到的模板内容利用ejs进行渲染(结合命令行交互时用户的输入结果)
ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
  if (err) throw err
})
8、4 将渲染后的结果写入到目标目录中
// 将结果写入到目标目录
fs.writeFileSync(path.join(outDir, file), result)

9、实现逻辑写完后，我们需要通过yarn link 或者 npm link将其关联到全局(关联到全局后，可以在任何地方去使用此脚手架)

10、测试脚手架情况
mkdir test
cd test
执行命令 my-scaffolding
查看test目录下是否有生成我们需要的项目结构