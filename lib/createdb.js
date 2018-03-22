function createdb(config) {
    let result = '$table=DB::table("' + config.tableName + '");\n';
    result = result + '$sql = "CREATE TABLE IF NOT EXISTS $table ". <<<EOF\n';
    result = result + '(\n';

    result = result + '`id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT "自增主键",\n'

    config.columns.forEach(element => {
        result = result + '`' + element.key +'` ' + element.db_type + ' NOT NULL DEFAULT "" COMMENT "'+ element.title + '",\n'
    });

    result = result + '`mtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT "记录更新时间",\n';
    result = result + '`is_del` TINYINT(1) NOT NULL DEFAULT "0" COMMENT "删除状态(0: 未删除, 1: 已删除)",\n';
    result = result + 'PRIMARY KEY (`id`)\n';
    result = result + ') ENGINE=INNODB\nEOF;\nrunquery($sql);';

    return result;
}

module.exports = {
    createdb
};
