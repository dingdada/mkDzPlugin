import React from 'react';
import PropTypes from 'prop-types';

import TableInfo from './TableInfo';
import Bar from './Bar';

import './index.less';

export default class CustomTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {barOptions, columns, dataSource, reload, limit, current, total, rowKey, className, hideFooter} = this.props;
        const bar = Array.isArray(barOptions) && barOptions.length
            ? <Bar options={barOptions} reload={reload} />
            : '';

        const bordered = !bar;
        return (
            <div className="custom-table">
                <div className="custom-table-bar">{bar}</div>
                <TableInfo
                    columns={columns}
                    dataSource={dataSource}
                    reload={reload}
                    limit={limit}
                    current={current}
                    total={total}
                    rowKey={rowKey}
                    className={className}
                    hideFooter={hideFooter}
                    bordered={bordered}
                />
            </div>
        );
    }
}

CustomTable.propTypes = {
    barOptions: PropTypes.array,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    reload: PropTypes.func.isRequired
};


// barOptions = [
//     {
//         type: 'Select',
//         dataSource: array,
//         defaultValue: -1,
//         key: '3',
//         width: ''
//     },
//     {
//         type: 'DatePicker',
//         subType: 'DatePicker|RangePicker',
//         format: 'YYYY/MM/DD',
//         defaultValue: '',
//         key: '2',
//         width: ''
//     },
//     {
//         type: 'Search',
//         placeholder: '',
//         key: '1',
//         width: ''
//     }
// ]
