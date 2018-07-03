const path = require('path');
const child_process = require('child_process');

function addApi(pageName, pluginName, config) {
	const apiPath = path.resolve(process.cwd(), 'api/1/' + pageName +'.php');
	const tablePath = path.resolve(process.cwd(), 'table/table_'+config.tableName + '.php');
	// 拷贝文件
	child_process.spawnSync('cp', [path.resolve(__filename, '../../components/api.php'), apiPath]);
	child_process.spawnSync('cp', [path.resolve(__filename, '../../components/table.php'), tablePath]);

	let replaceStr = 's/_FILENAME_/' + pluginName + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, apiPath]);
	replaceStr = 's/_HEADFILENAME_/' + pluginName.toUpperCase() + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, apiPath]);
	replaceStr = 's/_TABLENAME_/' + config.tableName + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, apiPath]);

	replaceStr = 's/_FILENAME_/' + pluginName + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, tablePath]);
	replaceStr = 's/_HEADFILENAME_/' + pluginName.toUpperCase() + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, tablePath]);
	replaceStr = 's/_TABLENAME_/' + config.tableName + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, tablePath]);
}

module.exports = {
	addApi
};
