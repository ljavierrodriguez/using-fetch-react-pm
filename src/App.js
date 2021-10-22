import { useEffect, useState } from "react"

const App = () => {
    // GET POST PUT DELETE = JSON

    const [usuarios, setUsuarios ] = useState(null);

    const [user, setUser] = useState({
        name: 'Pedro',
        lastname: 'Perez',
        phone: '56933331122'
    })

    const getUsuarios = () => { // Async
        let opcionesDelRequest = {
            method: 'GET',
            // body: datos, // POST y PUT solamente pueden usar el atributo body
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("/data/datos.json", opcionesDelRequest)
            .then((response) => {
                console.log(response.ok); // true
                console.log(response.status); // 200 400 500

                return response.json();
            })
            .then((data) => {
                console.log(data);
            })

            .catch((error) => {
                console.warn("Ha ocurrido un error: ", error);
            })

        console.log("Ejecutando codigo Async");
    }

    const getUsuariosAsync = async () => {
        try {
            let opcionesDelRequest = {
                method: 'GET',
                // body: datos, // POST y PUT solamente pueden usar el atributo body
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch("/data/datos.json", opcionesDelRequest);

            console.log(response.status);

            const { usuarios } = await response.json();

            console.log(usuarios);
            setUsuarios(usuarios);

        }catch(error){
            console.warn("Ha ocurrido un error: ", error);
        }
            
        console.log("Ejecutando codigo sync");
    }

    const createUser = ( user ) => {
        let raw = JSON.stringify(["Luis", "Pedro", "Hugo"]);
        console.log(raw);
        let opcionesDelRequest = {
            method: 'POST', // POST y PUT
            body: raw, // POST y PUT solamente pueden usar el atributo body
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //fetch("url-recurso", opcionesDelRequest);
    }

    /* async function test() {

    } */

    useEffect(() => { // componentDidMount
        getUsuariosAsync();
        createUser(user);
    }, [])

    return (
        <>
            <h1>Hola Mundo</h1>
            <button onClick={getUsuarios}>Cargar Usuarios 1</button>
            <button onClick={getUsuariosAsync}>Cargar Usuarios 2</button>
        </>
    )
}

export default App;