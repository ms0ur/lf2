import RegisterFormPopup from "./components/RegisterFormPopupComponent"
import "./App.scss"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="register">
        <div className="registerForm">
          <RegisterFormPopup />
        </div>
      </div>
    </>
  )
}

export default App
