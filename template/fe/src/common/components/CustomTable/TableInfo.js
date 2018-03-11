import React from 'react';

import {Table} from 'antd';


export default class TableInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: props.limit
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(pagination, filters, sorter) {
        this.props.reload({
            start: (pagination.current - 1) * pagination.pageSize,
            limit: pagination.pageSize
        });
        this.setState({
            limit: pagination.pageSize
        });
    }

    render() {
        const {columns, dataSource, reload, rowKey, total, className, hideFooter, bordered} = this.props;

        const pagination = hideFooter ? false : {
            total: total,
            current: this.props.current,
            pageSize: this.state.limit,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true
        };
        return <Table
            rowKey={rowKey}
            columns={columns}
            dataSource={dataSource}
            onChange={this.onChange}
            pagination={pagination}
            className={className}
            bordered={bordered}
         />
    }
}
