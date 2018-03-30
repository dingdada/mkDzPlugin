import React from 'react';

import {post} from 'common/util/request';
import {GET__PAGENAME_, ADD__PAGENAME_, DELETE__PAGENAME_} from 'common/constants/api';

import CustomTable from 'common/components/CustomTable';

const LIMIT = 40;

export default class _PAGENAME_ extends React.Component {
    constructor() {
        super();

        this.state = {
            params: {
                start: 0,
                limit: LIMIT
            },
            current: 0,
            list: [],
            total: []
        };
    }

    componentDidMount() {
        this.reload();
    }

    reload(params) {
        params = params || {};
        const initialParams = this.state.params;
        const mergedParams = {
            ...initialParams,
            ...params
        };

        const {start, limit} = mergedParams;

        this.setState({
            params: mergedParams,
            current: start ? start / limit + 1 : 0
        });

        post(GET__PAGENAME_, mergedParams).then(res => {
            if (res.retcode) {}
            else {
                this.setState({
                    list: res.data.root,
                    total: parseInt(res.data.totalProperty, 10)
                });
            }
        });
    }

    render() {
        const columns = '__COLUMNS__';
        return (
            <div>
                <CustomTable
                    columns={columns}
                    dataSource={this.state.list}
                    total={this.state.total}
                    limit={LIMIT}
                    reload={this.reload}
                    barOptions={null}
                    rowKey='id'
                    className='_PAGENAME_'
                    current={this.state.current}
                />
            </div>
        );
    }
}
