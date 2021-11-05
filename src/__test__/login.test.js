import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import FormLogin from '../Components/FormLogin'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'


const mockHistory = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push:  mockHistory,
    })
    
}))

// jest.mock("react-router-dom", () => ({
// 	...jest.requireActual("react-router-dom"), //buscando o que está dentro do módulo
// 	Link: ({ children }) => children,
// 	useHistory: () => ({
// 		push: jest.fn(),
// 	}),
// }));

const api = axios.create({
    baseURL: "https://kenziehub.herokuapp.com"
})

const apiMock = new MockAdapter(api)

describe("login", () => { 
    
    it("user should log in", async () => {
        apiMock.onPost("/sessions").replyOnce(200, {})
        render(<FormLogin autentic={false} setAutentic={() => {}}/>)

        const inputEmail = screen.getByPlaceholderText("seu e-mail")
        const inputPassword = screen.getByPlaceholderText("sua senha")
        const buttonElt = screen.getByText("Logar")

        fireEvent.change(inputEmail, {target: {value: "kk@bol.com"}})
        fireEvent.change(inputPassword, {target: {value: "#Aa123456"}})
        fireEvent.click(buttonElt) 

        await waitFor(() => {
            expect(inputEmail).toHaveValue('kk@bol.com');
            expect(inputPassword).toHaveValue('#Aa123456');  
            expect(mockHistory).toHaveBeenCalled(); 
        })
        

    })
})


