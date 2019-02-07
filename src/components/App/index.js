import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    getList,
    getFetchList
} from '../../reducers/fetchList'
import {
    fetchListRequest,
    fetchListSuccess,
    updateList
} from '../../actions/fetchList'
import {selectUser} from '../../actions/selectUser'
import {searchItem} from '../../actions/search'
import cx from 'classnames'
import Spinner from "react-svg-spinner";
import {getSelectedUser} from "../../reducers/selectUser";
import {getSearchItem} from "../../reducers/searchItem";

import './index.scss'


export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 3,
            value: '',
            isClicked: false,
            isRowClicked: false,
            disabled: "disabled"
        }

        this.sorted = {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        };
    }


    handleChange = e => {

        this.setState({
            value: e.target.value,
        })
        this.setState((state) => ({
            disabled: state.value ? "" : "disabled"
        }))
    }

    handlePreventDefault = (e) => {
        e.preventDefault()
    }

    handleSubmit = () => {
        const {list} = this.props
        const searchList = []
        list.map((el) => {
            for (var key in el) {
                let temp = el[key]
                if (String(temp).includes(this.state.value)) {
                    searchList.push(el)
                }
            }
        })
        this.setState({
            value: ""
        })
        this.props.searchItem(searchList)
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleSort = (type) => {
        const {list} = this.props
        const sortList = (list.length > 0) ? list : []
        const isSorted = this.sorted[type];
        let direction = isSorted ? 1 : -1

        const sorted = [].slice.call(sortList).sort((a, b) => {
            if (a[type] === b[type]) {
                return 0;
            }
            return a[type] > b[type] ? direction : direction * -1;
        });

        this.sorted[type] = !isSorted;
        this.props.updateList(sorted)
        this.setState({
            isClicked: isSorted ? false : true
        })
    }

    handleRequestList = (e) => {
        let buttonId = e.target.id
        if (String(buttonId) === "button-short") {
            this.props.fetchListRequest("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        } else if (String(buttonId) === "button-long") {
            this.props.fetchListRequest("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        }
        if (this.props.searchItems) {
            this.props.searchItems.length = 0
        }
    }

    getTitles = () => {
        const {list} = this.props
        const listArr = (list.length > 0) ? list : []
        const keysArr = []
        if (listArr.length > 0) {
            for (var key in listArr[0]) {
                if (key === 'address') {
                    for (var nestedKey in listArr[0][key]) {
                        keysArr.push(nestedKey)
                    }
                } else {
                    keysArr.push(key)
                }
            }
        }
        return keysArr
    }

    handleClickRow = (e) => {
        const {list} = this.props
        const rowId = e.currentTarget.id
        let selected = list.filter((el) => {
            return Number(el.id) === Number(rowId)
        })
        this.props.selectUser(selected)
    }

    renderTableList = (el, i) => {
        return (
            <tr className="table-item-row"
                id={el.id}
                key={i}
                onClick={this.handleClickRow}>
                <td className="table-name-item">{el.id}</td>
                <td className="table-name-item">{el.firstName}</td>
                <td className="table-name-item">{el.lastName}</td>
                <td className="table-name-item">{el.email}</td>
                <td className="table-name-item">{el.phone}</td>
                <td className="table-name-item">{el.address.streetAddress}</td>
                <td className="table-name-item">{el.address.city}</td>
                <td className="table-name-item">{el.address.state}</td>
                <td className="table-name-item">{el.address.zip}</td>
                <td className="table-name-item">{el.description}</td>
            </tr>)
    }

    renderUserSection = (el, i) => {
        return (
            <div className='user-section'
                 key={i}>
                <div
                    className='user-name'>Пользователь<b>{el.firstName} </b>
                </div>
                <div
                    className="user-description">Описание {el.description}
                </div>
                <div
                    className="user-address">
                    <div
                        className="user-address-title">Адрес
                    </div>

                    <div
                        className="user-city">Город:{el.address.city}
                    </div>
                    <div
                        className="user-district">Штат:{el.address.state}
                    </div>
                    <div
                        className="user-index">Индекс:{el.address.zip}
                    </div>
                </div>
            </div>)
    }

    render() {
        const {list, searchItems, selectedUser} = this.props
        const {isFetching} = this.props.fetchList
        const {value, isClicked, currentPage, itemsPerPage, disabled} = this.state;
        let listArr;
        if (searchItems) {
            listArr = (searchItems.length > 0) ? searchItems : list
        } else if (list.length > 0) {
            listArr = list
        } else {
            listArr = []
        }
        const keys = this.getTitles()
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = listArr.slice(indexOfFirstItem, indexOfLastItem);
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(listArr.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className='number-item'
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div className='app'>
                <div className='app-container'>
                    <div className='button-section'>
                        <button
                            id='button-short'
                            onClick={this.handleRequestList}>
                            Загрузить Короткий список
                        </button>
                        <button
                            id='button-long'
                            onClick={this.handleRequestList}>
                            Загрузить Полный список
                        </button>
                    </div>

                    <div className='input-section'>
                        <form
                            onSubmit={this.handlePreventDefault}>
                            <input type="text"
                                   className="input-address"
                                   placeholder="Ведите-адрес"
                                   onChange={this.handleChange}
                                   value={value}
                            />
                            <input type="submit"
                                   value="найти"
                                   className="input-search"
                                   onClick={this.handleSubmit}
                                   disabled={disabled}
                            />
                        </form>
                    </div>

                    {isFetching ? (<Spinner/>) :
                        (<table className="table-addresses">
                            <tr className='table-title-row'>
                                {keys.map((el, i) => (
                                        <th key={i}
                                            className={cx("table-title-item", {['rotated']: isClicked})}
                                            onClick={() => this.handleSort(el)}
                                        >
                                            {el}
                                        </th>
                                    )
                                )}
                            </tr>

                            {currentItems.map((el, i) => this.renderTableList(el, i))}
                        </table>)}
                    <ul className='number-list'>
                        {renderPageNumbers}
                    </ul>
                    {selectedUser && (selectedUser.map((el, i) => this.renderUserSection(el,i)))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: getList(state),
    selectedUser: getSelectedUser(state),
    searchItems: getSearchItem(state),
    fetchList: getFetchList(state)
})

const mapDispatchToProps = {
    fetchListRequest,
    fetchListSuccess,
    searchItem,
    selectUser,
    updateList
}

export default connect(mapStateToProps, mapDispatchToProps)(App)