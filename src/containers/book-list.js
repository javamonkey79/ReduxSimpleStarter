import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux';

class BookList extends Component {
    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }

    renderList(){
        return this.props.books.map(
            (book) => {
                return <li
                    onClick={() => this.props.selectBook(book)}
                    key={book.title}
                    className="list-group-item">{book.title}</li>
            }
        );
    }
}

function mapStateToProps(state){
    //whatever is returned will shop up as props inside of BookList
    return {
        books: state.books
    }
}

//anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch) {
    //whenever selectBook is called, the result should be passed to all of our reducers
    return bindActionCreators({selectBook: selectBook}, dispatch);
}

//promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook
//Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);