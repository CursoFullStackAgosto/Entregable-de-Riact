import { useState, useEffect } from "react";

const Body = () => {
    const [tareas, setTareas] = useState([]);
    const [tareasEliminadas, setTareasEliminadas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    useEffect(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        const tareasEliminadasGuardadas =
            JSON.parse(localStorage.getItem("tareasEliminadas")) || [];
        setTareas(tareasGuardadas);
        setTareasEliminadas(tareasEliminadasGuardadas);
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }, [tareas]);

    useEffect(() => {
        localStorage.setItem(
            "tareasEliminadas",
            JSON.stringify(tareasEliminadas)
        );
    }, [tareasEliminadas]);

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;
        const nueva = {
            id: Date.now(), 
            texto: nuevaTarea,
            completada: false,
        };
        setTareas([...tareas, nueva]);
        setNuevaTarea("");
    };

    const completarTarea = (id) => {
        const tareasActualizadas = tareas.map((tarea) =>
            tarea.id === id
                ? { ...tarea, completada: !tarea.completada }
                : tarea
        );
        setTareas(tareasActualizadas);
    };

    const eliminarTarea = (id) => {
        const tareaEliminada = tareas.find((tarea) => tarea.id === id);
        setTareasEliminadas([...tareasEliminadas, tareaEliminada]);
        setTareas(tareas.filter((tarea) => tarea.id !== id));
    };

    const limpiarTareasEliminadas = () => {
        setTareasEliminadas([]);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Lista de Tareas</h2>
            <input
                type="text"
                placeholder="Escribe una tarea"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                style={{
                    padding: "20px",
                    fontSize: "14px",
                    marginRight: "10px",
                    width: "300px",
                }}
            />
            <button
                onClick={agregarTarea}
                style={{
                    padding: "20px 20px",
                    fontSize: "14px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    
                }}
            >
                Agregar tarea
            </button>

            <div className="tareas-activas">
                <ul>
                    {tareas.map((tarea) => (
                        <li
                            key={tarea.id} 
                            style={{
                                marginBottom: "10px",
                                padding: "10px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textDecoration: tarea.completada
                                    ? "line-through"
                                    : "none",
                                color: tarea.completada ? "gray" : "black",
                            }}
                        >
                            {tarea.texto}
                            <div>
                                <button
                                    onClick={() => completarTarea(tarea.id)}
                                    style={{
                                        marginLeft: "10px",
                                        padding: "5px 10px",
                                        backgroundColor: tarea.completada
                                            ? "green"
                                            : "gray",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {tarea.completada ? "Desmarcar" : "Completar"}
                                </button>
                                <button
                                    onClick={() => eliminarTarea(tarea.id)}
                                    style={{
                                        marginLeft: "10px",
                                        padding: "5px 10px",
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {tareasEliminadas.length > 0 && (
                <div className="tareas-eliminadas">
                    <h3>Tareas Eliminadas</h3>
                    <ul>
                        {tareasEliminadas.map((tarea) => (
                            <li
                                key={tarea.id} 
                                style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "5px",
                                    color: "gray",
                                    fontStyle: "italic",
                                }}
                            >
                                {tarea.texto}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={limpiarTareasEliminadas}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Eliminar tareas completadas
                    </button>
                </div>
            )}
        </div>
    );
};

export default Body;