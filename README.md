# i-helper-backEnd

i-helper 配套的后端，技术栈为 `nest.js` 全家桶

## 数据库连接配置

依赖安装完后，需要修改数据库配置。使用的数据库为mysql，修改文件路径为`src\storage\module\db.module.ts`。修改`host、port、username、password`为数据库配置中的信息

## 插件COS配置

i-helper使用腾讯云cos进行插件文件管理，需要设置对应的配置才能完成插件文件的存储。

修改文件路径为`src\utils\index.ts`，修改`SecretId、SecretKey、Bucket`为申请的cos配置与bucket信息。具体可查阅官网`cos-nodejs-sdk-v5`的案例文档

一切就绪，按下F5即可启动项目。
