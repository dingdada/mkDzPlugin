import React from 'react';

import {Form, Input, Select, DatePicker, Button, Icon} from 'antd';
import moment from 'moment';
const Search = Input.Search;
const Option = Select.Option;
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

import {exportExcel} from 'common/util/excel';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValues: {}
        };
        this.reload = this.reload.bind(this);
    }

    updateInputValue(obj) {
        const inputValues = {
            ...this.state.inputValues,
            ...obj
        };
        this.setState({
            inputValues
        });
    }

    reload(params) {
        const mergeParams = {
            ...this.state.inputValues,
            ...params,
            start: 0
        };
        this.props.reload(mergeParams);
    }

    genFormItems() {
        return this.props.options.map(option => this.genItem(option));
    }

    genItem(option) {
        let item = null;
        switch(option.type) {
            case 'Search':
                item = this.genSearch(option);
                break;
            case 'Select':
                item =  this.genSelect(option);
                break;
            case 'DatePicker':
                item = this.genDatePicker(option);
                break;
            case 'ExportExcel':
                item = this.genExportExcel(option);
                break;
            default:
                item = (<div></div>);
                break;
        }

        let style = {};
        if (option.type === 'ExportExcel') {
            style = {float: 'right'};
        }
        return (
            <FormItem key={option.key} label={option.text} style={style}>{item}</FormItem>
        );
    }

    genSearch(option) {
        return (
            <Search
                placeholder={option.placeholder}
                onSearch = {value => this.reload({[option.key]: value})}
                onChange={e => this.updateInputValue({[option.key]: e.target.value})}
                style={{width: option.width || 200}}
            />
        );
    }

    genSelect(option) {
        const items = option.dataSource.map(data => (
            <Option value={data.value} key={data.value}>{data.text}</Option>
        ));
        return (
            <Select
                defaultValue={option.defaultValue}
                style={{width: option.width || 200}}
                onChange={value => this.reload({[option.key]: value})}
            >{items}</Select>
        );
    }

    genDatePicker(option) {
        const {defaultValue, dateFormat} = option;
        if (option.subType === 'DatePicker') {
            return (
                <DatePicker
                    defaultValue={moment(defaultValue, dateFormat)} format={dateFormat}
                    onChange={(date, dateString) => this.reload({[option.key]: dateString})}
                />
            );
        }
        else if(option.subType === 'RangePicker') {
            return (
                <RangePicker
                    defaultValue={[moment(defaultValue[0], dateFormat), moment(defaultValue[1], dateFormat)]}
                    format={dateFormat}
                    onChange={(dates, dateStrings) => this.reload({
                        [option.key[0]]: dateStrings[0],
                        [option.key[1]]: dateStrings[1]
                    })}
                />
            );
        }
    }

    genExportExcel(option) {
        return (
            <Button type="primary" onClick={() => exportExcel(option.domId, option.fileName, option.style)}><Icon type="download" />导出本页到Excel</Button>
        );
    }

    render() {
        const items = this.genFormItems();
        return (
            <Form layout="inline">
            {items}
            </Form>
        )
    }
}
