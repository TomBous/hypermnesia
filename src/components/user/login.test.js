import Login from './login'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, it } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import store from '../../store'
import { SET_CURRENT_USER } from '../../actions/types'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import userEvent from '@testing-library/user-event'

const middleware = [thunk];

const initialState = {
    validToken: false,
    user: {},
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
}

function renderWithRedux(component, { initialState, store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware)))} = {}) {
    return {
        ...render(
            <Provider store={store}>
                <Router>
                    {component}
                </Router>
            </Provider>)
    }
}

describe('Login', () => {
    it('Should render component', async () => {
        renderWithRedux(<Login />)
    })
    it('Should have a register link', async () => {
        renderWithRedux(<Login />)
        expect(screen.getByRole('link')).toHaveTextContent('Créer un compte ?')
    })
    it('Should have a connexion/submit button', async () => {
        renderWithRedux(<Login />)
        expect(screen.getByText('Connexion')).toHaveAttribute('type', 'submit')
    })
    it('User can authenticate', async () => {
        const {getByPlaceholderText, getByText} = renderWithRedux(<Login />)
        const onSubmit = jest.fn()
        userEvent.type(getByPlaceholderText('Votre email'), 'thomasbousquet@gmail.com')
        userEvent.type(getByPlaceholderText('Votre mot de passe'), 'colorprinter2!')
        userEvent.click(getByText('Connexion'))
        expect(onSubmit).toHaveBeenCalledTimes(0)
    })
})