import { useState, useEffect, useRef } from "react";

const OverScan = ({ ovrScn, setOvrScn, setMenuSelection }) => {
    const [select, setSelect] = useState(0);
    const selected = useRef(0)

    const update = (mod) => {
        switch (selected.current) {
            case 0:
                setOvrScn(old => ({ ...old, horSize: parseFloat((old.horSize+(.01*mod)).toPrecision(3)) }))
                break;
            case 1:
                setOvrScn(old => ({ ...old, vertSize: parseFloat((old.vertSize+(.01*mod)).toPrecision(3)) }))
                break;
            case 2:
                setOvrScn(old => ({ ...old, horShift: (old.horShift+mod) }))
                break;
            case 3:
                setOvrScn(old => ({ ...old, vertShift: (old.vertShift+mod) }))
                break;
            default:
        }
    }
    const logKeyUp = (e, keyListen) => {
        switch (e.key) {
            case ".":
                keyListen.removeEventListener();
                setMenuSelection('list');
                break;
            case "ArrowUp":
                setSelect(last => {
                    const next = (last === 0) ? (3) : (last - 1);
                    selected.current = next;
                    return next
                })
                break;
            case "ArrowDown":
                setSelect(last => {
                    const next = (last === 3) ? (0) : (last + 1);
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
            default:
        }
    }
    useEffect(() => {
        const keyListen = document.addEventListener("keyup", (e) => logKeyUp(e, keyListen));

    }, [])
    return (
        <div className="menuBackdrop" id="overscanMenu">
            <p className={`osOption ${(select === 0) ? ('osSelected') : ('')}`} >{`H Overscan: ${ovrScn.horSize}`}</p>
            <p className={`osOption ${(select === 1) ? ('osSelected') : ('')}`}>{`V Overscan: ${ovrScn.vertSize}`}</p>
            <p className={`osOption ${(select === 2) ? ('osSelected') : ('')}`}>{`H Shift: ${ovrScn.horShift}`}</p>
            <p className={`osOption ${(select === 3) ? ('osSelected') : ('')}`}>{`V Shift: ${ovrScn.vertShift}`}</p>
        </div>
    )
}

export default OverScan;