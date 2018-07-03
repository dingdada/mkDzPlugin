const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

let pageName = '';
let config = {};

function createPage(name, conf) {
	pageName = name;
	config = conf;
	generateColumns();

	addApiConstants();

	// 需要删除
	if (conf.needDelete) {}
	// 需要新增
	if (conf.needAdd) {}
	// 需要修改
	if (conf.needModify) {}

	// 筛选项
}

// 生成列名

function generateColumns() {
	// 拷贝文件
	child_process.spawnSync('cp', [path.resolve(__filename, '../../components/Page/PageWithTable.js'), path.resolve(process.cwd(), 'fe/src/components/' + pageName +'.js')]);
	const filepath = path.resolve(process.cwd(), 'fe/src/components/', pageName+'.js');
	let replaceStr = 's/_PAGENAME_/' + pageName + '/g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, filepath]);

	let columns = [];
	config.columns.forEach(element => {
		columns.push({
			key: element.key,
			dataIndex: element.key,
			title: element.title
		});
	});

	let opStr = '';
	if (config.needDelete || config.needModify) {
		opStr = '{"key": "__operation", ' +
            '"dataIndex": "__operation",' +
            '"title": "操作", ' +
            '"render": (text, record) => {' +
                'return (<div>';

		opStr = config.needModify ? opStr + '<a href="javascript:;" onClick={() => this.edit(record)} style={{marginRight: "30px"}}>编辑</a>' : opStr;
		opStr = config.needDelete ? opStr + '<Popconfirm title="确认删除么" onConfirm={() => this.delete(record.id)} okText="确认" cancelText="取消"><a href="javascript:;">删除</a></Popconfirm>' : opStr;
		opStr = opStr + '</div>)}}';
	}

	let columnStr = JSON.stringify(columns);
	if (opStr) {
		columnStr = JSON.stringify(columns).slice(0, -1) + ',' + opStr + ']';
	}

	replaceStr = 's#\'__COLUMNS__\'#' + columnStr + '#g';
	child_process.spawnSync('sed', ['-i', '', replaceStr, filepath]);
}

function addApiConstants() {
	const addApi = '\r\nexport const ADD_' + pageName + ' = BASE_URL + "' + pageName + '&action=add";\r\n';
	const getApi = 'export const GET_' + pageName + ' = BASE_URL + "' + pageName + '&action=query";\r\n';
	const deleteApi = 'export const DELETE_' + pageName + ' = BASE_URL + "' + pageName + '&action=del";';
	const addContent = addApi + getApi + deleteApi;
	fs.appendFileSync(path.resolve(process.cwd(), 'fe/src/common/constants/api.js'), addContent);
}

module.exports = {
	createPage
};
