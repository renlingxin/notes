## mysql
> 扩展资料 https://www.cnblogs.com/bchjazh/p/5997728.html （常用的数据库操作语句）

mysql -u root -p    进入数据库

flush privileges    刷新数据库

show databases;     显示所有数据库

use xxx;            进入xxx数据库

show tables;        显示数据库中的所有的表

describe user;      显示数据库中user表的列信息  --- desc xxx;

select * from xxx; 查看xxx数据库的全部信息

insert into table1 (field1,field2) values (value1,value2); 插入

delete from table1 where 范围; 删除

update table1 set filed1 = values where 范围；修改
