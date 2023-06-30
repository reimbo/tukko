import "./css/Loader.css"

// this component returns loading screen for tukko

export const Loader = () => {
return (
    <div className="loaderContainer">
        <div className="center">
            <p className="loaderText">Tukko </p>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className="loaderText">Now Loading... </p>
        </div>
    </div>
)
};

export default Loader;