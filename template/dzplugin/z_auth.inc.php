<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
    exit('Access Denied');
}
require_once dirname(__FILE__).'/class/env.class.php';
$params = array(
	'ajaxapi' => _FILENAME__env::get_plugin_path()."/index.php?version=4&module=",
);
$tplVars = array(
    'plugin_path' => _FILENAME__env::get_plugin_path(),
	'pluginurl' => _FILENAME__env::get_siteurl()."/plugin.php?id=_FILENAME_",
);
_FILENAME__utils::loadtpl(dirname(__FILE__).'/template/views/z_auth.tpl', $params, $tplVars);