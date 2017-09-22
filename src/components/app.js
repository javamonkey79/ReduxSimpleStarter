import {connect} from 'react-redux';
import {fetchStock} from '../actions';
import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError, reset} from 'redux-form';
import {Stock} from './stock';

class App extends Component {

    onSubmit(values) {
        return this.props.fetchStock(values.symbol)
            .then(
                (resp) => {
                    if (resp.payload.data["Error Message"]) {
                        throw new SubmissionError({
                            symbol: `Stock Symbol ${values.symbol} is invalid`,
                            _error: 'Invalid Stock Symbol!'
                        })
                    }

                    this.props.reset();
                });
    }

    render() {
        const {handleSubmit, stocks, submitting} = this.props;

        return (
            <div>
                <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Stock Ticker Symbol"
                        name="symbol"
                        component={this.renderField}
                    />
                    <button type="submit" disabled={submitting} className="btn btn-primary">Submit</button>
                </form>
                <Stock stockData={stocks}/>
            </div>
        );
    }

    renderField(field) {
        const {touched, error, submitting} = field.meta;

        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    disabled={submitting}
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps({stocks}) {
    return {stocks: stocks}
}

function validate(values, props) {
    const errors = {};

    if (!values.symbol || values.symbol.length < 3) {
        errors.symbol = "Enter a stock symbol that is at least 3 characters!";
    }

    // if errors is empty, form is valid to submit
    return errors;
}

App = reduxForm({validate, form: 'StocksNewForm'})(App)
App = connect(mapStateToProps, {fetchStock})(App)
export default App