# 架設 Mariadb sql server
[實作功能]
於本機端透過 docker 架設 Mariadb SQL server

[驗收方式]

需透過 docker env 對 SQL server 設定連線用的帳號密碼
可透過 SQL client tool 與 SQL server 進行連線
透過 docker-compose 部署驗收環境

---

### 透過 docker-compose 部署驗收環境
參考: [通过docker-compose配置安装MariaDB](https://zhuanlan.zhihu.com/p/143790371)
目前docker.compose.yml
```
mariadb:
    image: mariadb
    container_name: "mariadb"
    ports:
      - target: 3306
        published: 3306
        protocol: tcp
    env_file:
      - mariadb.env
    volumes:
      - ./db/data:/var/lib/mysql
      - ./db/initdb.d:/docker-entrypoint-initdb.d
```

Error: You need to specify one of MARIADB_ROOT_PASSWORD...

![](https://i.imgur.com/6TUFpas.png)

沒有設定密碼而無法連線 => 加入環境變數檔，並於其內新增username和password
```
//docker-compose.yml
    env_file:
      - mariadb.env
```
無法使用HeidiSQL連線到docker-compose設定的帳密

![](https://i.imgur.com/EBWHrsy.png)

解決方式: 移除先前安裝的桌面板MariaDB
思考方向: 
1. 當前只有使用桌面版MariaDB安裝時所設置的密碼才可登入
2. 此作業不需要桌面版

![](https://i.imgur.com/ZERzPZl.png)

可以使用docker-compose設定的帳密登入

#### 延伸至透過 sql 指令去新增一個 sql server 的 user，並給予特定的權限
批次檔
```
#!/bin/bash
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'user name'@'%' IDENTIFIED BY 'password';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, ALTER ON *.* TO '$MYSQL_DATABASE'@'%';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"
```
* 認證密碼
`mysql -u root -p$MYSQL_ROOT_PASSWORD -e`
-u => username (root)
-p => password
-e => 執行後面指令
:::success
對mysql進行帳戶驗證
:::
* 執行指令: 
    * **新增使用者和密碼**(`%` => 任何ip)
`CREATE USER 'user name'@'%' IDENTIFIED BY 'password'`
    
    * **授予權限**(`*.*` => 等於全部資料庫)
`GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, ALTER ON *.* TO '$MYSQL_DATABASE'@'%';"`

    * **新設置用戶或更改密碼後需用flush privileges刷新MySQL的系統權限相關表否則會出現拒絕訪問**
    `FLUSH PRIVILEGES` 

### 執行批次檔新增使用者 以及 mysql: command not found問題
1. 進入到mariadb container => 才能執行mysql指令
2. (不需要登入，直接在container中操作)
![](https://i.imgur.com/I9DpWRH.png)
3. 把adduser.sh移至container的目錄底下 => 才能執行批次檔

![](https://i.imgur.com/IvyqAGZ.png)

![](https://i.imgur.com/QwdwZzK.png)

可以使用newuser登入

![](https://i.imgur.com/mOjx5Va.png)
