const child_process = require('child_process');
const path = require('path');

function createPage(pageName, config) {
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

    replaceStr = 's/\'__COLUMNS__\'/' + JSON.stringify(columns) + '/g';
    child_process.spawnSync('sed', ['-i', '', replaceStr, filepath]);
    // columns.push({
    //     title: '',
    //     dataIndex: 'operation___',
    //     width: 100,
    //     render: (text, record) => {
    //         return (
    //             <a href="javascript:;" onClick={}>编辑</a>
    //             <a href="javascript:;" onClick={}>删除</a>
    //         );
    //     }
    // });
    return columns;
}

module.exports = {
    createPage
};
