## 启动项目

安装 项目

> yarn

正常启动

> yarn dev

test 环境

> yarn dev:tes

## 当前项目的文件目录结构和说明

```js
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件
└── src                                 // 源码目录
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── constants                       // 常量/接口地址等
    ├── layout                          // 全局布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，建议组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── main.ts                         // 项目入口文件
    ├── typing.d.ts                     // ts类型文件
├── .env.development                    // 开发环境变量
├── .env.production                     // 生产环境变量
├── .env.test                           // 测试环境变量
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .prettierrc.cjs                         // prettierc配置文件
├── index.html                          // 项目入口文件
├── package.json                        // package
├── package-lock.json                   // package-lock
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
└── vite.config.ts                      // vite
└── yarn.lock                           // yarn.lock

```

### 关键技术选型
