<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 插件访问日志表
 **/
class table__TABLENAME_ extends discuz_table
{
	public function __construct() {
		$this->_table = '_TABLENAME_';
		$this->_pk = 'id';
		parent::__construct();
	}

	public function get_by_pk($id)
	{
        $sql = "SELECT * FROM ".DB::table($this->_table)." WHERE ".$this->_pk."='$id'";
        return DB::fetch_first($sql);
    }

	// 查询接口
	public function query()
	{/*{{{*/
		$return = array(
            "totalProperty" => 0,
            "root" => array(),
        );

        $sort  = _FILENAME__validate::getOPParameter('sort','sort','string',1024,'id');
        $dir   = _FILENAME__validate::getOPParameter('dir','dir','string',1024,'ASC');
        $start = _FILENAME__validate::getOPParameter('start','start','integer',1024,0);
        $limit = _FILENAME__validate::getOPParameter('limit','limit','integer',1024,20);

        $table = DB::table($this->_table);
		$sql = <<<EOF
SELECT SQL_CALC_FOUND_ROWS *
FROM $table
ORDER BY $sort $dir LIMIT $start,$limit
EOF;
        $return["root"] = DB::fetch_all($sql);
        $row = DB::fetch_first("SELECT FOUND_ROWS() AS total");
        $return["totalProperty"] = $row["total"];
        return $return;
	}/*}}}*/

	// 删除
	public function del() {
        $id = _FILENAME__validate::getNCParameter('id', 'id', integer);
        $sql = "UPDATE ".DB::table($this->_table)." SET is_del=1 WHERE id=$id";
        DB::query($sql);
    }

    // 添加
    public function add() {}
}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
