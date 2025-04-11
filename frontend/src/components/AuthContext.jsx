import { useContext, createContext, useState, useEffect, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [modalAddTarefa, setModalAddTarefa] = useState(false);
    const [modalTarefa, setModalTarefa] = useState(false);
    const [atualizarTarefas, setAtualizarTarefas] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
      });

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        const tokenSalvo = localStorage.getItem("token");

        if (usuarioSalvo && tokenSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
            setToken(tokenSalvo);
        }

        if(darkMode){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        setIsLoading(false)
    }, [darkMode])

    const handleModalAddTarefa = () => {
        setModalAddTarefa(prev => !prev)
    };

    const handleModalTarefa = () => {
        setModalTarefa(prev => !prev)
    };

    const login = (usuarioData, tokenData) => {
        setUsuario(usuarioData);
        setToken(tokenData);
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
        localStorage.setItem("token", tokenData)
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token")

    };

    return (
        <AuthContext.Provider value={{ 

        usuario,
         token,
         login,
         logout,
         isLoading,
         modalAddTarefa,
         handleModalAddTarefa,
         darkMode,
         setDarkMode,
         atualizarTarefas,
         setAtualizarTarefas,
         modalTarefa,
         handleModalTarefa,
         tarefaSelecionada,
         setTarefaSelecionada

         }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)