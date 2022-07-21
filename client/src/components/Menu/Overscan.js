import { useState, useEffect, useRef } from "react";

const OverScan = ({ ovrScn, setOvrScn, setMenuHover }) => {
    const [select, setSelect] = useState(0);
    const selected = useRef(0)
    setMenuHover(4);
    const update = (mod) => {
        switch (selected.current) {
            case 0:
                setOvrScn(old => ({ ...old, horSize: parseFloat((old.horSize + (.01 * mod)).toPrecision(3)) }))
                break;
            case 1:
                setOvrScn(old => ({ ...old, vertSize: parseFloat((old.vertSize + (.01 * mod)).toPrecision(3)) }))
                break;
            case 2:
                setOvrScn(old => ({ ...old, horShift: (old.horShift + mod) }))
                break;
            case 3:
                setOvrScn(old => ({ ...old, vertShift: (old.vertShift + mod) }))
                break;
            case 4:
                if (!mod) {
                    console.log("SAVING LOCALLY...")
                    let data = JSON.parse(localStorage.getItem('TubeSimData'));
                    let newOs = {};
                    setOvrScn(old => {
                        newOs = old
                        return old
                    })
                    data = {
                        ...data,
                        horSize: newOs.horSize,
                        vertSize: newOs.vertSize,
                        horShift: newOs.horShift,
                        vertShift: newOs.vertShift
                    };
                    console.log(newOs)
                  
                    localStorage.setItem('TubeSimData', JSON.stringify(data));
                };
                break;
            default:
        }
    }
    const logKeyUp = (e) => {
        
        switch (e.key) {
         
            case ".":
                document.removeEventListener("keyup", logKeyUp)
                const data = JSON.parse(localStorage.getItem('TubeSimData'));
                setOvrScn(
                    {
                        horSize: data.horSize,
                        vertSize: data.vertSize,
                        horShift: data.horShift,
                        vertShift: data.vertShift
                    }
                )
                break;
            case "ArrowUp":
                setSelect(last => {
                    const next = (last === 0) ? (4) : (last - 1);
                    selected.current = next;
                    return next
                })
                break;
            case "ArrowDown":
                setSelect(last => {
                    const next = (last === 4) ? (0) : (last + 1);
                    selected.current = next;
                    return next
                })
                break;
            case "ArrowLeft":
                update(-1);
                break;
            case "ArrowRight":
                update(1);
                break;
            case "Enter":
                update(0);
                break;
            default:
        }
    }
    useEffect(() => {
       document.addEventListener("keyup", logKeyUp);

    }, [])
    return (
        <div className="menuBackdrop" id="overscanMenu">
            <p className={`osOption ${(select === 0) ? ('osSelected') : ('')}`} >{`H Overscan: ${ovrScn.horSize}`}</p>
            <p className={`osOption ${(select === 1) ? ('osSelected') : ('')}`}>{`V Overscan: ${ovrScn.vertSize}`}</p>
            <p className={`osOption ${(select === 2) ? ('osSelected') : ('')}`}>{`H Shift: ${ovrScn.horShift}`}</p>
            <p className={`osOption ${(select === 3) ? ('osSelected') : ('')}`}>{`V Shift: ${ovrScn.vertShift}`}</p>
            <p className={`osOption ${(select === 4) ? ('osSelected') : ('')}`}>{`Save`}</p>
        </div>
    )
}

export default OverScan;